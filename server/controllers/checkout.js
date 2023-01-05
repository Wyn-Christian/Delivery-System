const { body, validationResult } = require("express-validator");
const async = require("async");
const { default: mongoose } = require("mongoose");

const Checkout = require("../models/checkout");
const Product = require("../models/product");
const Category = require("../models/category");
const Variant = require("../models/variant");

// Get list of all checkouts
exports.list = function (req, res, next) {
  Checkout.find({
    auth_key: req.query.api_key,
  })
    .lean()
    .populate("product_id")
    .populate("variant_id")
    .exec((err, list_checkouts) => {
      if (err) return next(err);

      // Success
      res.json({
        list_checkouts,
      });
    });
};

// Get details for a specific checkout
exports.detail = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: checkout detail: ${req.params.id}`);
};

// Handle checkout create on POST
exports.create = [
  // Validate and Sanitize fields
  body("quantity", "Quantity must not be empty").isNumeric(),
  body("total_price", "Total Price must not be empty").isDecimal(),
  // Update the product's stock
  (req, res, next) => {
    if (
      mongoose.isValidObjectId(req.body.product_id) &&
      typeof req.body.product_id != "number"
    ) {
      res.locals.product_id = req.body.product_id;
      res.locals.stocks = result.stocks;
      next();
    } else {
      let query = {
        auth_key: req.query.api_key,
        api_id: req.body.product_id,
      };
      Product.findOne(query, (err, result) => {
        res.locals.product_id = result._id;
        res.locals.stocks = result.stocks;
        next();
      });
    }
    return;
  },
  (req, res, next) => {
    if (
      mongoose.isValidObjectId(req.body.variant_id) &&
      typeof req.body.variant_id != "number"
    ) {
      res.locals.variant_id = req.body.variant_id;
      next();
    } else {
      let query = {
        auth_key: req.query.api_key,
        api_id: req.body.variant_id,
      };
      Variant.findOne(query, (err, result) => {
        res.locals.variant_id = result._id;
        next();
      });
    }

    return;
  },
  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    const new_checkout = new Checkout({
      api_id: req.body.api_id,
      total_price: req.body.total_price,
      quantity: req.body.quantity,
      product_id: res.locals.product_id,
      variant_id: res.locals.variant_id,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.json(errors);
    }

    // Data from form is valid. Save product
    new_checkout.save((err) => {
      if (err) return next(err);
      // Success: go to the next middleware
      res.locals.new_checkout = new_checkout;
      next();
    });
  },

  (req, res, next) => {
    let current_stocks = res.locals.stocks;
    let ordered_stocks = req.body.quantity;
    let new_stocks = current_stocks - ordered_stocks;

    const updated_product_stock = {
      stocks: new_stocks,
    };

    let product_id = res.locals.product_id;
    Product.findByIdAndUpdate(
      product_id,
      updated_product_stock,
      { new: true },
      (err, updated_product) => {
        if (err) return next(err);

        // Success: return the json
        res.json({ new_checkout: res.locals.new_checkout, updated_product });
        return;
      }
    );
  },
];

// Handle checkout delete on POST
exports.delete = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: checkout delete POST: ${req.params.id}`);
};

// Handle checkout update on POST
exports.update = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: checkout update POST: ${req.params.id}`);
};
