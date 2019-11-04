const router = require("express").Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const REPORTS_TABLE_NAME = process.env.REPORTS_TABLE_NAME;
const REPORTS_TABLE_NAME_REPORT = process.env.REPORTS_TABLE_NAME_REPORT;


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
            res.status(400).json({error: "Could not create report"});
        }
        res.json({response: "New report created"});
    });
});

router.post('/user-report', async (req, res) => {
    const item = req.body;
    let params = await {
        RequestItems: {
            [REPORTS_TABLE_NAME_REPORT]: createItem(item, item.report)

        }

    };
    await dynamoDb.batchWrite(params, function (err, data) {
       if (err) {
                console.log(err);
                res.status(400).json({error: "Could not create report"});
            }
            res.json({response: "New report created"});
    })
});

createItem = (item, array) => {
    console.log("Start createItem")
    let arrayRequest = [];
        array.map( el => {
        let result = null;
        el.infoReport.filter(iR => {
            if (iR.project && iR.customer && iR.task && iR.hours) {
                result = {
                    PutRequest: {
                        Item: {
                            id: uuidv4(),
                            timestamp: Date.now(),
                            user: item.user,
                            week: item.week,
                            day: el.day,
                            task: iR.task,
                            project: iR.project,
                            customer: iR.customer,
                            hours: iR.hours
                        }
                    }
                }
                arrayRequest.push(result)
            }
        })
    })
    return arrayRequest
}

module.exports = router;
