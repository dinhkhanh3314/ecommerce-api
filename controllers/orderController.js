const prisma = require("../config/prisma");

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        orderDetails: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách đơn hàng",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const oid = Number(req.params.id);

    const order = await prisma.order.findUnique({
      where: { oid },
      include: {
        user: true,
        orderDetails: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy đơn hàng",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { oid, uid, createat } = req.body;

    const order = await prisma.order.create({
      data: {
        oid,
        uid,
        createat: createat ? new Date(createat) : new Date(),
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo đơn hàng",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const oid = Number(req.params.id);
    const { uid, createat } = req.body;

    const order = await prisma.order.update({
      where: { oid },
      data: {
        uid,
        createat: createat ? new Date(createat) : undefined,
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật đơn hàng",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const oid = Number(req.params.id);

    await prisma.order.delete({
      where: { oid },
    });

    res.json({
      message: "Xóa đơn hàng thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa đơn hàng",
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
