const async = require("async");

const Product = require("../models/product");
const Category = require("../models/category");

exports.list = function (req, res, next) {
  Category.find({}).exec((err, list_categories) => {
    if (err) return next(err);

    // Success
    res.json({
      list_categories,
    });
  });
};

exports.user_list = function (req, res, next) {
  Category.find({ user_id: req.params.user_id }).exec(
    (err, list_categories) => {
      if (err) return next(err);

      // Success
      res.json({ list_categories });
    }
  );
};

exports.detail = (req, res, next) => {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) return next(err);

    // Success
    res.json({ category });
  });
};

exports.create = (req, res, next) => {
  const new_category = new Category({
    _id: req.body.id,
    name: req.body.name,
    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.id,
    auth_key: req.body.auth_key,
  });

  new_category.save((err) => {
    if (err) return next(err);

    // Success! send the new category
    return res.json({ new_category });
  });
};

exports.delete = (req, res, next) => {
  async.parallel(
    {
      products(callback) {
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

exports.update = (req, res, next) => {
  const category = {
    name: req.body.name,
    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.id,
    auth_key: req.body.auth_key,
  };

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
};
