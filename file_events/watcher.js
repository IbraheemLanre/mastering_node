var fs = require("fs");
fs.watch(__filename, { persistent: false }, function (event, filename) {
  console.log(event);
  console.log(filename);
});

// setting a new file or directory name
setImmediate(function () {
  fs.rename(__filename, __filename + ".new", function () {});
});

// closing watcher channel
var w = fs.watch("file", function () {});
w.close();
