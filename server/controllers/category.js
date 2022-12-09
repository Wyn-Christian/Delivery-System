const { body, validationResult } = require("express-validator");
const async = require("async");

const Product = require("../models/product");
const Category = require("../models/category");

// Get list of all categorys
exports.list = function (req, res, next) {
  Category.find({
    auth_key: req.query.api_key,
  }).exec((err, list_categories) => {
    if (err) return next(err);

    // Success
    res.json({
      list_categories,
    });
  });
};

// Get details for a specific category
exports.detail = (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: category detail: ${req.params.id}`);
  Category.findOne({
    auth_key: req.query.api_key,
    _id: req.params.id,
  }).exec((err, category) => {
    if (err) return next(err);

    // Success
    res.json({
      category,
    });
  });
};

// Handle category create on POST
exports.create = [
  // Validation and Sanitazation
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process the data from form
  (req, res, next) => {
    // Extract validation errors from sanitized data
    const errors = validationResult(req);

    const new_category = new Category({
      api_id: req.body.id,
      name: req.body.name,
      auth_key: req.body.auth_key,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    // Data from form is valid. Save category
    new_category.save((err) => {
      if (err) return next(err);

      // Success! send the new category
      return res.json({ new_category });
    });
  },
];

// Handle category delete on POST
exports.delete = (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: category delete POST: ${req.params.id}`);
  async.parallel(
    {
      products(callback) {
        console.log("product category deleteing");
        Product.updateMany(
          { category_id: req.params.id },
          { category_id: null }
        ).exec(callback);
      },
      delete_category(callback) {
        Category.findByIdAndDelete(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("no error shesh");

      // Success!
      res.json({ results });
    }
  );
};

// Handle category update on POST
exports.update = [
  // Validation and Sanitazation
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process the data from form
  (req, res, next) => {
    // Extract validation errors from sanitized data
    const errors = validationResult(req);

    const category = {
      api_id: req.body.id,
      name: req.body.name,
    };

    if (!errors.isEmpty()) {
      // There are errors.
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    Category.findByIdAndUpdate(
      req.params.id,
      category,
      { new: true },
      (err, updated_category) => {
        if (err) return next(err);

        // Success: return the updated data
        res.json({ updated_category });
        return;
      }
    );
  },
];
