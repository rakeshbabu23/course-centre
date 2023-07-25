const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  published: {
    type: "Boolean",
    required: true,
    default: false,
  },
  imageLink: {
    type: "String",
    required: true,
  },
  owner: {
    ref: "Admin",
    type: mongoose.Types.ObjectId,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
