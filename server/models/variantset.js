const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VariantSetSchema = new Schema(
  {
    name: { type: String, required: true },
    variants_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Variant",
      },
    ],

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

module.exports = mongoose.model("VariantSet", VariantSetSchema);
