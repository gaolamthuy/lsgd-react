const { schedule } = require('@netlify/functions')

const handler = async function(event) {
    console.log("Received event:", event)

    return {
        statusCode: 200,
        body: "hello cái địt mẹ mày",
        head: "cặc"
    };
};

module.exports.handler = schedule("* * * * *", handler);