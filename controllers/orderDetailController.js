const prisma = require("../config/prisma");

const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await prisma.orderDetail.findMany({
      include: {
        order: true,
        product: true,
      },
    });

    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách chi tiết đơn hàng",
    });
  }
};

const getOrderDetailById = async (req, res) => {
  try {
    const oid = Number(req.params.oid);
    const pid = Number(req.params.pid);

    const orderDetail = await prisma.orderDetail.findUnique({
      where: {
        oid_pid: {
          oid,
          pid,
        },
      },
      include: {
        order: true,
        product: true,
      },
    });

    if (!orderDetail) {
      return res.status(404).json({
        message: "Không tìm thấy chi tiết đơn hàng",
      });
    }

    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy chi tiết đơn hàng",
    });
  }
};

const createOrderDetail = async (req, res) => {
  try {
    const { oid, pid, qty, unit_price } = req.body;

    const orderDetail = await prisma.orderDetail.create({
      data: {
        oid,
        pid,
        qty,
        unit_price,
      },
    });

    res.status(201).json(orderDetail);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm chi tiết đơn hàng",
    });
  }
};

const updateOrderDetail = async (req, res) => {
  try {
    const oid = Number(req.params.oid);
    const pid = Number(req.params.pid);

    const { qty, unit_price } = req.body;

    const orderDetail = await prisma.orderDetail.update({
      where: {
        oid_pid: {
          oid,
          pid,
        },
      },
      data: {
        qty,
        unit_price,
      },
    });

    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật chi tiết đơn hàng",
    });
  }
};

const deleteOrderDetail = async (req, res) => {
  try {
    const oid = Number(req.params.oid);
    const pid = Number(req.params.pid);

    await prisma.orderDetail.delete({
      where: {
        oid_pid: {
          oid,
          pid,
        },
      },
    });

    res.json({
      message: "Xóa chi tiết đơn hàng thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa chi tiết đơn hàng",
    });
  }
};

module.exports = {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
