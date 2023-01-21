const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");

/// USER ROUTES ///
router.post("/create", user_controller.create);
router.post("/login", user_controller.login);
router.post("/:id/delete", user_controller.delete);
router.post("/:id/update", user_controller.update);
router.get("/:id/dashboard", user_controller.dashboard);
router.get("/:id", user_controller.detail);
router.get("/", user_controller.list);

module.exports = router;
