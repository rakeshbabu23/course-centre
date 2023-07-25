const express = require("express");
const userAuth = require("../middlewares/userAuth");
const User = require("../db/models/users");
const Course = require("../db/models/courses");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "")
      return res.status(400).json({ message: "All fields are mandatory" });
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === req.body.password) {
        const token = await user.generateToken();
        res.status(200).json({
          message: "logged in successfully",
          username: user.username,
          token,
        });
      } else {
        res.status(402).send({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).send({ error: "User not registered" });
    }
  } catch (e) {
    res.status(500).send({ error: "Error in logging in" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      const newUser = new User(req.body);
      await newUser.save();
      const token = await newUser.generateToken();
      return res.status(200).json({
        message: "Registered successfully",
        username: newUser.username,
        token,
      });
    } else {
      return res.status(401).json({ error: "User already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in signing up" });
  }
});

router.get("/courses", userAuth, async (req, res) => {
  try {
    const courses = await Course.find({ published: true }).populate(
      "owner",
      "username"
    );

    if (req.query.title !== "") {
      const cost = req.query.price === "" ? 9999 : parseInt(req.query.price);
      const filteredCourses = courses.filter(
        (course) =>
          course.title
            .toLowerCase()
            .includes(req.query.title.split(" ").join("")) &&
          course.price <= cost
      );
      return res.json({ courses: filteredCourses });
    }
    if (courses.length > 0) {
      res.json({ message: "Courses available", courses });
    } else {
      res.json({ message: "No courses available", courses: [] });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in fetching courses" });
  }
});

router.get("/courses/purchasedCourses", userAuth, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user }).populate(
      "purchasedCourses"
    );
    if (foundUser) {
      const courses = foundUser.purchasedCourses;
      return res.send({ courses });
    } else {
      return res.status(402).json({ error: "Please Login Again" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/courses/:courseId", userAuth, async (req, res) => {
  try {
    const reqCourse = await Course.findById(req.params.courseId).populate(
      "owner",
      "username"
    );
    const coursesBoughtByUser = await User.findOne({
      email: req.user,
    }).populate("purchasedCourses", "_id");
    const checkUerBoughtCourse = coursesBoughtByUser.purchasedCourses.find(
      (course) => course._id == req.params.courseId
    );

    if (reqCourse) {
      return res.send({
        course: reqCourse,
        purchased: checkUerBoughtCourse ? checkUerBoughtCourse._id : {},
      });
    } else {
      return res.status(404).json({ error: "Requested course not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error in fetching requested course" });
  }
});

router.post("/courses/:courseId", userAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });

    if (user) {
      if (user.purchasedCourses.includes(req.params.courseId)) {
        return res.status(403).send({ message: "Already purchased" });
      } else {
        user.purchasedCourses.push(req.params.courseId);
        await user.save();
        return res.send({
          message: "Course bought successfully",
          purchasedCourses: user.purchasedCourses,
        });
      }
    } else {
      return res.status(402).json({ error: "Unable to purchase course" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in buying the course" });
  }
});

router.post("/payments", userAuth, async (req, res) => {
  if (req.user) {
    res.status(200).send({ message: "purchased course successfully" });
  } else res.status(401).send({ error: "some error occured" });
});

module.exports = router;
