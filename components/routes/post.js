const express = require("express");
const router = express.Router();
const getIssueData = require("../modules/getJiraIssue");
const getAllIssueData = require("../modules/getAllJiraIssues");
const getTCData = require("../modules/getTRTestCase");
const getTRAllSecData = require("../modules/getTRAllSec");
const getTRSecByNameData = require("../modules/getTRSecByName");
const trCreateTC = require("../modules/addTRTestCase");
const trCreateSection = require("../modules/addTRSection");
const trCreateAllSectionsFromJira = require("../modules/addAllTRSecFrmJiraIssue");
require("dotenv/config");

// ==========================================================================
// JIRA POSTS
// ---------------------------------------------------
router.post("/jira/issue", async (req, res) => {
  let issueData = await getIssueData(req.body.id);
  //   let issueData = await getIssueData("PROJ1-1");
  res.send(issueData);
});
router.post("/jira/allissues/byproject", async (req, res) => {
  let allIssueData = await getAllIssueData(req.body.projectkey);
  // let allIssueData = await getAllIssueData("PROJ1-1");
  res.send(allIssueData);
});

// ========================================================================
// TESTRAIL POSTS
// -------------------------------------------------------
router.post("/testrail/testcase", async (req, res) => {
  // let tcData = await getTCData(req.body.id)
  let tcData = await getTCData("3");
  res.send(tcData);
});
router.post("/testrail/get/allsections", async (req, res) => {
  let trAllSecData = await getTRAllSecData(req.body.projectid);
  //   let trAllSecData = await getTRAllSecData("1");
  res.send(trAllSecData);
});
router.post("/testrail/get/section/byname", async (req, res) => {
  let trSecByNameData = await getTRSecByNameData(
    req.body.projectid,
    req.body.name
  );
  //   let trSecByNameData = await getTRSecByNameData(
  //     "1",
  //     "PROJ1-1: Issue1 for Crossover"
  //   );
  res.send(trSecByNameData);
});
router.post("/testrail/create/section/fromjiraissue", async (req, res) => {
  let trSecByNameData = await getTRSecByNameData(
    req.body.projectid,
    req.body.name
  );
  //   let trSecByNameData = await getTRSecByNameData(
  //     "1",
  //     "PROJ1-1: Issue1 for Crossover"
  //   );
  res.send(trSecByNameData);
});
// CREATE SECTION
router.post("/testrail/create/section", async (req, res) => {
  let createdSection = await trCreateSection(req.body);
  res.send(createdSection);
});
// CREATE TEST CASE
router.post("/testrail/create/testcase", async (req, res) => {
  let createdTC = await trCreateTC(req.body);
  res.send(createdTC);
});
// ========================================================================
//
router.post("/testrail/create/allsections/fromjiraissues", async (req, res) => {
  let result = await trCreateAllSectionsFromJira(req.body);
  res.send(result);
});
// ========================================================================

module.exports = router;
