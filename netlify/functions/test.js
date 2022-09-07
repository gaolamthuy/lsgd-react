const { schedule } = require("@netlify/functions");

const handler = async function () {
  var axios = require("axios");
  var FormData = require("form-data");
  var data = new FormData();
  data.append("content", "test");

  var config = {
    method: "post",
    url: "https://discord.com/api/webhooks/1010911250743570502/Ixj4EiWE8-DkNAqulQxNHsIRiB7X5CInCVDnEH_Uzmkh2Hu_CjeeBSrBFDtAmCcQSXnK",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "__dcfduid=0f7577621c7811edbf7cdeffafb5e155; __sdcfduid=0f7577621c7811edbf7cdeffafb5e155fa163fdf4b26c835f5b8fa76777cef0c6ea7b05755fff7e0a324e03446dc7f86",
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
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
