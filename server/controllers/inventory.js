const Inventory = require("../models/inventory");

// Get list of all auth keys
exports.list = function (req, res, next) {
  Inventory.find({})
    .populate("user_id", "username")
    .select("id status name user_id createdAt")
    .exec((err, list_inventories) => {
      if (err) return next(err);

      res.json({ list_inventories });
    });
};

exports.user_list = function (req, res, next) {
  Inventory.find({ user_id: req.params.user_id })
    .populate("user_id", "username")
    .select("id status name user_id createdAt")
    .exec((err, list_inventories) => {
      if (err) return next(err);

      res.json({ list_inventories });
    });
};

exports.detail = (req, res, next) => {
  Inventory.findById(req.params.id)
    .populate("user_id", "username url")
    .select("id name status user_id createdAt")
    .exec((err, inventory) => {
      if (err) return next(err);

      res.json({ inventory });
    });
};

exports.create = (req, res, next) => {
  const new_inventory = new Inventory({
    name: req.body.name,
    status: req.body.status ? req.body.status : "Active",
    user_id: req.body.user_id,
  });

  new_inventory.save((err) => {
    if (err) return next(err);

    return res.json({ new_inventory });
  });
};

exports.delete = (req, res, next) => {
  Inventory.findByIdAndDelete(req.params.id, (err, deleted_inventory) => {
    if (err) return next(err);

    if (!deleted_inventory) {
      res.json({ status: "Failed" });
      return;
    }

    // delete associated data from another collection (product, category, checkoutitem, variant, variantset)

    // Sucess
    res.json({ status: "Success", deleted_inventory });
    return;
  });
};

exports.update = (req, res, next) => {
  const inventory = {
    name: req.body.name,
    status: req.body.status ? req.body.status : "Active",
  };

  Inventory.findByIdAndUpdate(
    req.params.id,
    inventory,
    { new: true },
    (err, updated_inventory) => {
      if (err) return next(err);

      // Success: return the updated data
      res.json({ updated_inventory });
      return;
    }
  );
};
