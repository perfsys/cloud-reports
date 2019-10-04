const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
require("dotenv").config();

const app = express();

const TABLE_NAME = process.env.TABLE_NAME;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

//Create report
app.post("/reports", function(req, res) {
  const item = req.body;

  item.id = uuidv4();
  item.timestamp = Date.now();

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create report" });
    }
    res.json({ response: "Create new report" });
  });
});

module.exports.handler = serverless(app);
