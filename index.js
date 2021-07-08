//import everything here
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const config = require("./config");
const bodyParser = require("body-parser");

//using env values
dotenv.config();

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Handle request here
app.get("/", (req, res) => {
  const serverRun = {
    isRunning: true,
    msg: "Backend is running.",
  };
  console.log(serverRun);
  res.json(serverRun);
});

// creating server and running
app.listen(config.PORT, () => {
  console.log(`Backend server is running at http://localhost:${config.PORT}`);
});
