const prisma = require("../config/prisma");

const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách quyền",
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const roleid = Number(req.params.id);

    const role = await prisma.role.findUnique({
      where: { roleid },
    });

    if (!role) {
      return res.status(404).json({
        message: "Không tìm thấy quyền",
      });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy quyền",
    });
  }
};

const createRole = async (req, res) => {
  try {
    const { roleid, rolename } = req.body;

    const role = await prisma.role.create({
      data: {
        roleid,
        rolename,
      },
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm quyền",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleid = Number(req.params.id);
    const { rolename } = req.body;

    const role = await prisma.role.update({
      where: { roleid },
      data: {
        rolename,
      },
    });

    res.json(role);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật quyền",
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleid = Number(req.params.id);

    await prisma.role.delete({
      where: { roleid },
    });

    res.json({
      message: "Xóa quyền thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa quyền",
    });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
