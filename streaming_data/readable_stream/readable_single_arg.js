const stream = require("stream");

// readable with one argument
let Feed = function (channel) {
  let readable = new stream.Readable({});
  let news = "Breaking News: Something happening along the highway";
  readable._read = () => {
    readable.push(news);
    readable.push(null);
  };
  return readable;
};

let feed = new Feed();
feed.on("readable", () => {
  let character;
  while ((character = feed.read(1))) {
    console.log(character.toString());
  }
});
feed.on("end", () => console.log("No bytes to read"));
