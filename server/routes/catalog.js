const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/product");
const category_controller = require("../controllers/category");
const variant_controller = require("../controllers/variant");
const checkout_controller = require("../controllers/checkout");
const authKey_controller = require("../controllers/authKey");

router.all("*", function (req, res, next) {
  console.log(`NOT IMPLEMENTED: API key authentication: ${req.query.api_key} `);
  next();
});

/* GET catalog home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("This is the index of your server app of Delivery System.");
});

router.get("/counts", product_controller.counts);

/// PRODUCT ROUTES ///
router.post("/product/create", product_controller.create);
router.post("/product/:id/delete", product_controller.delete);
router.post("/product/:id/update", product_controller.update);
router.get("/product/:id", product_controller.detail);
router.get("/products", product_controller.list);

/// CATEGORY ROUTES ///
router.post("/category/create", category_controller.create);
router.post("/category/:id/delete", category_controller.delete);
router.post("/category/:id/update", category_controller.update);
router.get("/category/:id", category_controller.detail);
router.get("/categories", category_controller.list);

/// VARIANTS ROUTES ///
router.post("/variant/create", variant_controller.create);
router.post("/variant/:id/delete", variant_controller.delete);
router.post("/variant/:id/update", variant_controller.update);
router.get("/variant/:id", variant_controller.detail);
router.get("/variants", variant_controller.list);

/// Checkout ROUTES ///
router.post("/checkout/create", checkout_controller.create);
router.post("/checkout/:id/delete", checkout_controller.delete);
router.post("/checkout/:id/update", checkout_controller.update);
router.get("/checkout/:id", checkout_controller.detail);
router.get("/checkouts", checkout_controller.list);

module.exports = router;
