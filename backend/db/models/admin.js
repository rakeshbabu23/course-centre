const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Course = require("./courses");
const adminSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  adminCourses: {
    ref: "Course",
    type: [mongoose.Types.ObjectId],
  },
});

adminSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { email: this.email, role: "admin" },
    "this-is-my-secret-key",
    { expiresIn: "1h" }
  );
  return token;
};
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
