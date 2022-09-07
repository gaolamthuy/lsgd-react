const { schedule } = require("@netlify/functions");

const fetch = require("node-fetch");

const API_ENDPOINT = "https://api.randomuser.me";

const handler = async (event, context) => {
  let response;
  try {
    response = await fetch(API_ENDPOINT);
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response,
    }),
  };
};

//Every 2 minutes, at 12:00 AM through 11:00 AM and 11:59 PM (Times shown in UTC)
// module.exports.handler = schedule("*/2 0-11,23 * * *", handler);
module.exports.handler = schedule("*/2 * * * *", handler);
