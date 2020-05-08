const fetch = require("node-fetch");
require("dotenv/config");

getTCData = async (id) => {
  let resultData = [];

  // let url = "https://sujoychakraborty.testrail.io/index.php?/api/v2/get_case/3"
  let url = process.env.TESTRAIL_DOMAIN + "/API/V2/GET_CASE/" + id;

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Basic " + new Buffer(process.env.TESTRAIL_AUTH).toString("base64"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      resl = { a: "got inside TR" };
      //   resl["key"] = res.key;
      //   resl["summary"] = res["fields"]["summary"];
      //   resl["business_goal"] =
      //     res["fields"]["description"]["content"][0]["content"][2]["text"];

      return resl;
    })
    .catch((err) => {
      console.log(err);
      return "error in getJiraIssue.js";
    });
};

module.exports = getTCData;
