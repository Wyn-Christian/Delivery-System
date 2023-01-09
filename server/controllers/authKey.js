const { body, validationResult } = require("express-validator");
const async = require("async");

const User = require("../models/user");
const AuthKey = require("../models/authKey");

// Get list of all auth keys
exports.list = function (req, res, next) {
  // res.send("NOT IMPLEMENTED: Auth key list");
  AuthKey.find({})
    .populate("user_id", "username url")
    .select("id status name user_id createdAt")
    .exec((err, list_api_keys) => {
      if (err) return next(err);

      res.json({ list_api_keys });
    });
};

// Get details for a specific auth key
exports.detail = (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: Auth key detail: ${req.params.id}`);
  AuthKey.findOne({ _id: req.params.id })
    .populate("user_id", "username url")
    .select("id name status user_id createdAt")
    .exec((err, api_key) => {
      if (err) return next(err);

      res.json({ api_key });
    });
};

// Handle Auth Key create on POST
exports.create = [
  body("status", "Status is required")
    .isString()
    .trim()
    .optional({ checkFalsy: true }),
  body("user_id", "User ID is required").trim(),

  (req, res, next) => {
    const errors = validationResult(req);

    const new_auth_key = new AuthKey({
      status: req.body.status ? req.body.status : "Active",
      user_id: req.body.user_id,
    });

    if (!errors.isEmpty()) {
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    new_auth_key.save((err) => {
      if (err) return next(err);

      return res.json({ new_auth_key });
    });
  },
];

// Handle Auth Key delete on POST
exports.delete = (req, res, next) => {
  // res.send("NOT IMPLEMENTED: Auth key delete POST");
  AuthKey.findByIdAndDelete(req.params.id, (err, removed_auth_key) => {
    if (err) return next(err);

    if (!removed_auth_key) {
      res.json({ status: "Failed" });
      return;
    }

    // Sucess
    res.json({ status: "Success", removed_auth_key });
    return;
  });
};

// Handle Auth Key update on POST
exports.update = [
  body("status", "Status is required")
    .isString()
    .trim()
    .optional({ checkFalsy: true }),

  (req, res, next) => {
    const errors = validationResult(req);

    const auth_key = {
      status: req.body.status ? req.body.status : "Active",
    };

    if (!errors.isEmpty()) {
      const err = new Error(errors);
      err.status = 404;
      return res.json(err);
    }

    AuthKey.findByIdAndUpdate(
      req.params.id,
      auth_key,
      { new: true },
      (err, updated_auth_key) => {
        if (err) return next(err);

        // Success: return the updated data
        res.json({ updated_auth_key });
        return;
      }
    );
  },
];
