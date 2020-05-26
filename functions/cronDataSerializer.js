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

module.exports = async (event, context,callback) => {
  const tablesArr = Object.keys(process.env)
    .filter((varb) => varb.includes('TABLE_NAME'))
    .map((tableName) => process.env[tableName]);

  await Promise.all(tablesArr.map((TableName) => new Promise((resolve, reject) => {
    scan({ TableName })
      .then(({ Items }) => stringify(Items))
      .then((csvStr) => putObject({
        Bucket: process.env.TABLE_DUMPS_BUCKET_NAME,
        Body: csvStr,
        Key: `${TableName}-${Date.now()}.csv`,
      }))
      .then((data) => resolve(data))
  })));
};
