const prisma = require("../config/prisma");

const getMemberships = async (req, res) => {
  try {
    const memberships = await prisma.membership.findMany();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách membership",
    });
  }
};

const getMembershipById = async (req, res) => {
  try {
    const mid = Number(req.params.id);

    const membership = await prisma.membership.findUnique({
      where: { mid },
    });

    if (!membership) {
      return res.status(404).json({
        message: "Không tìm thấy membership",
      });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy membership",
    });
  }
};

const createMembership = async (req, res) => {
  try {
    const { mid, mname, score } = req.body;

    const membership = await prisma.membership.create({
      data: {
        mid,
        mname,
        score,
      },
    });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm membership",
    });
  }
};

const updateMembership = async (req, res) => {
  try {
    const mid = Number(req.params.id);
    const { mname, score } = req.body;

    const membership = await prisma.membership.update({
      where: { mid },
      data: {
        mname,
        score,
      },
    });

    res.json(membership);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật membership",
    });
  }
};

const deleteMembership = async (req, res) => {
  try {
    const mid = Number(req.params.id);

    await prisma.membership.delete({
      where: { mid },
    });

    res.json({
      message: "Xóa membership thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa membership",
    });
  }
};

module.exports = {
  getMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
};
