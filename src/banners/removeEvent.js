const AWS = require("aws-sdk");

const removeEvent = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    await dynamodb
        .delete({
            TableName: "EventsTable",
            Key: {
                id,
            },
        })
        .promise();

    return {
        status: 200,
        body: {
            message: 'Evento removido'
        }
    };
};

module.exports = {
    removeEvent,
};