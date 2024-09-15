const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdCourse: [String],
  favoriteCourse: [String],
  addedToCartCourse: [String],
  boughtCourse: [String],
  money: { type: Number, default: 100 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
