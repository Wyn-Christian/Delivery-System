const Product = require("../models/product");
const CheckOutItem = require("../models/checkoutitem");
const Inventory = require("../models/inventory");

exports.products = function (req, res, next) {
  Product.find({ inventory_id: req.params.api_id }).exec(
    (err, list_products) => {
      if (err) return next(err);

      res.json(list_products);
    }
  );
};

exports.stocks = function (req, res, next) {
  Product.find({ inventory_id: req.params.api_id })
    .select("stocks")
    .exec((err, list_products) => {
      if (err) return next(err);

      res.json(list_products);
    });
};

exports.add_checkout_items = async (req, res, next) => {
  let inventory = await Inventory.findById(req.params.api_id);
  let user = inventory.user_id;
  let data = req.body.checkout_items.map((v) => {
    return {
      ...v,
      user_id: user,
      inventory_id: inventory.id,
    };
  });

  req.body.updated_stocks.forEach((product) => {
    Product.findByIdAndUpdate(
      product.id,
      {
        stocks: product.stocks,
      },
      { new: true }
    ).exec((err, result) => {
      if (err) return next(err);
      console.log(`updated stocks: ${result}`);
    });
  });

  let result = await CheckOutItem.insertMany(data);
  console.log(`${result.length} checkout items documents were inserted`);
  return res.json({ status: "Success", result: result });
};
