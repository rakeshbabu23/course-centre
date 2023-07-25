const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
  purchasedCourses: {
    ref: "Course",
    type: [mongoose.Types.ObjectId],
  },
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { email: this.email, role: "user" },
    "this-is-users-secret-key",
    { expiresIn: "1h" }
  );
  console.log(token);
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
