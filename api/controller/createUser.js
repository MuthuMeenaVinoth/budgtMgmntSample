const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'users';

async function addNewUser(user)
{
    const params = {
        TableName: dynamodbTableName,
        Item: user
      }
      return await dynamodb.put(params).promise().then(() => {
        const body = {
          Operation: 'SAVE',
          Message: 'SUCCESS',
          Item: requestBody
        }
        return buildResponse(200, body);
      }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error);
      })
}