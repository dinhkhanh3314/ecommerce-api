const express = require("express");
const router = express.Router();

const orderDetailController = require("../controllers/orderDetailController");

router.get("/", orderDetailController.getOrderDetails);
router.get("/:oid/:pid", orderDetailController.getOrderDetailById);
router.post("/", orderDetailController.createOrderDetail);
router.put("/:oid/:pid", orderDetailController.updateOrderDetail);
router.delete("/:oid/:pid", orderDetailController.deleteOrderDetail);

module.exports = router;
