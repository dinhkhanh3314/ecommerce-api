const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { uid, username, fullname, password, roleid, mid } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        uid,
        username,
        fullname,
        password: hashedPassword,
        roleid,
        mid,
      },
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        uid: user.uid,
        username: user.username,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi đăng ký",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        message: "Username hoặc password không đúng",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Username hoặc password không đúng",
      });
    }

    const token = jwt.sign(
      {
        uid: user.uid,
        username: user.username,
        roleid: user.roleid,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi đăng nhập",
    });
  }
};

module.exports = {
  register,
  login,
};
