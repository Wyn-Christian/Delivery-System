const { body, validationResult } = require("express-validator");
const async = require("async");

const User = require("../models/user");

// Get list of all users
exports.list = function (req, res, next) {
  User.find({}, (err, list_users) => {
    if (err) return next(err);

    res.json({ list_users });
  });
};

// Get details for a specific user
exports.detail = (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return next(err);

    res.json({ user });
  });
};

// Handle user create on POST
exports.create = [
  body("first_name", "First Name must not be empty")
    .trim()
    .isString()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last Name must be valid input").trim().isString().escape(),
  body("email", "Email must not be empty").trim().isEmail().normalizeEmail(),
  body("password", "Password must not be empty").trim().isLength({ min: 5 }),
  body("birthday", "Invalid Date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    const new_user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      birthday: req.body.birthday,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.json(errors);
    }

    // Data from form is valid. Save product
    new_user.save((err) => {
      if (err) return next(err);

      // Success: return the json
      res.json({ new_user });
      return;
    });
  },
];

// Handle user delete on POST
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
exports.update = [
  body("first_name", "First Name must be valid format")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last Name must be valid input")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .escape(),
  body("email", "Email must be valid format")
    .trim()
    .isEmail()
    .normalizeEmail()
    .optional({ checkFalsy: true }),
  body("password", "Password must be valid format")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 }),
  body("birthday", "Invalid Date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      birthday: req.body.birthday,
      email: req.body.email,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      // There are errors.
      return res.json(errors);
    }

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
  },
];
