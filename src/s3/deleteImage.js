const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.deleteImage = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };

    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: `images/${event.pathParameters.id}.${event.pathParameters.extension}`
        };

        await s3.deleteObject(params).promise();

        response.body = JSON.stringify({ message: 'Imagen eliminada correctamente!' });
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({ message: "Algo salio mal", errorMessage: e });
        response.statusCode = 500;
    }

    return response;
};