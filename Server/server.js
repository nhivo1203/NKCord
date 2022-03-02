const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

//đăng ký
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Kết nối CSDL thành công");
    server.listen(PORT, () => {
      console.log(`Server đang chạy port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Không kết nối được CSDL");
    console.error(err);
  });
