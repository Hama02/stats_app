const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/profile", authController.protect, adminController.getAdminProfile);
router.put("/update", authController.protect, adminController.updateAdmin);
router.put(
  "/updatePassword",
  authController.protect,
  adminController.updatePassword
);

module.exports = router;
