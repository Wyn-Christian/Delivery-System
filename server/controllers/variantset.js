const async = require("async");

const VariantSet = require("../models/variantset");

// Get list of all variants
exports.list = function (req, res, next) {
  VariantSet.find({})
    .populate("variants_id")
    .exec((err, list_variant_sets) => {
      if (err) return next(err);

      // Sucess
      res.json({ list_variant_sets });
      return;
    });
};
exports.user_list = function (req, res, next) {
  VariantSet.find({
    user_id: req.params.user_id,
  }).exec((err, list_variant_sets) => {
    if (err) return next(err);

    res.json({ list_variant_sets });
    return;
  });
};

exports.detail = (req, res, next) => {
  VariantSet.findOne(req.params.id).exec((err, variant_set) => {
    if (err) return next(err);

    res.json({ variant_set });
  });
};

exports.create = (req, res, next) => {
  const new_variant_set = new VariantSet({
    _id: req.body.id,
    name: req.body.name,
    variants_id:
      typeof req.body.variants_id === "undefined"
        ? []
        : req.body.variants_id,

    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.id,
    auth_key: req.body.api_key,
  });

  new_variant_set.save((err) => {
    if (err) return next(err);

    return res.json({ new_variant_set });
  });
};

// Handle variant delete on POST
exports.delete = (req, res, next) => {
  VariantSet.findByIdAndDelete(req.params.id).exec(
    (err, deleted_variant_set) => {
      if (err) return next(err);

      res.json({ deleted_variant_set });
      return;
    }
  );
};

exports.update = (req, res, next) => {
  const variant_set = {
    name: req.body.name,
    variants_id:
      typeof req.body.variants_id === "undefined"
        ? []
        : req.body.variants_id,

    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.id,
    auth_key: req.body.api_key,
  };

  VariantSet.findByIdAndUpdate(
    req.params.id,
    variant_set,
    { new: true },
    (err, updated_variant_set) => {
      if (err) return next(err);

      // Success: return the updated data
      res.json({ updated_variant_set });
      return;
    }
  );
};
