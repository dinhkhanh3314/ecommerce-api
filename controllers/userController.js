const prisma = require("../config/prisma");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        membership: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách user",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const uid = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { uid },
      include: {
        role: true,
        membership: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy user",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy user",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { uid, username, fullname, password, roleid, mid } = req.body;

    const user = await prisma.user.create({
      data: {
        uid,
        username,
        fullname,
        password,
        roleid,
        mid,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const uid = Number(req.params.id);

    const { username, fullname, password, roleid, mid } = req.body;

    const user = await prisma.user.update({
      where: { uid },
      data: {
        username,
        fullname,
        password,
        roleid,
        mid,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const uid = Number(req.params.id);

    await prisma.user.delete({
      where: { uid },
    });

    res.json({
      message: "Xóa user thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa user",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
