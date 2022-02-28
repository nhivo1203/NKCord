const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      //gửi token mới
      const token = "day_la_bi_mat";

      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
        },
      });
    }

    return res.status(400).send("")
  } catch (err) {
    return res.status(500).send("Lỗi rồi ! Hãy thử lại sao");
  }
};

module.exports = postLogin;
