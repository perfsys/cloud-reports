const router = require("express").Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const DEVELOPER_WEEKLY_REPORT_TABLE_NAME = process.env.DEVELOPER_WEEKLY_REPORT_TABLE_NAME;

//Save developer-weekly report
router.post("/job", async (req, res) => {
    const {body} = req;
    console.log(`Body: ${JSON.stringify(body, null, 4)}`);

    let item = {
        id: uuidv4(),
        timestamp: Date.now(),
        user: body.user,
        week: body.week,
        customer: body.customer,
        hours: body.hours,
        project: body.project,
        date: body.date,
        taskId: body.taskId,
        boardId: body.boardId,
        listId: body.listId
    }
    console.log(`Item: ${item}`);
    const params = {
        TableName: DEVELOPER_WEEKLY_REPORT_TABLE_NAME,
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

//Get report for a week
router.post("/week", async (req, res) => {
    const {body} = req;
    console.log(`Body: ${JSON.stringify(body, null, 4)}`);

    const params = {
        TableName: DEVELOPER_WEEKLY_REPORT_TABLE_NAME,
        // Key: {
        //     user: body.user,
        //     week: body.week
        // },
        KeyConditionExpression: '#user = :user and #week = :week',
        ExpressionAttributeNames: {"#user": "user", "#week": "week"},
        ExpressionAttributeValues: {":user": body.user, ":week": body.week}
    };

    console.log(`Params: ${JSON.stringify(params, null, 4)}`);

    dynamoDb.query(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({error: "Tasks is empty."});
        }
        res.json({week: data});
    });
});


let createItems = (item) => {
    console.log("Start createItems");
    return item.tasks.map(el => {
        let result = {
            PutRequest: {
                Item: {
                    id: uuidv4(),
                    timestamp: Date.now(),
                    user: item.user,
                    week: item.week,
                    customer: el.customer,
                    hours: el.hours,
                    project: el.project,
                    date: el.date,
                    taskId: el.taskId,
                    boardId: el.boardId,
                    listId: el.listId
                }
            }
        };
        console.log(`Result: ${JSON.stringify(result, null, 4)}`);
        return result
    });

};

module.exports = router;
