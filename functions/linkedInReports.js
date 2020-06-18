const AWS = require('aws-sdk');
const router = require('express').Router();
const Ajv = require('ajv');
const schema = require('../schemas/postLinkedInStats.json');

const DynamoDB = new AWS.DynamoDB.DocumentClient();
const ajv = new Ajv();

const put = params => new Promise(
  (resolve, reject) => DynamoDB.put(params, (err, data) => err ? reject(err) : resolve(data))
);
const scan = params => new Promise(
  (resolve, reject) => DynamoDB.scan(params, (err, data) => err ? reject(err) : resolve(data))
);

router.post('/', async (request, response) => {
  try {
    const validate = ajv.compile(schema);
    if (!validate(request.body)) return response
    .status(400)
    .set({ 'Access-Control-Allow-Origin': '*' })
    .send('Request body is invalid');

    const {
      body: { data: payload },
    } = request;
    const TableName = process.env.LINKED_IN_REPORTS_TABLE_NAME;
    const now = Date.now();
    const Item = Object.assign({ id: now.toString(), createdAt: new Date(now).toISOString() }, payload);

    await put({ TableName, Item });

    return response
      .status(200)
      .set({ 'Access-Control-Allow-Origin': '*' })
      .send(Item);
  } catch(err) {
    return response
      .status(500)
      .set({ 'Access-Control-Allow-Origin': '*' })
      .send(err.message);
  }
});

router.get('/', async (request, response) => {
  try {
    const { Items: stats } = await scan({ TableName: process.env.LINKED_IN_REPORTS_TABLE_NAME });

    stats.sort((val1, val2) => val1.id > val2.id ? -1 : 1);

    return response
      .status(200)
      .set({ 'Access-Control-Allow-Origin': '*' })
      .json(stats);
  } catch (err) {
    return response
      .status(500)
      .set({ 'Access-Control-Allow-Origin': '*' })
      .send(err.message);
  }
});

module.exports = router;
