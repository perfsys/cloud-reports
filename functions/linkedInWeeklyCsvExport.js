const AWS = require('aws-sdk');
const CSV = require('csv');
const moment = require('moment');

const DynamoDB = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3();

const scan = params => new Promise(
  (resolve, reject) => DynamoDB.scan(params, (err, data) => err ? reject(err) : resolve(data))
);

const stringify = params => new Promise(
  (resolve, reject) => CSV.stringify(params, { header: true }, (err, data) => err ? reject(err) : resolve(data))
);

const putObject = params => new Promise(
  (resolve, reject) => S3.putObject(params, (err, data) => err ? reject(err) : resolve(data))
);

const dumpTables = async (tables) => {
  const [ TableName, ...unprocessedTables ] = tables;
  const timestamp = moment().startOf('week').unix() * 1000;
  console.log('Scanning table - ', TableName);

  const { Items } = await scan({
    TableName,
    FilterExpression: 'id > :timestamp',
    ExpressionAttributeValues: {
      ':timestamp': timestamp,
    },
  });

  Items.sort((a, b) => a.id < b.id ? 1 : - 1);
  console.log('Items to serialization: ', JSON.stringify(Items));

  const csvStr = await stringify([Items[0] || {}]);
  console.log('Recording dataset to S3: ', csvStr);

  await putObject({
    Bucket: process.env.LINKED_IN_REPORTS_WEEKLY_BUCKET_NAME,
    Body: csvStr,
    Key: `latest.csv`,
  });

  if (unprocessedTables.length) return dumpTables(unprocessedTables);
};

module.exports = async () => {
  const tableNames = [process.env.LINKED_IN_REPORTS_TABLE_NAME];
  console.log('Tables ready to be serialized: ', tableNames.join(', '));

  await dumpTables(tableNames);
};
