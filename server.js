const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// CHUỖI KẾT NỐI MONGODB CỦA ĐẠT (Đã tối ưu)
// Thay dòng cũ bằng dòng này để vượt qua lỗi DNS mạng công cộng
// Chuỗi kết nối chuẩn giúp tránh lỗi ECONNREFUSED
const MONGODB_URI = process.env.MONGODB_URI || "MONGODB_URI=mongodb://ngonguyenthanhdat040606_db_user:8OMaXPYyByrUMbb9@ac-pldqxjo-shard-00-00.uf8qglh.mongodb.net:27017,ac-pldqxjo-shard-00-01.uf8qglh.mongodb.net:27017,ac-pldqxjo-shard-00-02.uf8qglh.mongodb.net:27017/SGU_SV5T?ssl=true&replicaSet=atlas-w8kbvb-shard-0&authSource=admin&appName=Cluster0";
// KẾT NỐI DATABASE
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối thành công với MongoDB Atlas'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Định nghĩa cấu trúc dữ liệu sinh viên
const studentSchema = new mongoose.Schema({
    id: String,
    msv: String,
    name: String,
    faculty: String,
    status: String,
    criteria: Object
});
const Student = mongoose.model('Student', studentSchema);

// MIDDLEWARE (Cấu hình một lần duy nhất)
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Mở cửa cho các file HTML trong thư mục gốc

// Cấu hình lưu trữ file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// ============ HỆ THỐNG API ============

// 1. Nạp dữ liệu từ JSON lên Cloud (Chạy xong truy cập link /api/admin/import-data)
app.get('/api/admin/import-data', async (req, res) => {
    try {
        const rawData = fs.readFileSync(path.join(__dirname, 'students_database.json'), 'utf-8');
        const importedData = JSON.parse(rawData);
        await Student.deleteMany({}); 
        await Student.insertMany(importedData.students);
        res.json({ success: true, message: `Đã nạp ${importedData.students.length} bạn lên Cloud!` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. Lấy danh sách 223 sinh viên từ MongoDB
app.get('/api/admin/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json({ success: true, data: students });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 3. Đăng nhập Admin
app.post('/api/auth/admin-login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
        res.json({ success: true, user: { id: 'admin', role: 'admin' }, token: 'mock_token_admin' });
    } else {
        res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
    }
});

// 4. Đăng nhập Sinh viên (tìm theo MSV trong MongoDB)
app.post('/api/auth/student-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ msv: email });
        if (!student) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy sinh viên với MSV này' });
        }
        // Mật khẩu mặc định: 123456 hoặc chính MSV
        const validPass = password === '123456' || password === student.msv;
        if (!validPass) {
            return res.status(401).json({ success: false, message: 'Sai mật khẩu' });
        }
        res.json({
            success: true,
            user: { id: student.msv, name: student.name, faculty: student.faculty, role: 'student' },
            token: 'mock_token_student'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 5. Thống kê nhanh cho Dashboard
app.get('/api/admin/statistics', async (req, res) => {
    try {
        const total = await Student.countDocuments();
        const achieved = await Student.countDocuments({ status: 'achieved' });
        const notAchieved = await Student.countDocuments({ status: 'not_achieved' });
        res.json({ success: true, data: { totalStudents: total, achieved, notAchieved, pending: 0 } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// KHỞI ĐỘNG SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});

module.exports = app;