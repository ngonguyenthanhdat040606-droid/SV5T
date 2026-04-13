const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose'); // Thêm dòng này

const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname)));
app.use(express.static(__dirname)); 
// Hoặc nếu file html nằm trong thư mục public:
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;



// CHUỖI KẾT NỐI MONGODB CỦA ĐẠT
const MONGODB_URI = "mongodb+srv://ngonguyenthanhdat040606_db_user:8OMaXPYyByrUMbb9@cluster0.uf8qglh.mongodb.net/SGU_SV5T?retryWrites=true&w=majority";
// KẾT NỐI DATABASE
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối thành công với MongoDB Atlas'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));
// Định nghĩa Schema (Cấu trúc dữ liệu sinh viên)
const studentSchema = new mongoose.Schema({
    id: String,
    msv: String,
    name: String,
    faculty: String,
    status: String,
    criteria: Object
});
const Student = mongoose.model('Student', studentSchema);
// API: TỰ ĐỘNG NẠP DỮ LIỆU TỪ FILE JSON LÊN MONGODB (Chỉ dùng 1 lần)
app.get('/api/admin/import-data', async (req, res) => {
    try {
        const rawData = fs.readFileSync(path.join(__dirname, 'students_database.json'), 'utf-8');
        const importedData = JSON.parse(rawData);
        
        await Student.deleteMany({}); // Xóa dữ liệu cũ (nếu có) để nạp mới
        await Student.insertMany(importedData.students);
        
        res.json({ success: true, message: `Đã nạp thành công ${importedData.students.length} sinh viên lên Cloud!` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Sửa lại API lấy danh sách sinh viên để dùng MongoDB
app.get('/api/admin/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json({ success: true, data: students });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Để fix lỗi Cannot GET index.html

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/png', 'image/jpeg'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Load dữ liệu từ file JSON (223 sinh viên thực tế từ SGU)



let studentDatabase = [];
try {
    const dataPath = path.join(__dirname, 'students_database.json');
    if (fs.existsSync(dataPath)) {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const importedData = JSON.parse(rawData);
        studentDatabase = importedData.students || [];
        console.log(`✓ Đã load ${studentDatabase.length} sinh viên từ database`);
    }
} catch (err) {
    console.log('⚠️  Không tìm thấy file students_database.json, sử dụng dữ liệu mặc định');
}

// In-memory database (với dữ liệu thực từ SGU)
const database = {
    students: studentDatabase.length > 0 ? studentDatabase : [
        {
            id: '3120410001',
            name: 'Nguyễn Văn A',
            email: 'a.nguyen@sgu.edu.vn',
            khoa: 'FIT',
            password: '123456',
            documents: [],
            criteria: {
                morality: { status: 'completed', progress: 100 },
                study: { status: 'pending', progress: 80 },
                fitness: { status: 'incomplete', progress: 40 },
                volunteer: { status: 'completed', progress: 100 },
                integration: { status: 'incomplete', progress: 20 }
            }
        },
        {
            id: '3120410002',
            name: 'Trần Thị B',
            email: 'b.tran@sgu.edu.vn',
            khoa: 'BIS',
            password: '123456',
            documents: [],
            criteria: {
                morality: { status: 'completed', progress: 100 },
                study: { status: 'completed', progress: 100 },
                fitness: { status: 'pending', progress: 60 },
                volunteer: { status: 'completed', progress: 100 },
                integration: { status: 'pending', progress: 75 }
            }
        }
    ],
    admins: [
        {
            id: 'admin',
            username: 'admin',
            password: '123456',
            unit: 'hoi_tong',
            name: 'Ban Giám hiệu Hội'
        }
    ],
    documents: [
        {
            id: 'doc1',
            studentId: '3120410001',
            criteria: 'morality',
            title: 'Bảng điểm rèn luyện',
            description: 'Điểm rèn luyện năm học 2024-2025',
            fileName: 'bang-diem-ren-luyen.pdf',
            fileSize: 1.2,
            uploadDate: '2025-10-23',
            status: 'approved'
        }
    ],
    reviews: [],
    suggestions: [
        {
            id: 'sug1',
            title: 'SGU Run 2026 - Giải chạy bộ',
            description: 'Cộng 1 tiêu chí Thể lực tốt',
            date: '2025-05-15',
            type: 'fitness',
            status: 'active'
        },
        {
            id: 'sug2',
            title: 'Hội thảo Tiếng Anh Chuyên ngành FIT',
            description: 'Cộng 1 chứng nhận Hội nhập',
            date: '2025-05-20',
            type: 'integration',
            status: 'active'
        }
    ]
};

// ============ AUTHENTICATION ============

// Student Login
app.post('/api/auth/student-login', (req, res) => {
    const { email, password } = req.body;
    
    const student = database.students.find(s => 
        (s.id === email || s.email === email) && s.password === password
    );
    
    if (student) {
        res.json({
            success: true,
            user: {
                id: student.id,
                name: student.name,
                email: student.email,
                khoa: student.khoa,
                role: 'student'
            },
            token: 'mock_token_' + student.id
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Admin Login
app.post('/api/auth/admin-login', (req, res) => {
    const { username, password, unit } = req.body;
    
    const admin = database.admins.find(a => 
        a.username === username && a.password === password && a.unit === unit
    );
    
    if (admin) {
        res.json({
            success: true,
            user: {
                id: admin.id,
                name: admin.name,
                unit: admin.unit,
                role: 'admin'
            },
            token: 'mock_token_' + admin.id
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// ============ STUDENT ENDPOINTS ============

// Get student profile
app.get('/api/student/:id', (req, res) => {
    const student = database.students.find(s => s.id === req.params.id);
    if (student) {
        res.json({ success: true, data: student });
    } else {
        res.status(404).json({ success: false, message: 'Student not found' });
    }
});

// Get student documents
app.get('/api/student/:id/documents', (req, res) => {
    const docs = database.documents.filter(d => d.studentId === req.params.id);
    res.json({ success: true, data: docs });
});

// Upload document
app.post('/api/student/:id/documents', upload.single('file'), (req, res) => {
    const { title, description, criteria } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const newDoc = {
        id: 'doc_' + Date.now(),
        studentId: req.params.id,
        criteria: criteria,
        title: title,
        description: description,
        fileName: req.file.filename,
        fileSize: (req.file.size / 1024 / 1024).toFixed(2),
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending'
    };
    
    database.documents.push(newDoc);
    res.json({ success: true, data: newDoc });
});

// Get student criteria progress
app.get('/api/student/:id/progress', (req, res) => {
    const student = database.students.find(s => s.id === req.params.id);
    if (student) {
        res.json({ success: true, data: student.criteria });
    } else {
        res.status(404).json({ success: false, message: 'Student not found' });
    }
});

// Get suggestions for student
app.get('/api/student/:id/suggestions', (req, res) => {
    res.json({ success: true, data: database.suggestions });
});

// ============ ADMIN ENDPOINTS ============

// Get all students (with filters)
app.get('/api/admin/students', (req, res) => {
    const { khoa, status } = req.query;
    
    let students = database.students;
    
    if (khoa) {
        students = students.filter(s => s.khoa === khoa);
    }
    
    res.json({ success: true, data: students });
});

// Get documents for review
app.get('/api/admin/documents-pending', (req, res) => {
    const pendingDocs = database.documents.filter(d => d.status === 'pending');
    res.json({ success: true, data: pendingDocs });
});

// Review document
app.post('/api/admin/documents/:docId/review', (req, res) => {
    const { decision, comment } = req.body;
    
    const doc = database.documents.find(d => d.id === req.params.docId);
    if (doc) {
        doc.status = decision; // 'approved' or 'rejected'
        doc.reviewComment = comment;
        doc.reviewDate = new Date().toISOString().split('T')[0];
        
        res.json({ success: true, data: doc });
    } else {
        res.status(404).json({ success: false, message: 'Document not found' });
    }
});

// Get statistics
app.get('/api/admin/statistics', (req, res) => {
    const stats = {
        totalStudents: database.students.length,
        totalDocuments: database.documents.length,
        pendingDocuments: database.documents.filter(d => d.status === 'pending').length,
        approvedDocuments: database.documents.filter(d => d.status === 'approved').length,
        rejectedDocuments: database.documents.filter(d => d.status === 'rejected').length,
        criteriaCompletion: {
            morality: 95,
            study: 87,
            fitness: 65,
            volunteer: 92,
            integration: 78
        }
    };
    
    res.json({ success: true, data: stats });
});

// Create certificate decision
app.post('/api/admin/certificates', (req, res) => {
    const { type, studentIds, date, notes } = req.body;
    
    const certificate = {
        id: 'cert_' + Date.now(),
        type: type,
        studentIds: studentIds,
        date: date,
        notes: notes,
        createdAt: new Date().toISOString(),
        status: 'active'
    };
    
    res.json({ success: true, data: certificate });
});

// ============ ERROR HANDLING ============

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message });
});

// ============ START SERVER ============

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`
╔════════════════════════════════════════════════════════╗
║     Sinh viên 5 tốt Digital - Backend Server          ║
╠════════════════════════════════════════════════════════╣
║ API Endpoints:                                         ║
║                                                        ║
║ Authentication:                                        ║
║   POST /api/auth/student-login                        ║
║   POST /api/auth/admin-login                          ║
║                                                        ║
║ Student:                                               ║
║   GET  /api/student/:id                               ║
║   GET  /api/student/:id/documents                     ║
║   POST /api/student/:id/documents (upload)            ║
║   GET  /api/student/:id/progress                      ║
║   GET  /api/student/:id/suggestions                   ║
║                                                        ║
║ Admin:                                                 ║
║   GET  /api/admin/students                            ║
║   GET  /api/admin/documents-pending                   ║
║   POST /api/admin/documents/:id/review                ║
║   GET  /api/admin/statistics                          ║
║   POST /api/admin/certificates                        ║
║                                                        ║
║ Demo Credentials:                                      ║
║   Student: 3120410001 / 123456                        ║
║   Admin: admin / 123456                               ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
