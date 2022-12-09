const { default: mongoose } = require("mongoose");
const { body, validationResult } = require("express-validator");
const async = require("async");

const Product = require("../models/product");
const Category = require("../models/category");
const Variant = require("../models/variant");

exports.counts = function (req, res, next) {
  async.parallel(
    {
      product_count(callback) {
        Product.countDocuments({ auth_key: req.query.api_key }, callback);
      },
      category_count(callback) {
        Category.countDocuments({ auth_key: req.query.api_key }, callback);
      },
      variant_count(callback) {
        Variant.countDocuments({ auth_key: req.query.api_key }, callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.json({ err, results });
    }
  );
};

// Get list of all products
exports.list = (req, res, next) => {
  Product.find({
    auth_key: req.query.api_key,
  })
    .lean()
    .populate("category_id", "api_id name")
    .populate("variants_id", "api_id name price_multiplier")
    .exec((err, list_products) => {
      if (err) return next(err);

      // Success
      res.json({
        list_products,
      });
    });
};

// Get details for a specific product
exports.detail = (req, res, next) => {
  let query = {
    auth_key: req.query.api_key,
  };
  if (mongoose.isValidObjectId(req.params.id)) {
    query._id = req.params.id;
  } else {
    query.api_id = req.params.id;
  }
  Product.findOne(query)
    .lean()
    .populate("category_id", "api_id name")
    .populate("variants_id", "api_id name price_multiplier")
    .exec((err, product) => {
      if (err) return next(err);

      // Success
      res.json({
        product,
      });
    });
};

// Handle product create on POST
exports.create = [
  // Convert the variant to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.variants)) {
      req.body.variants =
        typeof req.body.variants === "undefined" ? [] : [req.body.variants];
    }
    if (!Array.isArray(req.body.image_path)) {
      req.body.image_path =
        typeof req.body.image_path === "undefined" ? [] : [req.body.image_path];
    }
    next();
  },
  // Validate and Sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Product object with escaped and trimmed data
    const new_product = new Product({
      api_id: req.body.api_id,
      name: req.body.name,
      price: req.body.price,
      stocks: req.body.stocks,
      image_path: req.body.image_path,
      category_id: req.body.category,
      variants_id: req.body.variants,
      auth_key: req.body.api_key,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.json(errors);
    }

    // Data from form is valid. Save product
    new_product.save((err) => {
      if (err) return next(err);

      // Success: return the json
      res.json({ new_product });
      return;
    });
  },
];

// Handle product delete on POST
exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, removed_product) => {
    if (err) return next(err);

    if (!removed_product) {
      res.json({ status: "Failed" });
      return;
    }

    // Sucess
    res.json({ status: "Success", removed_product });
    return;
  });
};

// Handle product update on POST
exports.update = [
  // Convert the variant to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.variants)) {
      req.body.variants =
        typeof req.body.variants === "undefined" ? [] : [req.body.variants];
    }
    if (!Array.isArray(req.body.image_path)) {
      req.body.image_path =
        typeof req.body.image_path === "undefined" ? [] : [req.body.image_path];
    }
    next();
  },
  // Validate and Sanitize fields
  body("name").trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Product object with escaped and trimmed data
    const product = {
      api_id: req.body.api_id,
      name: req.body.name,
      price: req.body.price,
      stocks: req.body.stocks,
      image_path: req.body.image_path,
      category_id: req.body.category,
    };
    if (req.body.variants.length != 0) {
      product.variants_id = req.body.variants;
    }
    if (!errors.isEmpty()) {
      // There are errors.
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    // Data from form is valid. Save product
    Product.findByIdAndUpdate(
      req.params.id,
      product,
      { new: true },
      (err, updated_product) => {
        if (err) return next(err);

        // Success: return the json
        res.json({ updated_product });
        return;
      }
    );
  },
];
