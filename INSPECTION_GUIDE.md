# 🔍 HƯỚNG DẪN KIỂM TRA WEBSITE VÀ DỮ LIỆU

## 📋 Hệ thống Quản lý Sinh viên 5 tốt - Trường ĐH Sài Gòn

---

## 🎯 Mục tiêu Kiểm tra

Kiểm tra viên cần xác nhận:
1. ✅ Website hoạt động bình thường
2. ✅ Dữ liệu 223 sinh viên được import chính xác
3. ✅ Phân loại: 190 đạt, 33 không đạt, 0 chờ xét
4. ✅ Tất cả chức năng hoạt động đúng

---

## 🚀 BƯỚC 1: Khởi động Server

### 1.1 Cài đặt Dependencies
```bash
npm install
```

### 1.2 Chạy Server
```bash
npm start
```

**Kết quả mong đợi:**
```
Server running on http://localhost:5000
✓ Đã load 223 sinh viên từ database
```

### 1.3 Kiểm tra Server
- Server phải chạy trên `http://localhost:5000`
- Không có lỗi trong console

---

## 📱 BƯỚC 2: Kiểm tra Trang Đăng nhập

### URL: `http://localhost:5000/index.html`

#### Cần kiểm tra:
- ✓ Trang tải lên bình thường
- ✓ Có 2 tab: "Sinh viên" và "Ban Hội"
- ✓ Form đăng nhập hợp lệ
- ✓ Nút "Đăng nhập" hoạt động

#### Tài khoản Demo để test:
```
Sinh viên:
  Email: 3120410001
  Password: 123456

Ban Hội (Admin):
  Username: admin
  Password: 123456
```

#### Kiểm tra Sinh viên:
1. Click tab "Sinh viên"
2. Nhập: `3120410001` và `123456`
3. Nhấp "Đăng nhập"
4. ✓ Chuyển đến dashboard-student.html

#### Kiểm tra Ban Hội:
1. Click tab "Ban Hội"
2. Nhập: `admin`, `123456`, chọn "Hội Sinh viên Trường"
3. Nhấp "Đăng nhập"
4. ✓ Chuyển đến dashboard-admin.html

---

## 📊 BƯỚC 3: Kiểm tra Dashboard Thống kê

### URL: `http://localhost:5000/statistics-dashboard.html`

#### Dữ liệu phải hiển thị:

**Phần 1: Thống kê Chính**
- ✓ Đạt: **190** (85.2%)
- ✓ Không đạt: **33** (14.8%)
- ✓ Tổng: **223**

**Phần 2: Biểu đồ Pie Chart**
- ✓ Hiển thị 2 phần: 190 đạt, 33 không đạt
- ✓ Tỷ lệ chính xác: ~85% vs ~15%

**Phần 3: Phân bố Trạng thái**
- ✓ Progress bar "Đạt": 85.2%
- ✓ Progress bar "Không đạt": 14.8%

**Phần 4: Thông tin Dữ liệu**
- ✓ Ngày cập nhật: 11/04/2026
- ✓ Trạng thái: ✓ Xác thực
- ✓ Tất cả 223 hồ sơ đã xét duyệt

#### ⚠️ Nếu dữ liệu không đúng:
- Kiểm tra file `students_database.json` đã được import
- Kiểm tra server có load dữ liệu không

---

## 🔍 BƯỚC 4: Kiểm tra Trang Xác thực Dữ liệu

### URL: `http://localhost:5000/data-verification.html`

#### Danh sách Kiểm tra (tất cả phải là ✓ Pass):
- ✓ File Excel được tìm thấy
- ✓ 223 sinh viên được import
- ✓ Phân loại chính xác (190 đạt, 33 không đạt)
- ✓ MSV được xác thực
- ✓ Dữ liệu được lưu vào database
- ✓ Tất cả hồ sơ xét duyệt
- ✓ Website hiển thị chính xác

#### Danh sách 33 Sinh viên không đạt:
- ✓ Hiển thị chính xác danh sách
- ✓ Có tên, MSV, Khoa
- ✓ Trạng thái "Không đạt"

#### ⚠️ Nếu có lỗi:
```
❌ Danh sách không đầy đủ
→ Kiểm tra import script đã chạy
→ Kiểm tra file students_database.json
```

---

## 👨‍🎓 BƯỚC 5: Kiểm tra Dashboard Sinh viên

### URL: `http://localhost:5000/dashboard-student.html`

#### Đăng nhập:
- Tài khoản: `3120410001` / `123456`

#### Cần kiểm tra:

**Tab Tổng quan:**
- ✓ Tiến độ: 40% (demo)
- ✓ 5 tiêu chí card hiển thị
- ✓ Lịch sử hoạt động

**Tab Tiêu chí 5 tốt:**
- ✓ 5 tiêu chí được liệt kê
- ✓ Nút "Tải lên minh chứng" hoạt động

**Tab Hồ sơ Minh chứng:**
- ✓ Danh sách hồ sơ (có thể trống)
- ✓ Nút "Thêm" hoạt động

**Tab Gợi ý AI:**
- ✓ Hiển thị hoạt động được gợi ý
- ✓ Nút "Đăng ký" hoạt động

**Kiểm tra Upload:**
1. Nhấp "Tải lên minh chứng" (tiêu chí bất kỳ)
2. Modal mở ra
3. Nhập thông tin (tên, mô tả)
4. Kéo thả hoặc chọn file
5. ✓ Nút "Gửi xét duyệt" hoạt động

#### ⚠️ Nếu có vấn đề:
```
❌ Module không tải
→ Kiểm tra kết nối internet
→ Kiểm tra browser console (F12)
```

---

## 👥 BƯỚC 6: Kiểm tra Dashboard Admin (Ban Hội)

### URL: `http://localhost:5000/dashboard-admin.html`

#### Đăng nhập:
- Username: `admin`
- Password: `123456`
- Đơn vị: "Hội Sinh viên Trường"

#### Cần kiểm tra:

**Tab Tổng quan:**
- ✓ 4 thẻ thống kê:
  - Tổng sinh viên: 223
  - Đã cấp: 190 (hoặc ~38 nếu là demo)
  - Chờ xét: 0 (hoặc 3 nếu là demo)
  - Từ chối: (số lượng)

**Tab Xét duyệt hồ sơ:**
- ✓ Bảng danh sách (có thể có hoặc không)
- ✓ Nút "Xem" hoạt động
- ✓ Modal xét duyệt mở ra

**Tab Cấp danh hiệu:**
- ✓ Nút "Tạo quyết định mới" hoạt động
- ✓ Modal tạo quyết định

**Tab Thống kê:**
- ✓ Biểu đồ % hoàn thành từng tiêu chí
- ✓ Nút "Xuất báo cáo PDF" (hoặc tương tự)

**Tab Quản lý Sinh viên:**
- ✓ Bảng danh sách sinh viên
- ✓ Tìm kiếm hoạt động
- ✓ Nút chi tiết

#### ⚠️ Nếu bảng trống:
```
❌ Không hiển thị dữ liệu
→ Kiểm tra server có load dữ liệu
→ Kiểm tra API /api/admin/students
```

---

## 🔌 BƯỚC 7: Kiểm tra API

### Kiểm tra Backend API hoạt động

#### 1. Login API
```bash
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "123456",
    "unit": "hoi_tong"
  }'
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "user": { "id": "admin", "name": "Ban Giám hiệu Hội", ... },
  "token": "mock_token_admin"
}
```

#### 2. Lấy Danh sách Sinh viên
```bash
curl http://localhost:5000/api/admin/students
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "data": [
    { "id": "3121200023", "name": "Hồ Anh Thư", "msv": "3121200023", ... },
    ...
  ]
}
```

**Kiểm tra: Phải có 223 sinh viên trong danh sách**

#### 3. Thống kê
```bash
curl http://localhost:5000/api/admin/statistics
```

**Kết quả phải chứa:**
```json
{
  "success": true,
  "data": {
    "totalStudents": 223,
    "approvedDocuments": (số lượng),
    "pendingDocuments": 0,
    ...
  }
}
```

---

## 📁 BƯỚC 8: Kiểm tra File Dữ liệu

### File: `/mnt/user-data/outputs/students_database.json`

#### Kích thước:
- ✓ Phải > 100 KB
- ✓ Thực tế: 175.4 KB

#### Nội dung (kiểm tra trong editor):
```json
{
  "metadata": {
    "school": "Trường Đại học Sài Gòn",
    "total_students": 223,
    "achieved_students": 190,
    "not_achieved_students": 33,
    "pending_students": 0
  },
  "students": [
    {
      "id": "3121200023",
      "name": "Hồ Anh Thư",
      "msv": "3121200023",
      "status": "achieved"
    },
    ...
  ]
}
```

#### Kiểm tra:
- ✓ 223 sinh viên trong mảng `students`
- ✓ 190 có `"status": "achieved"`
- ✓ 33 có `"status": "not_achieved"`
- ✓ JSON format hợp lệ

---

## ✅ DANH SÁCH KIỂM TRA HOÀN CHỈNH

| # | Mục | Trạng thái | Ghi chú |
|---|-----|-----------|---------|
| 1 | Server khởi động | ☐ | Port 5000 |
| 2 | Trang đăng nhập | ☐ | 2 tab hoạt động |
| 3 | Đăng nhập sinh viên | ☐ | 3120410001/123456 |
| 4 | Đăng nhập admin | ☐ | admin/123456 |
| 5 | Dashboard thống kê | ☐ | 190 đạt, 33 không |
| 6 | Trang xác thực | ☐ | Tất cả ✓ Pass |
| 7 | Dashboard SV | ☐ | 5 tab hoạt động |
| 8 | Dashboard Admin | ☐ | 5 tab hoạt động |
| 9 | API login | ☐ | Trả về token |
| 10 | API lấy sinh viên | ☐ | 223 sinh viên |
| 11 | File JSON | ☐ | 175.4 KB, 223 SV |
| 12 | Toàn bộ hoạt động | ☐ | ✓ Xác thực thành công |

---

## 🎯 KẾT QUẢ KIỂM TRA

### Nếu ✓ Tất cả đều Pass:
```
✅ WEBSITE HOẠT ĐỘNG BÌNH THƯỜNG
✅ DỮ LIỆU CHÍNH XÁC (223 SV: 190 đạt, 33 không đạt)
✅ HỆ THỐNG SẴN DÙNG
```

### Nếu ❌ Có lỗi:
```
1. Kiểm tra console browser (F12)
2. Kiểm tra server logs
3. Kiểm tra file students_database.json
4. Import lại dữ liệu nếu cần
```

---

## 📞 Hỗ Trợ

Nếu có vấn đề:
1. Xem file `README.md` - Hướng dẫn chi tiết
2. Xem file `QUICK_START.md` - Khắc phục sự cố
3. Kiểm tra logs server trong terminal
4. Liên hệ: hoisinhvien@sgu.edu.vn

---

**Hệ thống Quản lý Sinh viên 5 tốt v1.0**  
Trường Đại học Sài Gòn  
© 2026 All Rights Reserved
