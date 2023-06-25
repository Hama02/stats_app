const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router.get("/", projectController.getAllProjects);
router.get("/project", projectController.getProject);
router.post("/add", projectController.addProject);
router.delete("/delete", projectController.deleteProject);
router.put("/update", projectController.updateProject);

module.exports = router;
