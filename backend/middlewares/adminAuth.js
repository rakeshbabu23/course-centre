const jwt = require("jsonwebtoken");
const Admin = require("../db/models/admin");
const adminAuth = async (req, res, next) => {
  try {
    console.log("hello i am in adminauth");

    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
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
