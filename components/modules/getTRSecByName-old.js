const fetch = require("node-fetch");
require("dotenv/config");

trSecByNameData = async (projectId, name) => {
  let resultData = [];

  // let url = "https://sujoychakraborty.testrail.io/index.php?/api/v2/get_section/1"
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
      //   console.log(res);
      for (i = 0; i < res.length; i++) {
        resl = {};
        isPresent = false;
        if (res[i]["name"] === name) {
          isPresent = true;
          resl["id"] = res[i]["id"];
          resl["name"] = res[i]["name"];
          resl["parent_id"] = res[i]["parent_id"];
          resl["depth"] = res[i]["depth"];
          break;
        }
      }
      if (!isPresent) {
        resl["id"] = -1;
      }
      resultData.push(resl);
      return resultData;
    })
    .catch((err) => {
      console.log(err);
      return "error in trSecByNameData.js";
    });
};

module.exports = trSecByNameData;
