const fetch = require("node-fetch");
require("dotenv/config");

trSecByNameData = (projectId, name) => {
  let resultData = [];

  // let url = "https://sujoychakraborty.testrail.io/index.php?/api/v2/get_section/1"
  let url = process.env.TESTRAIL_DOMAIN + "/API/V2/get_sections/" + projectId;

  return new Promise((resolve, reject) => {
    fetch(url, {
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
        for (j = 0; j < res.length; j++) {
          resl = {};
          isPresent = false;
          if (res[j]["name"] === name) {
            isPresent = true;
            resl["id"] = res[j]["id"];
            resl["name"] = res[j]["name"];
            resl["parent_id"] = res[j]["parent_id"];
            resl["depth"] = res[j]["depth"];
            break;
          }
        }
        if (!isPresent) {
          resl["id"] = -1;
        }
        resultData.push(resl);
        resolve(resultData);
      })
      .catch((err) => {
        console.log(err);
        return "error in trSecByNameData.js";
      });
  });
};

module.exports = trSecByNameData;
