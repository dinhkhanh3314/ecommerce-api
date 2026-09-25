const prisma = require("../config/prisma");

const getShipments = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      include: {
        order: true,
      },
    });

    res.json(shipments);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách shipment",
    });
  }
};

const getShipmentById = async (req, res) => {
  try {
    const shipid = Number(req.params.id);

    const shipment = await prisma.shipment.findUnique({
      where: { shipid },
      include: {
        order: true,
      },
    });

    if (!shipment) {
      return res.status(404).json({
        message: "Không tìm thấy shipment",
      });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy shipment",
    });
  }
};

const createShipment = async (req, res) => {
  try {
    const { shipid, oid, status } = req.body;

    const shipment = await prisma.shipment.create({
      data: {
        shipid,
        oid,
        status,
      },
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo shipment",
    });
  }
};

const updateShipment = async (req, res) => {
  try {
    const shipid = Number(req.params.id);
    const { oid, status } = req.body;

    const shipment = await prisma.shipment.update({
      where: { shipid },
      data: {
        oid,
        status,
      },
    });

    res.json(shipment);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật shipment",
    });
  }
};

const deleteShipment = async (req, res) => {
  try {
    const shipid = Number(req.params.id);

    await prisma.shipment.delete({
      where: { shipid },
    });

    res.json({
      message: "Xóa shipment thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa shipment",
    });
  }
};

module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment,
};
