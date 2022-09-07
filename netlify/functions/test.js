const { schedule } = require('@netlify/functions')

const handler = async function() {
    console.log(process.env)
    console.log("Received event:")

    return {
        statusCode: 200,
        body: "hello cái địt mẹ mày",
        head: "cặc"
    };
};

module.exports.handler = schedule("*/2 3-5,8-10 * * *", handler);