const CheckOutItem = require("../models/checkoutitem");

exports.list = function (req, res, next) {
  CheckOutItem.find({})
    .populate("product_id")
    .populate("variant_id")
    .populate("user_id")
    .exec((err, list_checkouts) => {
      if (err) return next(err);
      // Success
      res.json({ list_checkouts });
    });
};

exports.user_list = function (req, res, next) {
  CheckOutItem.find({
    user_id: req.params.user_id,
  })
    .populate("product_id")
    .populate("variant_id")
    .populate("user_id")
    .exec((err, list_checkout_items) => {
      if (err) return next(err);
      // Success
      res.json({ list_checkout_items });
    });
};

exports.counts = (req, res, next) => {
  CheckOutItem.find({
    user_id: req.params.user_id,
  }).exec((err, count_checkouts) => {
    if (err) return next(err);

    // Success
    res.json({
      count_checkouts,
    });
  });
};

exports.detail = (req, res, next) => {
  CheckOutItem.findById(req.params.id).exec((err, checkout_item) => {
    if (err) return next(err);

    // Success
    res.json({ checkout_item });
  });
};

// Handle checkout create on POST
exports.create = (req, res, next) => {
  const new_checkout_item = new CheckOutItem({
    _id: req.body.id,
    quantity: req.body.quantity,
    total_price: req.body.total_price,

    product_id: req.body.product_id,
    variant_id: req.body.variant_id,

    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.api_id,
  });

  // Data from form is valid. Save product
  new_checkout_item.save((err) => {
    if (err) return next(err);

    res.json({ new_checkout_item });
    return;
  });
};

// Handle checkout delete on POST
exports.delete = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: checkout delete POST: ${req.params.id}`);
};

// Handle checkout update on POST
exports.update = (req, res, next) => {
  const checkout_item = {
    quantity: req.body.quantity,
    total_price: req.body.total_price,

    product_id: req.body.product_id,
    variant_id: req.body.variant_id,

    user_id: req.body.user_id,
    inventory_id: req.body.inventory_id,

    api_id: req.body.api_id,
  };

  CheckOutItem.findByIdAndUpdate(
    req.params.id,
    checkout_item,
    { new: true },
    (err, updated_checkout_item) => {
      if (err) return next(err);

      // Success: return the json
      res.json({ updated_checkout_item });
      return;
    }
  );
};
