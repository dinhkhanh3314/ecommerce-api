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

module.exports = {
  getProducts,
};
