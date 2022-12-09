const express = require("express");
const router = express.Router();

const authKey_controller = require("../controllers/authKey");

/// AUTH KEY ROUTES ///
router.post("/create", authKey_controller.create);
router.post("/:id/delete", authKey_controller.delete);
router.post("/:id/update", authKey_controller.update);
router.get("/:id", authKey_controller.detail);
router.get("/", authKey_controller.list);

module.exports = router;
