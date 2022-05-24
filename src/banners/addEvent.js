const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addEvent = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {
        name,
        date,
        venue,
        link,
        image,
        image2,
        image3
    } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newEvent = {
        id,
        name,
        date,
        venue,
        link,
        image,
        image2,
        image3,
        createdAt
    }

    await dynamodb
        .put({
            TableName: "EventsTable",
            Item: newEvent,
        })
        .promise();

    return {
        status: 200,
        body: {
            data: newEvent,
        }
    }
}

module.exports = {
    addEvent
}