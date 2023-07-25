const express = require("express");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
require("./db/mongoose");

app.use(
  cors({
    origin: "https://course-centre.netlify.app",
    methods: "GET,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => console.log("server is running on port 5000"));
