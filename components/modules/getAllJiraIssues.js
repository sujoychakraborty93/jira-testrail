const fetch = require("node-fetch");
require("dotenv/config");

getAllJiraIssueData = async (projectkey) => {
  let resultData = [];
  let scenarios = [];

  // let url = "https://sujoychakraborty.atlassian.net/rest/api/3/search?jql=project=" + projectkey
  let url =
    process.env.JIRA_DOMAIN + "/rest/api/3/search?jql=project=" + projectkey;

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + new Buffer(process.env.AUTH).toString("base64"),
    },
  })
    .then((response) => response.json())
    .then((res) => {
      //   console.log(res);
      for (x = 0; x < res["issues"].length; x++) {
        resl = {};
        resl["key"] = res["issues"][x].key;
        resl["summary"] = res["issues"][x]["fields"]["summary"];

        // business goals
        resl["business_goal"] =
          res["issues"][x]["fields"]["description"]["content"][0]["content"][2][
            "text"
          ];

        // pre-conditions
        resl["pre-cond-environment"] =
          res["issues"][x]["fields"]["description"]["content"][2]["content"][2][
            "content"
          ][0]["content"][0]["content"][0]["text"];
        resl["pre-cond-environment-value"] =
          res["issues"][x]["fields"]["description"]["content"][2]["content"][2][
            "content"
          ][1]["content"][0]["content"][0]["text"];
        resl["pre-cond-credentials"] =
          res["issues"][x]["fields"]["description"]["content"][2]["content"][3][
            "content"
          ][0]["content"][0]["content"][0]["text"];
        resl["pre-cond-credentials-value"] =
          res["issues"][x]["fields"]["description"]["content"][2]["content"][3][
            "content"
          ][1]["content"][0]["content"][0]["text"];

        // scenarios
        let scenesContent =
          res["issues"][x]["fields"]["description"]["content"][4]["content"];
        for (i = 1; i < scenesContent.length; i++) {
          scene = {};
          if (
            scenesContent[i]["content"][0]["content"][0]["content"].length > 0
          ) {
            scene["sequenceId"] =
              scenesContent[i]["content"][0]["content"][0]["content"][0][
                "text"
              ];
            scene["sequence"] =
              scenesContent[i]["content"][1]["content"][0]["content"][0][
                "text"
              ];
            scene["expectedOutcome"] =
              scenesContent[i]["content"][2]["content"][0]["content"][0][
                "text"
              ];
            scenarios.push(scene);
          }
        }
        resl["scenarios"] = scenarios;
        resultData.push(resl);
      }

      return resultData;
    })
    .catch((err) => {
      console.log(err);
      return "error in getJiraIssue.js";
    });
};

module.exports = getAllJiraIssueData;
