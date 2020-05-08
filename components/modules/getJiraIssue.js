const fetch = require("node-fetch");
require("dotenv/config");

getIssueData = async (id) => {
  let resultData = [];
  let scenarios = [];

  // let url = "https://sujoychakraborty.atlassian.net/rest/api/3/issue/" + id
  let url = process.env.JIRA_DOMAIN + "/rest/api/3/issue/" + id;

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + new Buffer(process.env.AUTH).toString("base64"),
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      resl = {};
      resl["key"] = res.key;
      resl["summary"] = res["fields"]["summary"];

      // business goals
      resl["business_goal"] =
        res["fields"]["description"]["content"][0]["content"][2]["text"];

      // pre-conditions
      resl["pre-cond-environment"] =
        res["fields"]["description"]["content"][2]["content"][2]["content"][0][
          "content"
        ][0]["content"][0]["text"];
      resl["pre-cond-environment-value"] =
        res["fields"]["description"]["content"][2]["content"][2]["content"][1][
          "content"
        ][0]["content"][0]["text"];
      resl["pre-cond-credentials"] =
        res["fields"]["description"]["content"][2]["content"][3]["content"][0][
          "content"
        ][0]["content"][0]["text"];
      resl["pre-cond-credentials-value"] =
        res["fields"]["description"]["content"][2]["content"][3]["content"][1][
          "content"
        ][0]["content"][0]["text"];

      // scenarios
      let scenesContent = res["fields"]["description"]["content"][4]["content"];
      for (i = 1; i < scenesContent.length; i++) {
        scene = {};
        if (
          scenesContent[i]["content"][0]["content"][0]["content"].length > 0
        ) {
          scene["sequenceId"] =
            scenesContent[i]["content"][0]["content"][0]["content"][0]["text"];
          scene["sequence"] =
            scenesContent[i]["content"][1]["content"][0]["content"][0]["text"];
          scene["expectedOutcome"] =
            scenesContent[i]["content"][2]["content"][0]["content"][0]["text"];
          scenarios.push(scene);
        }
      }
      resl["scenarios"] = scenarios;
      return resl;
    })
    .catch((err) => {
      console.log(err);
      return "error in getJiraIssue.js";
    });
};

module.exports = getIssueData;
