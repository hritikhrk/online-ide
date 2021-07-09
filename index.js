//import everything here
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const config = require("./config");
const executeCode = require("./executeCode.route");

//using env values
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

// Serve static assets in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//Handle request here
app.get("/", (req, res) => {
  const serverRun = {
    isRunning: true,
    msg: "Backend is running.",
  };
  console.log(serverRun);
  res.json(serverRun);
});

app.use("/", executeCode);

// creating server and running
app.listen(config.PORT, () => {
  console.log(`Backend server is running at http://localhost:${config.PORT}`);
});
