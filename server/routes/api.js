var express = require("express");
var router = express.Router();

const api_controller = require("../controllers/api");

// get products
router.get("/:api_id/products", api_controller.products);
router.get("/:api_id/stocks", api_controller.stocks);
router.post(
  "/:api_id/add-checkout-items",
  api_controller.add_checkout_items
);

module.exports = router;
