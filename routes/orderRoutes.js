const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, orderController.getOrders);
router.get("/:id", authenticateToken, orderController.getOrderById);
router.post("/", authenticateToken, orderController.createOrder);
router.put("/:id", authenticateToken, orderController.updateOrder);
router.delete("/:id", authenticateToken, orderController.deleteOrder);

module.exports = router;
