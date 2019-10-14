const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const reports = require("./functions/reports");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false }));

app.get("/", (req, res) => {
  res.send("Healthy!");
});

app.use('/reports', reports);

module.exports.handler = serverless(app);
