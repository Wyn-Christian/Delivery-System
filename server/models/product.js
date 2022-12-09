const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    api_id: Number,
    name: {
      type: String,
      required: [true, "{VALUE} is an invalid product name value."],
    },
    price: Number,
    stocks: Number,
    image_path: [String],
    auth_key: { type: Schema.Types.ObjectId, ref: "AuthKey", required: true },
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    variants_id: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
  },
  { timestamps: true, id: false }
);

ProductSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model("Product", ProductSchema);
