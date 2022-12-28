var EventEmitter = require("events").EventEmitter;
var Counter = function (init) {
  this.increment = function () {
    init++;
    this.emit("incremented", init);
  };
};

Counter.prototype = new EventEmitter(); // to be able to create an instance
var counter = new Counter(14); // instance
var callback = function (count) {
  console.log(count);
};

counter.addListener("incremented", callback);

counter.increment();
counter.increment();
counter.increment();

var Readable = require("stream").Readable;
var readable = new Readable();
var count = 0;

readable._read = function () {
  if (++count > 10) {
    return readable.push(null);
  }
  setTimeout(function () {
    readable.push(count + "\n");
  }, 500);
};
readable.pipe(process.stdout);

// writing into a file
var fs = require("fs");
var writeStream = fs.createWriteStream("./counter.txt", {
  flags: "w",
  mode: 0666,
  function(err) {
    console.log(err);
  },
});
readable.pipe(writeStream);


