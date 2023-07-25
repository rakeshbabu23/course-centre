const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../db/models/users");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "this-is-users-secret-key");
    const isUserExisted = await User.findOne({ email: decoded.email });
    if (isUserExisted) {
      req.user = decoded.email;
      next();
    } else {
      throw new Error("Authentification failed");
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = userAuth;
