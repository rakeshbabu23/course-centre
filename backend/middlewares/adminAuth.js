const jwt = require("jsonwebtoken");
const Admin = require("../db/models/admin");
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "this-is-my-secret-key");
    const isAdminExisted = await Admin.findOne({ email: decoded.email });
    if (isAdminExisted) {
      req.user = { email: decoded.email, id: isAdminExisted._id };
      next();
    } else {
      throw new Error("please authenticate");
    }
  } catch (e) {
    res.status(401).send("please authenticate");
  }
};

module.exports = adminAuth;
