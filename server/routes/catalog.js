const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/product");
const category_controller = require("../controllers/category");
const variant_controller = require("../controllers/variant");
const variant_set_controller = require("../controllers/variantset");
const inventory_controller = require("../controllers/inventory");
const checkout_item_controller = require("../controllers/checkoutitem");

/* GET catalog home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("This is the index of your server app of Delivery System.");
});

router.get("/counts", product_controller.counts);

/// INVENTORY ROUTES ///
router.post("/inventory/create", inventory_controller.create);
router.post("/inventory/:id/delete", inventory_controller.delete);
router.post("/inventory/:id/update", inventory_controller.update);
router.get("/inventory/:id", inventory_controller.detail);
router.get("/inventories/:user_id", inventory_controller.user_list);
router.get("/inventories", inventory_controller.list);

/// CATEGORY ROUTES ///
router.post("/category/create", category_controller.create);
router.post("/category/:id/delete", category_controller.delete);
router.post("/category/:id/update", category_controller.update);
router.get("/category/:id", category_controller.detail);
router.get("/categories/:user_id", category_controller.user_list);
router.get("/categories", category_controller.list);

/// VARIANT ROUTES ///
router.post("/variant/create", variant_controller.create);
router.post("/variant/:id/delete", variant_controller.delete);
router.post("/variant/:id/update", variant_controller.update);
router.get("/variant/:id", variant_controller.detail);
router.get("/variants/:user_id", variant_controller.user_list);
router.get("/variants", variant_controller.list);

/// VARIANT SET ROUTES ///
router.post("/variant-set/create", variant_set_controller.create);
router.post("/variant-set/:id/delete", variant_set_controller.delete);
router.post("/variant-set/:id/update", variant_set_controller.update);
router.get("/variant-set/:id", variant_set_controller.detail);
router.get("/variant-sets/:user_id", variant_set_controller.user_list);
router.get("/variant-sets", variant_set_controller.list);

/// PRODUCT ROUTES ///
router.post("/product/create", product_controller.create);
router.post("/product/:id/delete", product_controller.delete);
router.post("/product/:id/update", product_controller.update);
router.get("/product/:id", product_controller.detail);
router.get(
  "/products/inventory/:inventory_id",
  product_controller.inventory_list
);
router.get("/products/:user_id", product_controller.user_list);
router.get("/products", product_controller.list);

/// CHECKOUT ITEM ROUTES ///
router.post("/checkout-item/create", checkout_item_controller.create);
router.post("/checkout-item/:id/delete", checkout_item_controller.delete);
router.post("/checkout-item/:id/update", checkout_item_controller.update);
router.get("/checkout-item/:id", checkout_item_controller.detail);
router.get("/checkout-items/:user_id", checkout_item_controller.user_list);
router.get("/checkout-items/", checkout_item_controller.list);

module.exports = router;
