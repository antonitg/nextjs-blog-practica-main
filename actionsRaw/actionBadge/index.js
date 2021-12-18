const fs = require("fs");
const res = fs.readFileSync("result.txt", "utf8")
if (res == "success") {
   var badge = "![badge-success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
} else {
   var badge = "![badge-failure](https://img.shields.io/badge/test-failure-red)"
}

fs.readFile("README.md", "utf8", function (err, data) {
    const result = data.replace(/(?<=\<!---Section badge --\>\n)[^]+(?=\n\<!---End section badge --\>)/g, badge);
    fs.writeFile("README.md", result, "utf8");
});