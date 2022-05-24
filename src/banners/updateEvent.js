const AWS = require("aws-sdk");

const updateEvent = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const {
        name,
        date,
        venue,
        link,
        image,
        image2,
        image3
    } = JSON.parse(event.body);

    await dynamodb
        .update({
            TableName: "EventsTable",
            Key: { id },
            UpdateExpression: "set #srtname = :srtname, #strdate=:strdate, venue=:venue, link=:link, image=:image, image2=:image2, image3=:image3",
            ExpressionAttributeNames: {
                "#srtname": "name",
                "#strdate": "date"
            },
            ExpressionAttributeValues: {
                ":srtname": name,
                ":strdate": date,
                ":venue": venue,
                ":link": link,
                ":image": image,
                ":image2": image2,
                ":image3": image3
            },
            ReturnValues: "UPDATED_NEW",
        })
        .promise();

    return {
        status: 200,
        body: {
            message: 'Evento actualizado correctamente',
            data: {
                name,
                date,
                venue,
                link,
                image,
                image2,
                image3
            }
        }
    };
};

module.exports = {
    updateEvent,
};