#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://MyFirstMongo:1234@myfirstmongo.3pf8i.mongodb.net/inventory_system?retryWrites=true&w=majority"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");

var User = require("./models/user");
var Inventory = require("./models/inventory");
var Variant = require("./models/variant");
var VariantSet = require("./models/variantset");
var Category = require("./models/category");
var Product = require("./models/product");
var CheckoutItem = require("./models/checkoutitem");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var authKeys = [];
var checkouts = [];

var users = [];
var inventories = [];
var variants = [];
var variant_sets = [];
var categories = [];
var products = [];
var checkout_items = [];

function userCreate(username, first_name, last_name, email, password, cb) {
  userdetail = {
    first_name,
    last_name,
    email,
    username,
    password,
  };

  var user = new User(userdetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function inventoryCreate(name, status, user_id, cb) {
  let inventoryDetail = { name, user_id, status };

  var inventory = new Inventory(inventoryDetail);
  inventory.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Inventory: ${inventory}`);
    inventories.push(inventory);
    cb(null, inventory);
  });
}

function categoryCreate(_id, name, user_id, inventory_id, cb) {
  var categorydetail = {
    _id,
    name,
    user_id,
    inventory_id,
  };

  var category = new Category(categorydetail);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

function variantCreate(
  _id,
  name,
  price_multiplier,
  user_id,
  inventory_id,
  cb
) {
  var variantdetail = {
    _id,
    name,
    price_multiplier,
    user_id,
    inventory_id,
  };

  var variant = new Variant(variantdetail);

  variant.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Variant: ${variant}`);
    variants.push(variant);
    cb(null, variant);
  });
}

function variantSetCreate(
  _id,
  name,
  variants_id,
  user_id,
  inventory_id,
  cb
) {
  var variantdetail = {
    _id,
    name,
    variants_id,
    user_id,
    inventory_id,
  };

  var variantset = new VariantSet(variantdetail);

  variantset.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Variant Set: ${variantset}`);
    variant_sets.push(variantset);
    cb(null, variantset);
  });
}

function productCreate(
  _id,
  name,
  price,
  stocks,
  img_name,
  category_id,
  variant_set_id,
  user_id,
  inventory_id,
  cb
) {
  let productdetail = {
    _id,
    name,
    price,
    stocks,
    img_name,
    category_id,
    variant_set_id,
    user_id,
    inventory_id,
  };

  let product = new Product(productdetail);

  product.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Product: ${product}`);
    products.push(product);
    cb(null, product);
  });
}

function checkoutItemCreate(
  _id,
  quantity,
  total_price,
  product_id,
  variant_id,
  user_id,
  inventory_id,
  cb
) {
  let checkoutdetail = {
    _id,
    quantity,
    total_price,
    product_id,
    variant_id,
    user_id,
    inventory_id,
  };

  let checkoutItem = new CheckoutItem(checkoutdetail);

  checkoutItem.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Check out Item: ${checkoutItem}`);
    checkouts.push(checkoutItem);
    cb(null, checkoutItem);
  });
}

// Create datas
function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate(
          "admin-sample",
          "Admin",
          "Sample",
          "admin@sample.com",
          "1234",
          callback
        );
      },
      function (callback) {
        userCreate(
          "johndoe",
          "John",
          "Doe",
          "johndoe@sample.com",
          "john123",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createInventories(cb) {
  async.series(
    [
      function (callback) {
        inventoryCreate("Bakery Shop", "Active", users[0], callback);
      },
      function (callback) {
        inventoryCreate("Phones", "Active", users[0], callback);
      },
      function (callback) {
        inventoryCreate("Sample", "Inactive", users[1], callback);
      },
    ],
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "63c4f67621b3339c351184c5",
          "cake",
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "63c4f67f21b3339c351184c7",
          "cookie",
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "63c4f68321b3339c351184c9",
          "pastry",
          users[0],
          inventories[0],
          callback
        );
      },
    ],
    cb
  );
}

function createVariants(cb) {
  async.series(
    [
      function (callback) {
        // 0
        variantCreate(
          "63c4fb0eed8afadb233a6a10",
          "6 x 8",
          1,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 1
        variantCreate(
          "63c4fb1eed8afadb233a6a12",
          "8 x 10",
          1.2,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 2
        variantCreate(
          "63c4fb25ed8afadb233a6a14",
          "10 x 12",
          1.4,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 3
        variantCreate(
          "63c4fb2aed8afadb233a6a16",
          "5 pcs",
          1,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 4
        variantCreate(
          "63c4fb31ed8afadb233a6a18",
          "10 pcs",
          1.8,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 5
        variantCreate(
          "63c4fb36ed8afadb233a6a1a",
          "20 pcs",
          2.8,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 6
        variantCreate(
          "63c4fb3eed8afadb233a6a1c",
          "2 pcs",
          1,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 7
        variantCreate(
          "63c4fb44ed8afadb233a6a1e",
          "4 pcs",
          1.8,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 8
        variantCreate(
          "63c4fb48ed8afadb233a6a20",
          "6 pcs",
          2.8,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 9
        variantCreate(
          "63c4fb4ded8afadb233a6a22",
          "6 pcs",
          1,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 10
        variantCreate(
          "63c4fb53ed8afadb233a6a24",
          "12 pcs",
          1.8,
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 11
        variantCreate(
          "63c4fb58ed8afadb233a6a26",
          "20 pcs",
          2.8,
          users[0],
          inventories[0],
          callback
        );
      },
    ],
    cb
  );
}

function createVariantSets(cb) {
  async.series(
    [
      function (callback) {
        variantSetCreate(
          "63c500040251c0798b612d2e",
          "First set",
          [variants[0], variants[1], variants[2]],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        variantSetCreate(
          "63c5050d0251c0798b612d34",
          "Second set",
          [variants[3], variants[4], variants[5]],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        variantSetCreate(
          "63c505480251c0798b612d37",
          "Third set",
          [variants[6], variants[7], variants[8]],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        variantSetCreate(
          "63c5055f0251c0798b612d39",
          "Fourth set",
          [variants[9], variants[10], variants[11]],
          users[0],
          inventories[0],
          callback
        );
      },
    ],
    cb
  );
}

function createProducts(cb) {
  async.series(
    [
      function (callback) {
        // 0
        productCreate(
          "63c50ce24e5539c223d5a9db",
          "Carrot",
          600,
          100,
          "carrot.png",
          categories[0],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 1
        productCreate(
          "63c50d414e5539c223d5a9dd",
          "Chocolate Fudge",
          600,
          100,
          "chocofudge.png",
          categories[0],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 2
        productCreate(
          "63c50d514e5539c223d5a9df",
          "Marble",
          600,
          100,
          "marble.png",
          categories[0],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 3
        productCreate(
          "63c50ff14afe16e87ce8fe18",
          "Red Velvet",
          600,
          100,
          "redvelvet.png",
          categories[0],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 4
        productCreate(
          "63c50ff94afe16e87ce8fe1a",
          "Tiramisu",
          700,
          100,
          "tiramisu.png",
          categories[0],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 5
        productCreate(
          "63c510004afe16e87ce8fe1c",
          "Ube",
          700,
          100,
          "ube.png",
          categories[0],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 6
        productCreate(
          "63c510654afe16e87ce8fe1e",
          "Chocolate Chip",
          60,
          100,
          "chocochip.png",
          categories[1],
          variant_sets[1],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 7
        productCreate(
          "63c5106d4afe16e87ce8fe20",
          "Chocolate Crinkles",
          50,
          100,
          "chococringles.png",
          categories[1],
          variant_sets[1],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 8
        productCreate(
          "63c510744afe16e87ce8fe22",
          "Gingerbread",
          80,
          100,
          "gingerbread.png",
          categories[1],
          variant_sets[1],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 9
        productCreate(
          "63c510914afe16e87ce8fe24",
          "Egg Tart",
          60,
          100,
          "eggtart.png",
          categories[2],
          variant_sets[2],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 10
        productCreate(
          "63c510ba4afe16e87ce8fe26",
          "Macarons",
          50,
          100,
          "macaron.png",
          categories[2],
          variant_sets[3],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        // 11
        productCreate(
          "63c510df4afe16e87ce8fe28",
          "Soft Pretzel",
          60,
          100,
          "pretzel.png",
          categories[2],
          variant_sets[0],
          users[0],
          inventories[0],
          callback
        );
      },
    ],
    cb
  );
}

function createCheckoutItems(cb) {
  async.series(
    [
      function (callback) {
        checkoutItemCreate(
          "63c545f33c9d3d58ca67d593",
          1,
          144,
          products[8],
          variants[4],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c546e67745ad6584be5fa9",
          1,
          108,
          products[6],
          variants[4],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c51fbfc69c29b7d51ae89e",
          3,
          1800,
          products[2],
          variants[0],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c544643ce96259d2edbc50",
          1,
          50,
          products[10],
          variants[3],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c5578a57fd60b7a82133f5",
          1,
          90,
          products[11],
          variants[10],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c5533457fd60b7a82133a7",
          1,
          90,
          products[10],
          variants[4],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c5535157fd60b7a82133ac",
          1,
          840,
          products[5],
          variants[1],
          users[0],
          inventories[0],
          callback
        );
      },
      function (callback) {
        checkoutItemCreate(
          "63c5477a7745ad6584be5ffd",
          1,
          840,
          products[4],
          variants[1],
          users[0],
          inventories[0],
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [
    createUsers,
    createInventories,
    createVariants,
    createVariantSets,
    createCategories,
    createProducts,
    createCheckoutItems,
  ],
  function (err, results) {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log(`Products: ${products}`);
      console.log(`Checkout Items: ${checkouts}`);
      console.log(`Result: ${results}`);
    }
    mongoose.connection.close();
  }
);
