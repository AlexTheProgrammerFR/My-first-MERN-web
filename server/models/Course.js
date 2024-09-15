const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  owner: String,
  img: String,
  header: { type: String, required: true },
  shortDes: { type: String, required: true },
  longDes: { type: String, required: true },
  link: { type: String, required: true },
  difficulty: { type: String, required: true },
  cost: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  perks: { web: Boolean, dsa: Boolean },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
