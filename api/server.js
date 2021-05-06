const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 80;
const createUser = require('./controller/createUser.js');


const AWS = require('aws-sdk');
AWS.config.update ( {
  accessKeyId: '',
  secretAccessKey: ',
  region: 'ap-south-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'users';

function buildResponse(statusCode, body) {
  return {
  statusCode: statusCode,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
  }
}
async function addNewUser(user)
{
  
  user.userId = "3";
  // user = user.userId;
    const params = {
        TableName: dynamodbTableName,
        Item: user
      }
      return await dynamodb.put(params).promise().then(() => {
        const body = {
          Operation: 'SAVE',
          Message: 'SUCCESS',
          Item: user
        }
        return buildResponse(200, body);
      }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error);
      })
}
// place holder for the data
const users = [
  {
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com"
  },
  {
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com"
  }
];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  //users.push(user);
   addNewUser(req.body.user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
