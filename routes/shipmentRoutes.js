const express = require("express");
const router = express.Router();

const shipmentController = require("../controllers/shipmentController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, shipmentController.getShipments);
router.get("/:id", authenticateToken, shipmentController.getShipmentById);
router.post("/", authenticateToken, shipmentController.createShipment);
router.put("/:id", authenticateToken, shipmentController.updateShipment);
router.delete("/:id", authenticateToken, shipmentController.deleteShipment);

module.exports = router;
