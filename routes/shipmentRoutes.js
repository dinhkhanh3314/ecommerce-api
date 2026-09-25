const express = require("express");
const router = express.Router();

const shipmentController = require("../controllers/shipmentController");

router.get("/", shipmentController.getShipments);
router.get("/:id", shipmentController.getShipmentById);
router.post("/", shipmentController.createShipment);
router.put("/:id", shipmentController.updateShipment);
router.delete("/:id", shipmentController.deleteShipment);

module.exports = router;
