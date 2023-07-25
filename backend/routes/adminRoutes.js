const express = require("express");
const adminAuth = require("../middlewares/adminAuth");
const Admin = require("../db/models/admin");
const Course = require("../db/models/courses");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const checkUserExisted = await Admin.findOne({ email });
    if (!checkUserExisted) {
      const user = new Admin(req.body);
      await user.save();
      const token = await user.generateToken();
      return res.status(200).json({
        message: "Registered successfully",
        user,
        token,
      });
    } else {
      return res.status(401).json({ error: "User already registered" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in signing up" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const isUserExisted = await Admin.findOne(req.body);

    if (isUserExisted) {
      const token = await isUserExisted.generateToken();
      return res.status(200).json({
        message: "Logged in successfully",
        username: isUserExisted.username,
        token,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in logging up" });
  }
});

router.post("/courses", adminAuth, async (req, res) => {
  try {
    const { title, description, price, published, imageLink } = req.body;
    if (
      title === "" ||
      description === "" ||
      price === "" ||
      published === "" ||
      imageLink === ""
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const course = new Course({
      title,
      description,
      price,
      published,
      imageLink,
      owner: req.user.id,
    });
    const savedCourse = await course.save();

    if (savedCourse) {
      return res.status(201).json({
        message: "Course saved successfully",
        course: savedCourse,
      });
    } else {
      return res.status(503).json({ error: "Unable to save course" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in saving course" });
  }
});

console.log("i am in adminroutes");
router.get("/courses", adminAuth, async (req, res) => {
  try {
    const courses = await Course.find({}).populate("owner", "email");
    const adminCourses = courses.filter((course) => {
      return course.owner.email === req.user.email;
    });
    if (adminCourses.length === 0) {
      return res.send({ message: "no courses available", courses: [] });
    }
    return res.send({ message: "courses available", courses: adminCourses });
  } catch (error) {
    res.status(500).json({ error: "Error in fetching courses" });
  }
});

router.post("/courses/:courseId", adminAuth, async (req, res) => {
  try {
    const id = req.params.courseId;
    if (!id) {
      return res.status(400).json({ error: "Course ID not provided" });
    }
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (course) {
      return res.send({ message: "Course updated successfully", course });
    } else {
      return res
        .status(404)
        .json({ message: "Requested course not available" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in updating the course" });
  }
});

module.exports = router;
