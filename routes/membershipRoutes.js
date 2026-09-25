const express = require("express");
const router = express.Router();

const membershipController = require("../controllers/membershipController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, membershipController.getMemberships);
router.get("/:id", authenticateToken, membershipController.getMembershipById);
router.post("/", authenticateToken, membershipController.createMembership);
router.put("/:id", authenticateToken, membershipController.updateMembership);
router.delete("/:id", authenticateToken, membershipController.deleteMembership);

module.exports = router;
