const { schedule } = require('@netlify/functions')

const handler = async function() {
    console.log("Received event:")

    return {
        statusCode: 200,
        body: "hello cái địt mẹ mày",
        head: "cặc"
    };
};

//(Times shown in UTC)
module.exports.handler = schedule("*/2 0-11,23 * * *", handler);