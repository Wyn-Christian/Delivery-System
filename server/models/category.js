const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    api_id: Number,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    auth_key: {
      type: Schema.Types.ObjectId,
      ref: "AuthKey",
    },
  },
  { timestamps: true, id: false }
);

CategorySchema.virtual("url").get(function () {
  return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
