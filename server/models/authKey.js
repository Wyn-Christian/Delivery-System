const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

// Auth Key Schema
const AuthKeySchema = new Schema(
  {
    status: {
      type: String,
      trim: true,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },
    name: String,
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Virtual for authkeyinstance's url
AuthKeySchema.virtual("url").get(function () {
  return `/catalog/auth-key/${this._id}`;
});

AuthKeySchema.virtual("createdAt_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toFormat("yyyy-MM-dd");
});

AuthKeySchema.virtual("auth_key").get(function () {
  return this.id;
});

module.exports = mongoose.model("AuthKey", AuthKeySchema);
