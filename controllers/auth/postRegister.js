const User = require("../../models/users");
const bcrypt = require("bcryptjs");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    //kiểm tra người dùng đã tồn tại chưa
    const userExists = await User.exists({ mail });

    if (userExists) {
      return res.status(409).send("Người dùng đã tồn tại !");
    }

    //mã hóa password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //tạo dữ liệu người dùng
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    //tạo JWT token
    const token = "day la bi mat";

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send("Lỗi rồi! Hãy thử lại sau");
  }
};

module.exports = postRegister;
