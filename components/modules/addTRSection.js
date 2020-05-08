const fetch = require("node-fetch");
require("dotenv/config");

trCreateSectionData = async (body) => {
  let resultData = [];

  // let url = "https://sujoychakraborty.testrail.io/index.php?/api/v2/add_section/1"
  let url =
    process.env.TESTRAIL_DOMAIN + "/API/V2/add_section/" + body.projectId;
  // console.log(body.projectId);
  delete body.projectId;
  // console.log(body);
  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + new Buffer(process.env.TESTRAIL_AUTH).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return "error in createTRSection.js";
    });
};

module.exports = trCreateSectionData;
