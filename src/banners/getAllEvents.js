const AWS = require("aws-sdk");

const getAllEvents = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({ TableName: "EventsTable" }).promise();

    const events = result.Items;
    events.map((event) => event.key = event.id)
    return {
        status: 200,
        body: {
            events,
        },
    };
};

module.exports = {
    getAllEvents,
};