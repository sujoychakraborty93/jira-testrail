const fetch = require("node-fetch");
require("dotenv/config");

trCreateTestCaseData = async (body) => {
  // let url = "https://sujoychakraborty.testrail.io/index.php?/api/v2/add_case/3"
  let url = process.env.TESTRAIL_DOMAIN + "/api/v2/add_case/" + body.section_id;
  // console.log(body.section_id);
  delete body.section_id;
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
      return "error in addTRTestCase.js";
    });
};

module.exports = trCreateTestCaseData;
