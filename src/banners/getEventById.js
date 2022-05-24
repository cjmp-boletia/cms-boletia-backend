const AWS = require("aws-sdk");

const getEventById = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    const result = await dynamodb
        .get({
            TableName: "EventsTable",
            Key: { id },
        })
        .promise();

    const task = result.Item;

    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: task,
    };
};

module.exports = {
    getEventById,
};
