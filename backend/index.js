const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const reports = require("./functions/reports");
const trello = require("./functions/trello");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false }));

app.use("/reports", reports);
app.use("/trello", trello);

app.get("/", function(req, res) {
  res.send("HEALTHY");
});

module.exports.handler = serverless(app, {
  request: function(req, event, context) {
    req.context = event.requestContext;
  }
});
