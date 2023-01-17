const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CheckOutItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Schema.Types.Decimal128,
      get: getValue,
    },

    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant_id: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    inventory_id: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

CheckOutItemSchema.virtual("createdAt_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toFormat("yyyy-MM-dd");
});

module.exports = mongoose.model("CheckOutItem", CheckOutItemSchema);
