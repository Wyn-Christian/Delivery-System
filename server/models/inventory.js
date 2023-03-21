const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

// Auth Key Schema
const InventorySchema = new Schema(
  {
    name: String,
    status: {
      type: String,
      trim: true,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

InventorySchema.virtual("createdAt_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toFormat("yyyy-MM-dd");
});

module.exports = mongoose.model("Inventory", InventorySchema);
