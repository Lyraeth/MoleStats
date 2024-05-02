require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRoutes } = require("./routes/userRoutes");
const { accountRoutes } = require("./routes/accountRoutes");
const { googleController } = require("./routes/googleController");

function handleNotFound(req, res, next) {
  res.send("Oops! nothing here");
}

app.get("/", async (req, res) => {
  res.send("Welcome to MoleStats");
});

app.get("/login", async (req, res) => {
  res.sendFile(__dirname + "/web/login.html");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at ${PORT}`);
});

//userRoutes
app.use("/users", userRoutes);

//accountRoutes
app.use("/account", accountRoutes);

// Google-controller
app.use("/", googleController);

// handleNotFound
app.use(handleNotFound);
