const { body, validationResult } = require("express-validator");
const async = require("async");

const User = require("../models/user");
const CheckOutItem = require("../models/checkoutitem");
const Product = require("../models/product");

// Get list of all users
exports.list = function (req, res, next) {
  User.find({}, (err, list_users) => {
    if (err) return next(err);

    res.json({ list_users });
  });
};

exports.detail = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);

    res.json({ user });
  });
};

exports.login = (req, res, next) => {
  User.find(
    {
      username: req.body.username,
      password: req.body.password,
    },
    (err, user) => {
      if (err) return next(err);

      res.json(user);
    }
  );
};

exports.create = (req, res, next) => {
  const new_user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,

    username: req.body.username,
    password: req.body.password,
  });

  // Data from form is valid. Save product
  new_user.save((err) => {
    if (err) return next(err);

    // Success: return the json
    res.json({ new_user });
    return;
  });
};

exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, removed_user) => {
    if (err) return next(err);

    if (!removed_user) {
      res.json({ status: "Failed", message: "ID doesn't exist!" });
      return;
    }

    // Sucess
    res.json({ status: "Success", removed_user });
    return;
  });
};

// Handle user update on POST
exports.update = (req, res, next) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,

    username: req.body.username,
    password: req.body.password,
  };

  User.findByIdAndUpdate(
    req.params.id,
    user,
    { new: true },
    (err, updated_user) => {
      if (err) return next(err);

      // Success, return the updated document
      res.json({ updated_user });
      return;
    }
  );
};

exports.dashboard = async (req, res, next) => {
  let checkout_items = await CheckOutItem.aggregate([
    {
      $group: {
        _id: null,
        total_product_bought: {
          $sum: "$quantity",
        },
        total_sales: {
          $sum: "$total_price",
        },
      },
    },
  ]);
  let total_products = await Product.find({
    user_id: req.params.id,
  }).count();
  res.json({ checkout_items: checkout_items[0], total_products });
  return;
};
