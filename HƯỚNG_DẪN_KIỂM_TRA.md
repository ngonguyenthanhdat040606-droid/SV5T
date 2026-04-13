# ✅ HƯỚNG DẪN KIỂM TRA - DỮ LIỆU SINH VIÊN HIỂN THỊ TRÊN WEBSITE

## 🎯 Bạn sẽ thấy dữ liệu ở 3 trang chính:

---

## 1️⃣ TRANG CHỦ (home.html) - BƯỚC ĐẦU TIÊN

### 🌐 Truy cập:
```
http://localhost:5000/home.html
```

### 📊 Bạn sẽ thấy:
- ✓ Header lớn: **"Sinh viên 5 tốt"**
- ✓ 4 thẻ thống kê:
  - **TỔNG SINH VIÊN: 223**
  - **ĐẠT DANH HIỆU: 190**
  - **KHÔNG ĐẠT: 33**
  - **ĐÃ DUYỆT: 223**
- ✓ Nút lớn: **"📋 Danh sách 223 Sinh viên"** (có thể click)
- ✓ Thống kê: 190 (85.2%) vs 33 (14.8%)
- ✓ Các liên kết khác

### ✨ Tính năng:
```
✓ Hiển thị số liệu chính
✓ Có nút liên kết đến danh sách sinh viên
✓ Thống kê tỷ lệ (progress bar)
✓ Thông tin dữ liệu (nguồn, ngày cập nhật)
```

---

## 2️⃣ DANH SÁCH SINH VIÊN (students-list-real.html) ⭐⭐⭐

### 🌐 Truy cập trực tiếp:
```
http://localhost:5000/students-list-real.html
```

### 📋 Bạn sẽ thấy:

#### HEADER:
```
📋 Danh sách 223 Sinh viên 5 tốt
Trường Đại học Sài Gòn - Năm học 2024-2025

[TỔNG: 223]  [ĐẠT: 190]  [KHÔNG ĐẠT: 33]
```

#### BẢNG SINH VIÊN (223 hàng):
```
┌─────┬──────────────────────┬──────────────┬──────────────────┬─────────────┐
│ STT │ Họ và Tên            │ MSV          │ Khoa             │ Kết quả     │
├─────┼──────────────────────┼──────────────┼──────────────────┼─────────────┤
│  1  │ Hồ Anh Thư           │ 3121200023   │ GIÁO DỤC CHÍNH...│ ✓ ĐẠT       │
│  2  │ Trần Anh Thư         │ 3122200012   │ Không xác định   │ ✓ ĐẠT       │
│  3  │ Võ Cẩm Giang         │ 3122200003   │ Không xác định   │ ✓ ĐẠT       │
│  4  │ Võ Thanh Quyền       │ 3122200009   │ Không xác định   │ ✓ ĐẠT       │
│  5  │ Lê Thị Thùy Linh     │ 3121200013   │ Không xác định   │ ✓ ĐẠT       │
│ ... │ ... (190 sinh viên đạt) ...          │ ...              │ ✓ ĐẠT       │
│191  │ Bùi Cao Ái Trân      │ 3123430196   │ LUẬT             │ ✗ KHÔNG ĐẠT │
│192  │ Đỗ Lê Kim Yến        │ 3123430228   │ Không xác định   │ ✗ KHÔNG ĐẠT │
│193  │ Trần Ngọc Linh       │ 3123430088   │ Không xác định   │ ✗ KHÔNG ĐẠT │
│ ... │ ... (33 sinh viên không đạt) ...     │ ...              │ ✗ KHÔNG ĐẠT │
│223  │ Nguyễn Thị Nhung     │ 3122330281   │ Không xác định   │ ✗ KHÔNG ĐẠT │
└─────┴──────────────────────┴──────────────┴──────────────────┴─────────────┘
```

#### TÌM KIẾM & LỌC:
```
🔍 Tìm theo tên hoặc MSV:  [____________________]
📊 Lọc theo kết quả:       [▼ -- Tất cả (223) --]
                              ✓ Đạt danh hiệu (190)
                              ✗ Không đạt (33)
```

### ✨ Tính năng:
```
✓ Hiển thị bảng 223 sinh viên (STT, Tên, MSV, Khoa, Kết quả)
✓ Tìm kiếm theo tên hoặc MSV (real-time)
✓ Lọc theo kết quả (Đạt/Không/Tất cả)
✓ Màu sắc: 
  - Xanh (✓ ĐẠT) cho 190 sinh viên đạt
  - Đỏ (✗ KHÔNG ĐẠT) cho 33 sinh viên không đạt
✓ Hiển thị số lượng kết quả đang xem
```

---

## 3️⃣ VÍ DỤ TÌM KIẾM

### Ví dụ 1: Tìm sinh viên tên "Hồ Anh Thư"
```
Nhập vào ô tìm kiếm: Hồ Anh Thư

Kết quả:
┌─────┬─────────────────┬──────────────┬────────┬─────────┐
│ STT │ Họ và Tên       │ MSV          │ Khoa   │ Kết quả │
├─────┼─────────────────┼──────────────┼────────┼─────────┤
│  1  │ Hồ Anh Thư      │ 3121200023   │ GIÁO..│ ✓ ĐẠT   │
└─────┴─────────────────┴──────────────┴────────┴─────────┘

Hiển thị: 1 sinh viên
```

### Ví dụ 2: Tìm sinh viên MSV "3122150155"
```
Nhập vào ô tìm kiếm: 3122150155

Kết quả:
┌──────┬─────────────────────┬──────────────┬────────┬──────────────┐
│ STT  │ Họ và Tên           │ MSV          │ Khoa   │ Kết quả      │
├──────┼─────────────────────┼──────────────┼────────┼──────────────┤
│ 204  │ Nguyễn Thị Huyền... │ 3122150155   │ Không..│ ✗ KHÔNG ĐẠT  │
└──────┴─────────────────────┴──────────────┴────────┴──────────────┘

Hiển thị: 1 sinh viên
```

### Ví dụ 3: Lọc để chỉ xem sinh viên không đạt
```
Bước 1: Nhấp vào dropdown "Lọc theo kết quả"
Bước 2: Chọn "✗ Không đạt (33)"

Kết quả:
Bảng hiển thị 33 sinh viên không đạt:
1. Bùi Cao Ái Trân (3123430196) - LUẬT - ✗ KHÔNG ĐẠT
2. Đỗ Lê Kim Yến (3123430228) - Không xác định - ✗ KHÔNG ĐẠT
3. Trần Ngọc Linh (3123430088) - Không xác định - ✗ KHÔNG ĐẠT
... (33 sinh viên tổng cộng)

Hiển thị: 33 sinh viên
```

---

## 4️⃣ KHỞI ĐỘNG WEBSITE

### Bước 1: Cài đặt
```bash
npm install
```

### Bước 2: Chạy server
```bash
npm start
```

### Bước 3: Mở trình duyệt
```
http://localhost:5000/home.html
```

---

## 5️⃣ KIỂM TRA CHI TIẾT

| Trang | URL | Dữ liệu hiển thị |
|-------|-----|-----------------|
| **TRANG CHỦ** | http://localhost:5000/home.html | Thống kê 223 sinh viên |
| **DANH SÁCH** | http://localhost:5000/students-list-real.html | Bảng 223 sinh viên chi tiết |
| **THỐNG KÊ** | http://localhost:5000/statistics-dashboard.html | Biểu đồ, tỷ lệ |
| **XÁC THỰC** | http://localhost:5000/data-verification.html | Kiểm tra dữ liệu |
| **ĐĂNG NHẬP** | http://localhost:5000/index.html | Form đăng nhập |

---

## 6️⃣ DỮ LIỆU HIỂN THỊ THỰC TẾ

### 190 sinh viên ĐẠT (mẫu 10 người):
```
1. Hồ Anh Thư - 3121200023 - GIÁO DỤC CHÍNH TRỊ - ✓ ĐẠT
2. Trần Anh Thư - 3122200012 - Không xác định - ✓ ĐẠT
3. Võ Cẩm Giang - 3122200003 - Không xác định - ✓ ĐẠT
4. Võ Thanh Quyền - 3122200009 - Không xác định - ✓ ĐẠT
5. Lê Thị Thùy Linh - 3121200013 - Không xác định - ✓ ĐẠT
6. Nguyễn Thị Phương Khiêm - 3122200005 - Không xác định - ✓ ĐẠT
7. Bùi Thanh Xuân - 3123430222 - Không xác định - ✓ ĐẠT
8. Mai Nguyễn Trà My - 3122430104 - Không xác định - ✓ ĐẠT
9. Nguyễn Đắc Triết - 3122430202 - Không xác định - ✓ ĐẠT
10. Nguyễn Hữu Thiện Nhiên - 3123430131 - Không xác định - ✓ ĐẠT
... (180 sinh viên đạt khác)
```

### 33 sinh viên KHÔNG ĐẠT (tất cả):
```
1. Bùi Cao Ái Trân - 3123430196 - LUẬT - ✗ KHÔNG ĐẠT
2. Đỗ Lê Kim Yến - 3123430228 - Không xác định - ✗ KHÔNG ĐẠT
3. Trần Ngọc Linh - 3123430088 - Không xác định - ✗ KHÔNG ĐẠT
4. Võ Thanh Thảo - 3123430163 - Không xác định - ✗ KHÔNG ĐẠT
5. Hà Thái Toàn - 3123350177 - Không xác định - ✗ KHÔNG ĐẠT
6. Huỳnh Thị Xu Kiên - 3122540036 - Không xác định - ✗ KHÔNG ĐẠT
7. Lê Hoàng Vinh - 3122570149 - Không xác định - ✗ KHÔNG ĐẠT
8. Nguyễn Phạm Huy Phúc - 3122350184 - Không xác định - ✗ KHÔNG ĐẠT
9. Trang Võ Thảo Nhi - 3122570086 - Không xác định - ✗ KHÔNG ĐẠT
10. Trần Thị Ánh Lan - 3122540040 - Không xác định - ✗ KHÔNG ĐẠT
... (23 sinh viên không đạt khác)
```

---

## ✅ DANH SÁCH KIỂM TRA

Khi truy cập website, bạn cần thấy:

- [ ] Trang chủ (home.html) tải thành công
- [ ] 4 thẻ thống kê: 223, 190, 33, 223 (hoặc thị hiển thị "TỔNG", "ĐẠT", "KHÔNG", "ĐÃ DUYỆT")
- [ ] Nút "📋 Danh sách 223 Sinh viên" có thể click
- [ ] Danh sách sinh viên mở thành công
- [ ] Bảng hiển thị 223 hàng (hoặc ít hơn nếu có lọc)
- [ ] STT 1: Hồ Anh Thư - 3121200023
- [ ] STT 2: Trần Anh Thư - 3122200012
- [ ] STT 191 (hoặc đó): Bùi Cao Ái Trân - 3123430196 (KHÔNG ĐẠT)
- [ ] Tìm kiếm hoạt động (gõ tên → danh sách cập nhật)
- [ ] Lọc hoạt động (chọn "Không đạt" → chỉ 33 sinh viên)
- [ ] Các hàng có màu:
  - Xanh (✓ ĐẠT) cho sinh viên đạt
  - Đỏ (✗ KHÔNG ĐẠT) cho sinh viên không đạt

---

## 🎯 KẾT LUẬN

✅ **Bạn CHẮC CHẮN sẽ thấy dữ liệu 223 sinh viên trên website:**

1. **Trang chủ (home.html)** → Thống kê tổng quan
2. **Danh sách (students-list-real.html)** → Bảng 223 sinh viên chi tiết
3. **Tìm kiếm** → Tìm sinh viên theo tên/MSV
4. **Lọc** → Chỉ xem sinh viên đạt hoặc không đạt
5. **Màu sắc** → Xanh (đạt), Đỏ (không đạt)

---

**Hệ thống Quản lý Sinh viên 5 tốt v1.0**  
**Trường Đại học Sài Gòn - 2024-2025**

