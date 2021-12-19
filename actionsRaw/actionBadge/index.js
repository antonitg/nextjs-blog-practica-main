const fs = require("fs");
const res = fs.readFileSync("result.txt", "utf8")
if (res == "success") {
   var badge = "![badge-success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
} else {
   var badge = "![badge-failure](https://img.shields.io/badge/test-failure-red)"
}

fs.readFile("README.md", "utf8", function (err, data) {
   var result = data.replace(/Section badge.*End section badge/, badge);
   fs.writeFile("README.md", result, function (err) {
   });
});  