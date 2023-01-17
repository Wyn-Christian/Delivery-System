const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VariantSchema = new Schema(
  {
    name: { type: String, required: true },
    price_multiplier: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 1,
      get: getValue,
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

VariantSchema.virtual("url").get(function () {
  return `/catalog/variant/${this._id}`;
});

module.exports = mongoose.model("Variant", VariantSchema);
