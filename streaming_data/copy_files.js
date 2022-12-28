// first attempt
const fs = require("fs");

/*console.log('Copying...')
let block = fs.readFileSync("source.bin")
console.log('Size: ' + block.length)
fs.writeFileSync('destination.bin', block)
console.log('Done.')*/

// second attempt
/*console.log("Copying...");
fs.readFile("source.bin", null, (error1, block) => {
  if (error1) {
    throw error1;
  }
  console.log("Size: " + block.length);
  fs.writeFile("destination.bin", block, (error2) => {
    if (error2) {
      throw error2;
    }
    console.log("Done.");
  });
});*/

// Third attempt
/*console.log("Copying...");
// no such function readFileAsync, we can only use readFile with async,await
fs.readFileAsync("source.bin")
  .then((block) => {
    console.log("Size: " + block.length);
    return fs.writeFileAsync("destination.bin", block);
  })
  .then(() => {
    console.log("Done.");
  })
  .catch((e) => {
    //handle errors
  });*/

// Streams
console.log("Copying...");
fs.createReadStream("source.bin")
  .pipe(fs.createWriteStream("destination.bin"))
  .on("close", () => {
    console.log("Done.");
  });
