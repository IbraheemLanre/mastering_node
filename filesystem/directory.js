/**
 * A program to transverse a directory
 */

const fs = require("fs");

function walk(dir, done, emitter) {
  let results = {};
  emitter = emitter || new (require("events").EventEmitter)();

  fs.readdir(dir, (err, list) => {
    let pending = list.length;
    if (err || !pending) {
      return done(err, results);
    }

    list.forEach((file) => {
      let dFile = `${dir}/${file}`;
      fs.stat(dFile, (err, stat) => {
        if (err) {
          throw err;
        }
        if (stat.isDirectory()) {
          emitter.emit("directory", dFile, stat);
          return walk(
            dFile,
            (err, res) => {
              results[file] = res;
              !--pending && done(null, results);
            },
            emitter
          );
        }
        emitter.emit("file", dFile, stat);
        results[file] = stat;
        !--pending && done(null, results);
      });
    });
  });
  return emitter;
}

walk(".", (err, res) => {
  console.log(require("util").inspect(res, { depth: null }));
})
  .on("directory", (path, stat) => {
    console.log(`Directory: ${path} - ${stat.size}`);
  })
  .on("file", (path, stat) => {
    console.log(`File: ${path} - ${stat.size}`);
  });
