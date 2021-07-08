const express = require("express");
var axios = require("axios");
const config = require("./config");

const clientId = config.clientId;
const clientSecret = config.clientSecret;

const router = express.Router();

router.post("/run", (req, res) => {
  var programData = {
    clientId: clientId,
    clientSecret: clientSecret,
    language: req.body.language,
    script: req.body.code,
    stdin: req.body.input,
    versionIndex: "0",
  };

  axios.post("https://api.jdoodle.com/v1/execute", programData).then(
    (response) => {
      const result = response.data;
      console.log(result);
      return res.send(result);
    },
    (error) => {
      console.log(error);
    }
  );
});

module.exports = router;
