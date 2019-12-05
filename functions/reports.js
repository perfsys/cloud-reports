const router = require("express").Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const LEAD_GENERATION_REPORT_TABLE_NAME = process.env.LEAD_GENERATION_REPORT_TABLE_NAME;
const DEVELOPER_WEEKLY_REPORT_TABLE_NAME = process.env.DEVELOPER_WEEKLY_REPORT_TABLE_NAME;

//Save lead-generation report
router.post("/lead-generation", (req, res) => {
    const item = req.body;

    item.id = uuidv4();
    item.timestamp = Date.now();

    const params = {
        TableName: LEAD_GENERATION_REPORT_TABLE_NAME,
        Item: item
    };

    dynamoDb.put(params, error => {
        if (error) {
            console.log(error);
            res.status(400).json({error: "Could not create report"});
        }
        res.json({response: "New report created"});
    });
});

//Save developer-weekly report
router.post("/developer-weekly", async (req, res) => {
    const body = req.body;
    console.log(`Body: ${body}`);
    let params = {
        RequestItems: {
            [DEVELOPER_WEEKLY_REPORT_TABLE_NAME]: createItem(body, body.report)
        }
    };

    console.log(`Params: ${params}`);

    await dynamoDb.batchWrite(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({error: "Could not create report"});
        }
        res.json({response: "New report created"});
    });
});

createItem = (item, array) => {
    console.log("Start createItem");
    return array.map(el => {
        let result = {
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
        console.log(`Result: ${result}`);
        return result
    });

};

module.exports = router;
