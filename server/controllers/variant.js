const { body, validationResult } = require("express-validator");
const async = require("async");
const { default: mongoose } = require("mongoose");

const VariantSet = require("../models/variantset");
const Variant = require("../models/variant");

// Get list of all variants
exports.list = function (req, res, next) {
  Variant.find({}).exec((err, list_variants) => {
    if (err) return next(err);

    // Sucess
    res.json({ list_variants });
    return;
  });
};

exports.user_list = function (req, res, next) {
  Variant.find({
    user_id: req.params.user_id,
  }).exec((err, list_variants) => {
    if (err) return next(err);

    res.json({ list_variants });
    return;
  });
};

// Get details for a specific variant
exports.detail = (req, res, next) => {
  Variant.findOne(req.params.id).exec((err, variant) => {
    if (err) return next(err);

    res.json({ variant });
  });
};

// Handle variant create on POST
exports.create = (req, res, next) => {
  const new_variant = new Variant({
    _id: req.body.id,
    name: req.body.name,
    price_multiplier: req.body.price_multiplier,
    variant_set_id: req.body.variant_set_id,

    auth_key: req.body.api_key,
    api_id: req.body.id,
  });

  new_variant.save((err) => {
    if (err) return next(err);

    return res.json({ new_variant });
  });
};

// Handle variant delete on POST
exports.delete = (req, res, next) => {
  async.parallel(
    {
      variantset(callback) {
        VariantSet.updateMany(
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
        return next(err);
      }

      // Success!
      res.json({ results });
    }
  );
};

exports.update = (req, res, next) => {
  const variant = {
    name: req.body.name,
    price_multiplier: req.body.price_multiplier,
    variant_set_id: req.body.variant_set_id,

    api_id: req.body.id,
  };

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
};
