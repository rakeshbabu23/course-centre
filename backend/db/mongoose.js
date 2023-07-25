const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://baburakesh2301:rakesh@cluster1.60ohp4j.mongodb.net/courses?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch((e) => console.log("error in connecting to db"));
