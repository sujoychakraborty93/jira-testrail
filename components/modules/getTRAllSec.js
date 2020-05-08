const fetch = require("node-fetch");
require("dotenv/config");

trAllSecData = async (projectId) => {
  let resultData = [];

  // let url = "https://sujoychakraborty.testrail.io/index.php?/api/v2/get_sections/1"
  let url = process.env.TESTRAIL_DOMAIN + "/API/V2/get_sections/" + projectId;

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

      for (i = 0; i < res.length; i++) {
        resl = {};
        resl["id"] = res[i]["id"];
        resl["name"] = res[i]["name"];
        resl["parent_id"] = res[i]["parent_id"];
        resl["depth"] = res[i]["depth"];
        resultData.push(resl);
      }
      return resultData;
    })
    .catch((err) => {
      console.log(err);
      return "error in trAllSecData.js";
    });
};

module.exports = trAllSecData;
