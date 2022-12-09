const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CheckOutSchema = new Schema(
  {
    api_id: Number,
    quantity: {
      type: Number,
      required: true,
    },
    total_price: Schema.Types.Decimal128,
    createdAt: {
      type: Date,
      default: Date.now,
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
  },
  { id: false }
);

CheckOutSchema.virtual("url").get(function () {
  return `/catalog/check-out/${this._id}`;
});

CheckOutSchema.virtual("createdAt_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toFormat("yyyy-MM-dd");
});

module.exports = mongoose.model("CheckOut", CheckOutSchema);
