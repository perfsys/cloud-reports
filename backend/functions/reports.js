const router = require("express").Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const REPORTS_TABLE_NAME = process.env.REPORTS_TABLE_NAME;
const REPORTS_TABLE_NAME_REPORT = process.env.REPORTS_TABLE_NAME_REPORT;
require("dotenv").config();

var apiKey = process.env.TRELLO_API_KEY;
var oauthToken = process.env.TRELLO_OAUTH_TOKEN;
var trello = require('trello-node-api')(apiKey, oauthToken);



//Create report
router.post("", (req, res) => {
  const item = req.body;

  item.id = uuidv4();
  item.timestamp = Date.now();

  const params = {
    TableName: REPORTS_TABLE_NAME,
    Item: item
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create report" });
    }
    res.json({ response: "New report created" });
  });
});

router.post("/user-report", async (req, res) => {
  const item = req.body;
  console.log("test item", item);
  let params = await {
    RequestItems: {
        [REPORTS_TABLE_NAME_REPORT]: createItem(item, item.report)
    }
};

  console.log("test params", params);

  await dynamoDb.batchWrite(params, function(err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not create report" });
    }
    res.json({ response: "New report created" });
  });
});

createItem = (item, array) => {
  console.log("Start createItem");
  let arrayRequest = [];
  array.map(el => {
    let result = null;
    // el.filter(iR => {
    //   if (iR.project && iR.customer && iR.taskId && iR.taskLink && iR.hours && iR.date) {
        result = {
          PutRequest: {
            Item: {
              id: uuidv4(),
              timestamp: Date.now(),
              user: item.user,
              week: item.week,
              day: el.date,
              taskId: el.taskId,
              taskLink: el.taskLink,
              project: el.project,
              customer: el.customer,
              hours: el.hours
            }
          }
        };

        console.log("result", result);
        arrayRequest.push(result);
    //   }
    // });
  });
  return arrayRequest;
};



// router.get("/trello/:id", async (req, res) => {
//     const item = req.body;
//     console.log("item trello", item);
    
// 	// let boardId; // = event.pathParameters.id;
//   //   console.log("item trello", item);
//   //   // console.log("boardId trello", boardId);
//   //   try {
// 	// 	const data = await trello.board.searchCards(boardId)
// 		return {
// 		  statusCode: 200,
// 		  body: JSON.stringify({message: "works"})
// 		};
// 	//   } catch (err) {
// 	// 	console.log(err);
// 	//   }
	
// 	callback(null, data);
// });

module.exports = router;
