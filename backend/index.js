// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const Admin = require("./db/models/admin");
// const Course = require("./db/models/courses");
// const User = require("./db/models/users");
// const adminAuth = require("./middlewares/adminAuth");
// const userAuth = require("./middlewares/userAuth");
// require("./db/mongoose");
// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from this origin
//     methods: "GET,POST,DELETE", // Allow specific HTTP methods
//     allowedHeaders: "Content-Type,Authorization", // Allow specific headers
//   })
// );
// app.use(express.json());

const express = require("express");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
require("./db/mongoose");

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => console.log("server is running on port 5000"));

// app.post("/admin/signup", async (req, res) => {});

// app.post("/admin/login", async (req, res) => {});

// app.post("/admin/courses", adminAuth, async (req, res) => {});

// app.get("/admin/courses", adminAuth, async (req, res) => {});

// app.post("/admin/courses/:courseId", adminAuth, async (req, res) => {});

// app.post("/users/login", async (req, res) => {});

// app.post("/users/signup", async (req, res) => {});

// app.get("/users/courses", userAuth, async (req, res) => {});

// app.get("/users/courses/purchasedCourses", userAuth, async (req, res) => {});

// app.get("/users/courses/:courseId", userAuth, async (req, res) => {});

// app.post("/users/courses/:courseId", userAuth, async (req, res) => {});

// app.post("/users/payments", userAuth, async (req, res) => {});

// app.listen(5000, () => console.log("server is running on port 5000"));
