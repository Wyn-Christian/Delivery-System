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
  Product.find({})
    .populate("category_id")
    .populate("variant_set_id")
    .populate("user_id")
    .exec((err, list_products) => {
      if (err) return next(err);

      // Success
      res.json({
        list_products,
      });
    });
};

exports.user_list = (req, res, next) => {
  Product.find({ user_id: req.params.user_id })
    .populate("category_id")
    .populate({
      path: "variant_set_id",
      populate: {
        path: "variants_id",
        model: "Variant",
      },
    })
    .exec((err, list_products) => {
      if (err) return next(err);

      // Success
      res.json({
        list_products,
      });
    });
};

exports.inventory_list = (req, res, next) => {
  Product.find({ inventory_id: req.params.inventory_id })
    .populate("category_id")
    .populate({
      path: "variant_set_id",
      populate: {
        path: "variants_id",
        model: "Variant",
      },
    })
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
  Product.findById(req.params.id)
    .populate("category_id")
    .populate("variant_set_id")
    .populate("variants_id")
    .exec((err, product) => {
      if (err) return next(err);

      // Success
      res.json({ product });
    });
};

exports.create = (req, res, next) => {
  const new_product = new Product({
    _id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    stocks: req.body.stocks,
    img_name: req.body.img_name,

    category_id: req.body.category_id,
    variant_set_id: req.body.variant_set_id,

    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.api_id,
    image_path: req.body.image_path,
    variants_id: req.body.variants,
    auth_key: req.body.api_key,
  });

  new_product.save((err) => {
    if (err) return next(err);

    // Success: return the json
    res.json(new_product);
    return;
  });
};

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

exports.update = (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    stocks: req.body.stocks,
    img_name: req.body.img_name,

    category_id: req.body.category_id,
    variant_set_id: req.body.variant_set_id,

    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.api_id,
    image_path: req.body.image_path,
    variants_id: req.body.variants,
    auth_key: req.body.api_key,
  };

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
};
