const express = require("express");
const cors = require("cors"); // Khai báo thư viện cors (xử lý CORS - Cross-Origin Resource Sharing).
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter); // Sử dụng contactsRouter cho các route /api/contacts

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
    return next(new ApiError(404, "Resoure not found")); // Tạo lỗi 404 và chuyển cho middleware xử lý lỗi
});

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ // Trả về mã lỗi hoặc 500 nếu không có
        message: err.message || "Internal Server Error", // Trả về message lỗi hoặc "Internal Server Error"
    });
});

// Route mặc định (/)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."}); // Trả về message chào mừng
});
module.exports = app;