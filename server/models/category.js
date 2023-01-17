const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
  { timestamps: true }
);

CategorySchema.virtual("url").get(function () {
  return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
