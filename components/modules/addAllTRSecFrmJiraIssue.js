const fetch = require("node-fetch");
require("dotenv/config");
const getAllJiraIss = require("./getAllJiraIssues");
const getTRSecByNam = require("./getTRSecByName");
const addTrSec = require("./addTRSection");
const addTrTC = require("./addTRTestCase");

// projectkey, trprojectId, trparentId
trCreateAllSectionsFromJira = async (body) => {
  let allJiraIssues1 = await getAllJiraIss(body.projectkey);
  resultArr = [];
  for (i = 0; i < allJiraIssues1.length; i++) {
    let allJiraIssues = [...allJiraIssues1];
    let secname = (
      allJiraIssues[i]["key"] +
      ": " +
      allJiraIssues[i]["summary"]
    ).trim();
    let trSecname = await getTRSecByNam(body.trprojectId, secname);
    let result = {};
    let newTRSec = {};
    if (trSecname[0]["id"] === -1) {
      let newTRSecDetails = {};
      newTRSecDetails["projectId"] = body.trprojectId;
      newTRSecDetails["name"] = secname;
      newTRSecDetails["parent_id"] = body.trparentId;
      newTRSecDetails["description"] =
        process.env.JIRA_DOMAIN + "/browse/" + allJiraIssues[i]["key"];
      newTRSec = await addTrSec(newTRSecDetails);
      result[
        "newSection"
      ] = `Created New Section ${secname} with id: ${newTRSec["id"]}`;

      let newTRTCDetails = {};
      newTRTCDetails["section_id"] = newTRSec["id"];
      newTRTCDetails["title"] = allJiraIssues[i]["business_goal"];
      newTRTCDetails["type_id"] = process.env.NEW_TRTC_TYPE_ID;
      newTRTCDetails["priority_id"] = process.env.NEW_TRTC_PRIORITY_ID;
      newTRTCDetails["custom_testcasestatus"] = process.env.NEW_TRTC_TC_STATUS;
      newTRTCDetails["template_id"] = process.env.NEW_TRTC_TEMPLATE_ID;
      newTRTCDetails["custom_preconds"] =
        allJiraIssues[i]["pre-cond-environment"] +
        allJiraIssues[i]["pre-cond-environment-value"] +
        allJiraIssues[i]["pre-cond-credentials"] +
        allJiraIssues[i]["pre-cond-credentials-value"];
      let scenarios = allJiraIssues[i]["scenarios"];
      newTRTCDetails["custom_steps_separated"] = [];
      for (k = 0; k < scenarios.length; k++) {
        steps = {};
        steps["content"] = scenarios[k]["sequence"];
        steps["expected"] = scenarios[k]["expectedOutcome"];
        newTRTCDetails["custom_steps_separated"].push(steps);
      }

      let newTRTC = await addTrTC(newTRTCDetails);
      result[
        "newTestCase"
      ] = `New Test Case with title \'${newTRTC["title"]}\' and id '${newTRTC["id"]}'
    has been created. `;
    } else {
      newTRSec = trSecname[0];
      result[
        "newSection"
      ] = `Section ${secname} already exists. Id: ${newTRSec["id"]}`;
      result["newTestCase"] = "No new test case added";
    }

    resultArr.push(result);
  }
  return resultArr;
};

module.exports = trCreateAllSectionsFromJira;
