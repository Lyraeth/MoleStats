require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRoutes } = require("./routes/userRoutes");

function handleNotFound(req, res, next) {
  res.send("Oops! nothing here");
}

// Middleware
// const userLogin = function (req, res, next) {
//   console.log("You has succesfully login");
//   next();
// };

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

// app.use(userLogin);

app.use(requestTime);

app.get("/", async (req, res) => {
  res.send("Hello There");
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(3000);

//userRoutes
app.use("/users", userRoutes);

//
app.use(handleNotFound);
