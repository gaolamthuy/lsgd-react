const { schedule } = require("@netlify/functions");

const handler = async function () {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("api.randomuser.me", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  return {
    statusCode: 200,
  };
};

//Every 2 minutes, at 12:00 AM through 11:00 AM and 11:59 PM (Times shown in UTC)
// module.exports.handler = schedule("*/2 0-11,23 * * *", handler);
module.exports.handler = schedule("*/2 * * * *", handler);
