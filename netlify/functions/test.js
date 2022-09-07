const { schedule } = require("@netlify/functions");

const handler = async function () {
  const sendMessageDiscord = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "__dcfduid=0f7577621c7811edbf7cdeffafb5e155; __sdcfduid=0f7577621c7811edbf7cdeffafb5e155fa163fdf4b26c835f5b8fa76777cef0c6ea7b05755fff7e0a324e03446dc7f86"
    );

    var formdata = new FormData();
    formdata.append("content", "test");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://discord.com/api/webhooks/1008656290463109201/6YCO-J9pIF0EZv_4cylRueuPdvXU4KR2R9u3Rt8QmRUZrRtKKKj32qW0Fi1WAuA6DFRH",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  console.log("Received event:");

  sendMessageDiscord();
  return {
    statusCode: 200,
  };
};

//Every 2 minutes, at 12:00 AM through 11:00 AM and 11:59 PM (Times shown in UTC)
// module.exports.handler = schedule("*/2 0-11,23 * * *", handler);
module.exports.handler = schedule("*/2 * * * *", handler);
