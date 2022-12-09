const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VariantSchema = new Schema(
  {
    api_id: Number,
    name: { type: String, required: true },
    price_multiplier: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 1,
    },
    auth_key: {
      type: Schema.Types.ObjectId,
      ref: "AuthKey",
    },
  },
  { timestamps: true, id: false }
);

VariantSchema.virtual("url").get(function () {
  return `/catalog/variant/${this._id}`;
});

module.exports = mongoose.model("Variant", VariantSchema);
