const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");

// Please add config.env file in .gitignore

//Middleware
app.use(express.json());

//Routs
app.use("/users", userRoute);

//Basic server check route
app.get("/", (req, res) => {
  res.send("Hello World from server");
});

module.exports = app;
