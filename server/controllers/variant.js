const { body, validationResult } = require("express-validator");
const async = require("async");
const { default: mongoose } = require("mongoose");

const Product = require("../models/product");
const Variant = require("../models/variant");

// Get list of all variants
exports.list = function (req, res, next) {
  Variant.find({ auth_key: req.query.api_key }, (err, list_variants) => {
    if (err) return next(err);

    // Sucess
    res.json({ list_variants });
  });
};

// Get details for a specific variant
exports.detail = (req, res, next) => {
  let query = {
    auth_key: req.query.api_key,
  };
  if (mongoose.isValidObjectId(req.params.id)) {
    query._id = req.params.id;
  } else {
    query.api_id = req.params.id;
  }
  console.log("query:" + query);
  Variant.findOne(query).exec((err, variant) => {
    if (err) return next(err);

    res.json({ variant });
  });
};

// Handle variant create on POST
exports.create = [
  // Validation and Sanitization
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("price_multiplier", "Price Multiplier must not be empty")
    .isDecimal()
    .optional({ checkFalsy: true }),

  (req, res, next) => {
    const errors = validationResult(req);

    const new_variant = new Variant({
      api_id: req.body.id,
      name: req.body.name,
      price_multiplier: req.body.price_multiplier,
      auth_key: req.body.api_key,
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    new_variant.save((err) => {
      if (err) return next(err);

      return res.json({ new_variant });
    });
  },
];

// Handle variant delete on POST
exports.delete = (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: variant delete POST: ${req.params.id}`);
  async.parallel(
    {
      products(callback) {
        Product.updateMany(
          { variants_id: req.params.id },
          { $pull: { variants_id: req.params.id } }
        ).exec(callback);
      },
      deleted_variant(callback) {
        Variant.findByIdAndDelete(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      // Success!
      res.json({ results });
    }
  );
};

// Handle variant update on POST
exports.update = [
  // Validation and Sanitization
  body("name", "Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .optional({ checkFalsy: true }),
  body("price_multiplier", "Price Multiplier must not be empty")
    .isDecimal()
    .optional({ checkFalsy: true }),

  (req, res, next) => {
    const errors = validationResult(req);

    const variant = {
      api_id: req.body.id,
      name: req.body.name,
      price_multiplier: req.body.price_multiplier,
    };

    if (!errors.isEmpty()) {
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    Variant.findByIdAndUpdate(
      req.params.id,
      variant,
      { new: true },
      (err, updated_variant) => {
        if (err) return next(err);

        // Success: return the updated data
        res.json({ updated_variant });
        return;
      }
    );
  },
];
