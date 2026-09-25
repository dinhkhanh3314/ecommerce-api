const express = require("express");
const router = express.Router();

const orderDetailController = require("../controllers/orderDetailController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, orderDetailController.getOrderDetails);
router.get(
  "/:oid/:pid",
  authenticateToken,
  orderDetailController.getOrderDetailById,
);
router.post("/", authenticateToken, orderDetailController.createOrderDetail);
router.put(
  "/:oid/:pid",
  authenticateToken,
  orderDetailController.updateOrderDetail,
);
router.delete(
  "/:oid/:pid",
  authenticateToken,
  orderDetailController.deleteOrderDetail,
);

module.exports = router;
