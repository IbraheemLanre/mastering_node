const fs = require("fs");

/*fs.readFile("data.txt", (err, fileData) => {
  if (err) {
    throw err;
  }
  console.log(fileData);
});*/

// Another method
fs.readFile("data.txt", { encoding: "utf8", flag: "r" }, (err, fileData) => {
  console.log(fileData);
});
