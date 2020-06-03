const AWS = require('aws-sdk');
const CSV = require('csv');

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

const getStartOfTheUTCDayTimestamp = () => {
  let timestamp = Date.now();

  timestamp = new Date(timestamp).setHours(0);
  timestamp = new Date(timestamp).setMinutes(0);
  timestamp = new Date(timestamp).setSeconds(0);
  timestamp = new Date(timestamp).setMilliseconds(0);

  return timestamp;
};

const dumpTables = async (tables) => {
  const [ TableName, ...unprocessedTables ] = tables;
  const timestamp = getStartOfTheUTCDayTimestamp();
  const { Items } = await scan({
    TableName,
    FilterExpression: 'id > :timestamp',
    ExpressionAttributeValues: {
      ':timestamp': timestamp,
    },
  });

  Items.sort((a, b) => a.id < b.id ? 1 : - 1);

  const itemsToDump = [Items[0]];
  const csvStr = await stringify(itemsToDump);
  
  await putObject({
    Bucket: process.env.TABLE_DUMPS_BUCKET_NAME,
    Body: csvStr,
    Key: `daily/${TableName}-latest.csv`,
  });

  const dayOfTheWeek = new Date().getDay();
  if (dayOfTheWeek === 7) {
    await putObject({
      Bucket: process.env.TABLE_DUMPS_BUCKET_NAME,
      Body: csvStr,
      Key: `weekly/${TableName}-latest.csv`,
    });
  }

  if (unprocessedTables.length) return dumpTables(unprocessedTables);
};

module.exports = async (event, context, callback) => {
  const tableNames = process.env.TABLES_TO_DUMP.split(',');
  
  await dumpTables(tableNames);
};
