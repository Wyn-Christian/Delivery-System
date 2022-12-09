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
// var Book = require("./models/book");
// var Author = require("./models/author");
// var Genre = require("./models/genre");
// var BookInstance = require("./models/bookinstance");

var User = require("./models/user");
var AuthKey = require("./models/authKey");
var Product = require("./models/product");
var Category = require("./models/category");
var Variant = require("./models/variant");
var Checkout = require("./models/checkout");

var mongoose = require("mongoose");
const checkout = require("./models/checkout");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// var authors = [];
// var genres = [];
// var books = [];
// var bookinstances = [];

var users = [];
var authKeys = [];
var categories = [];
var variants = [];
var products = [];
var checkouts = [];

function userCreate(first_name, last_name, age, email, password, birthday, cb) {
  userdetail = {
    first_name,
    email,
    password,
  };
  if (last_name != false) userdetail.last_name = last_name;
  if (age != false) userdetail.age = age;
  if (birthday != false) userdetail.birthday = birthday;

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

function authKeyCreate(status, user_id, cb) {
  let authKeydetail = { status, user_id };

  var authKey = new AuthKey(authKeydetail);
  authKey.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Auth key: ${authKey}`);
    authKeys.push(authKey);
    cb(null, authKey);
  });
}

function categoryCreate(api_id, name, auth_key, cb) {
  categorydetail = {
    name,
    auth_key,
  };
  if (api_id != false) categorydetail.api_id = api_id;

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

function variantCreate(api_id, name, price_multiplier, auth_key, cb) {
  var variantdetail = { name, price_multiplier, auth_key };
  if (api_id != false) variantdetail.api_id = api_id;

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

function productCreate(
  api_id,
  name,
  price,
  stocks,
  image_path,
  auth_key,
  category_id,
  variants_id,
  cb
) {
  let productdetail = {
    name,
    price,
    stocks,
    auth_key,
  };
  if (api_id != false) productdetail.api_id = api_id;
  if (image_path != false) productdetail.image_path = image_path;
  if (category_id != false) productdetail.category_id = category_id;
  if (variants_id != false) productdetail.variants_id = variants_id;

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

function checkoutCreate(
  api_id,
  quantity,
  total_price,
  product_id,
  variant_id,
  cb
) {
  let checkoutdetail = {
    quantity,
    total_price,
    product_id,
  };
  if (api_id != false) checkoutdetail.api_id = api_id;
  if (variant_id != false) checkoutdetail.variant_id = variant_id;

  let checkout = new Checkout(checkoutdetail);

  checkout.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Check Out: ${checkout}`);
    checkouts.push(checkout);
    cb(null, checkout);
  });
}

function createUser(cb) {
  async.parallel(
    [
      function (callback) {
        userCreate(
          "first",
          "user",
          20,
          "test@sample.com",
          "1234",
          "2001-11-24",
          callback
        );
      },
      function (callback) {
        userCreate(
          "john",
          "doe",
          27,
          "johndoe@sample.com",
          "1234",
          "2003-12-30",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createAuthKeys(cb) {
  async.parallel(
    [
      function (callback) {
        authKeyCreate("Active", users[0], callback);
      },
      function (callback) {
        authKeyCreate("Inactive", users[1], callback);
      },
    ],
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(1, "cake", authKeys[1], callback);
      },
      function (callback) {
        categoryCreate(2, "cookie", authKeys[1], callback);
      },
      function (callback) {
        categoryCreate(3, "pastry", authKeys[1], callback);
      },
      function (callback) {
        categoryCreate(false, "Xiaomi", authKeys[0], callback);
      },
      function (callback) {
        categoryCreate(false, "Poco", authKeys[0], callback);
      },
      function (callback) {
        categoryCreate(false, "Redmi", authKeys[0], callback);
      },
    ],
    cb
  );
}

function createVariants(cb) {
  async.series(
    [
      function (callback) {
        variantCreate(1, "6 x 8", 1, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(2, "8 x 10", 1.2, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(3, "10 x 12", 1.4, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(4, "5 pcs", 1, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(5, "10 pcs", 1.8, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(6, "20 pcs", 2.8, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(7, "2 pcs", 1, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(8, "4 pcs", 1.8, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(9, "6 pcs", 2.8, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(10, "6 pcs", 1, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(11, "12 pcs", 1.8, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(12, "24 pcs", 2.8, authKeys[1], callback);
      },
      function (callback) {
        variantCreate(false, "4ram/64gb", 1, authKeys[0], callback);
      },
      function (callback) {
        variantCreate(false, "4ram/128gb", 1, authKeys[0], callback);
      },
      function (callback) {
        variantCreate(false, "6ram/128gb", 1, authKeys[0], callback);
      },
      function (callback) {
        variantCreate(false, "8ram/128gb", 1, authKeys[0], callback);
      },
      function (callback) {
        variantCreate(false, "8ram/256gb", 1, authKeys[0], callback);
      },
      function (callback) {
        variantCreate(false, "12ram/256gb", 1, authKeys[0], callback);
      },
    ],
    cb
  );
}

function createProducts(cb) {
  async.parallel(
    [
      function (callback) {
        pVariants = variants.slice(0, 3);
        productCreate(
          1,
          "Carrot",
          600,
          100,
          false,
          authKeys[1],
          categories[0],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(0, 3);
        productCreate(
          2,
          "Chocolate Fudge",
          600,
          100,
          false,
          authKeys[1],
          categories[0],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(0, 3);
        productCreate(
          3,
          "Marble",
          600,
          100,
          false,
          authKeys[1],
          categories[0],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(0, 3);
        productCreate(
          4,
          "Red Velvet",
          600,
          100,
          false,
          authKeys[1],
          categories[0],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(0, 3);
        productCreate(
          5,
          "Tiramisu",
          700,
          100,
          false,
          authKeys[1],
          categories[0],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(0, 3);
        productCreate(
          6,
          "Ube",
          700,
          100,
          false,
          authKeys[1],
          categories[0],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(3, 6);
        productCreate(
          7,
          "Chocolate Chip",
          60,
          100,
          false,
          authKeys[1],
          categories[1],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(3, 6);
        productCreate(
          8,
          "Chocolate Crinkles",
          50,
          100,
          false,
          authKeys[1],
          categories[1],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(3, 6);
        productCreate(
          9,
          "Gingerbread",
          80,
          100,
          false,
          authKeys[1],
          categories[1],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(6, 9);
        productCreate(
          10,
          "Egg Tart",
          60,
          100,
          false,
          authKeys[1],
          categories[2],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(3, 6);
        productCreate(
          11,
          "Macaron",
          50,
          100,
          false,
          authKeys[1],
          categories[2],
          pVariants,
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(9, 12);
        productCreate(
          12,
          "Soft Pretzel",
          60,
          100,
          false,
          authKeys[1],
          categories[2],
          pVariants,
          callback
        );
      },
      function (callback) {
        productCreate(
          false,
          "POCO F4 GT",
          30990,
          100,
          false,
          authKeys[0],
          categories[4],
          [variants[17]],
          callback
        );
      },
      function (callback) {
        pVariants = variants.slice(15, 17);
        productCreate(
          false,
          "POCO X4 GT",
          18990,
          100,
          false,
          authKeys[0],
          categories[4],
          pVariants,
          callback
        );
      },
      function (callback) {
        productCreate(
          false,
          "Redmi Note 11 Pro",
          17499,
          100,
          false,
          authKeys[0],
          categories[5],
          [variants[15]],
          callback
        );
      },
      function (callback) {
        productCreate(
          false,
          "Xiaomi 11T",
          17999,
          100,
          false,
          authKeys[0],
          categories[3],
          [variants[15]],
          callback
        );
      },
    ],
    cb
  );
}

function createCheckouts(cb) {
  async.series(
    [
      function (callback) {
        checkoutCreate(1, 3, 432, products[8], variants[4], callback);
      },
      function (callback) {
        checkoutCreate(2, 5, 3600, products[0], variants[1], callback);
      },
      function (callback) {
        checkoutCreate(3, 2, 1400, products[5], variants[2], callback);
      },
      function (callback) {
        checkoutCreate(4, 2, 1959.99, products[3], variants[2], callback);
      },
      function (callback) {
        checkoutCreate(5, 2, 1200, products[0], variants[0], callback);
      },
      function (callback) {
        checkoutCreate(6, 2, 448, products[8], variants[5], callback);
      },
      function (callback) {
        checkoutCreate(7, 1, 168, products[6], variants[5], callback);
      },
      function (callback) {
        checkoutCreate(8, 2, 1400, products[5], variants[0], callback);
      },
      function (callback) {
        checkoutCreate(9, 2, 1959.99, products[3], variants[2], callback);
      },
      function (callback) {
        checkoutCreate(10, 2, 1200, products[0], variants[0], callback);
      },
      function (callback) {
        checkoutCreate(11, 2, 448, products[8], variants[5], callback);
      },
      function (callback) {
        checkoutCreate(12, 1, 168, products[6], variants[5], callback);
      },
      function (callback) {
        checkoutCreate(13, 2, 1400, products[5], variants[0], callback);
      },
      function (callback) {
        checkoutCreate(14, 2, 1959.99, products[3], variants[2], callback);
      },
      function (callback) {
        checkoutCreate(15, 2, 1200, products[0], variants[0], callback);
      },
      function (callback) {
        checkoutCreate(16, 2, 448, products[8], variants[5], callback);
      },
      function (callback) {
        checkoutCreate(17, 1, 168, products[6], variants[5], callback);
      },
      function (callback) {
        checkoutCreate(18, 1, 720, products[0], variants[1], callback);
      },
      function (callback) {
        checkoutCreate(19, 4, 3360, products[5], variants[1], callback);
      },
      function (callback) {
        checkoutCreate(20, 2, 1680, products[3], variants[1], callback);
      },
      function (callback) {
        checkoutCreate(21, 1, 700, products[4], variants[0], callback);
      },
      function (callback) {
        checkoutCreate(22, 1, 979.99, products[5], variants[2], callback);
      },
      function (callback) {
        checkoutCreate(23, 1, 720, products[1], variants[1], callback);
      },
      function (callback) {
        checkoutCreate(24, 1, 90, products[10], variants[4], callback);
      },
      function (callback) {
        checkoutCreate(25, 1, 720, products[0], variants[1], callback);
      },
    ],
    cb
  );
}

async.series(
  [
    createUser,
    createAuthKeys,
    createCategories,
    createVariants,
    createProducts,
    createCheckouts,
  ],
  function (err, results) {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log(`Products: ${products}`);
      console.log(`Checkouts: ${checkouts}`);
    }
    mongoose.connection.close();
  }
);
