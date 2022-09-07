const { schedule } = require("@netlify/functions");

const handler = async function () {
  const axios = require("axios");

  let config = {
    method: "get",
    url: "api.randomuser.me",
    headers: {},
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("Received event:");

  return {
    statusCode: 200,
  };
};

//Every 2 minutes, at 12:00 AM through 11:00 AM and 11:59 PM (Times shown in UTC)
// module.exports.handler = schedule("*/2 0-11,23 * * *", handler);
module.exports.handler = schedule("*/2 * * * *", handler);
