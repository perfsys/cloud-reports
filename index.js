const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const leadGeneration = require("./functions/leadGeneration");
const developer = require("./functions/developer");
const trello = require("./functions/trello");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false }));

app.use("/report/lead-generation", leadGeneration);
app.use("/report/developer", developer);
app.use("/trello", trello);

app.get("/health", (req, res) => {
  res.send("HEALTHY");
});

app.get("/", (req, res) => {
  console.log(path.resolve("."))
  // let dirname = path.dirname(require.main.filename);
  // let indexPath = path.resolve(dirname, `dist${path.sep}index.html`);
  // res.sendFile(indexPath);

  let contents = fs.readFileSync(`dist${path.sep}index.html`);

  res.set('Content-Type', 'text/html');
  res.send(contents.toString())
});

module.exports.handler = serverless(app, {
  request: (req, event, context) => {
    req.context = event.requestContext;
  }
});
