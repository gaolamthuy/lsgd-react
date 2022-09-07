const { schedule } = require("@netlify/functions");

const handler = async function () {
  console.log("Received event:");

  return {
    statusCode: 200,
    body: "hello cái địt mẹ mày",
    head: "cặc",
  };
};

//Every 2 minutes, at 12:00 AM through 11:00 AM and 11:59 PM (Times shown in UTC)
// module.exports.handler = schedule("*/2 0-11,23 * * *", handler);
module.exports.handler = schedule("*/30 * * * *", handler);
