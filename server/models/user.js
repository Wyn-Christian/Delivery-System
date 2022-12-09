const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

// user Schema
const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: String,
    age: Number,
    birthday: Date,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.virtual("name").get(function () {
  return this.last_name
    ? `${this.first_name} ${this.last_name}`
    : this.first_name;
});

UserSchema.virtual("birthday_formatted").get(function () {
  return DateTime.fromJSDate(this.birthday).toFormat("yyyy-MM-dd");
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
