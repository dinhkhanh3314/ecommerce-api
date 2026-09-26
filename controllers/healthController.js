const prisma = require("../config/prisma");

const healthCheck = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "OK",
      message: "API và Database đang hoạt động",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database không kết nối được",
    });
  }
};

module.exports = {
  healthCheck,
};
