const prisma = require("../config/prisma");

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sản phẩm",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const pid = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { pid },
    });

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy sản phẩm",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;

    const product = await prisma.product.create({
      data: {
        pid,
        pname,
        price,
        quantity,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm sản phẩm",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const pid = Number(req.params.id);
    const { pname, price, quantity } = req.body;

    const product = await prisma.product.update({
      where: { pid },
      data: {
        pname,
        price,
        quantity,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật sản phẩm",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const pid = Number(req.params.id);

    await prisma.product.delete({
      where: { pid },
    });

    res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa sản phẩm",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
