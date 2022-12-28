/**
 * A program to open and read file, byte by byte
 */
const fs = require("fs");

fs.open("data.txt", "r", (err, fd) => {
  fs.fstat(fd, (err, stats) => {
    let totalBytes = stats.size;
    let buffer = Buffer.alloc(totalBytes);
    let bytesRead = 0;
    // Each call to read should ensure that chunk size is within the proper size ranges (not too small; not too large)
    let read = (chunkSize) => {
      fs.read(
        fd,
        buffer,
        bytesRead,
        chunkSize,
        bytesRead,
        (err, numBytes, bufRef) => {
          if ((bytesRead += numBytes) < totalBytes) {
            return read(Math.min(512, totalBytes - bytesRead));
          }
          fs.close(fd);
          console.log(`File read complete. Total bytes read: ${totalBytes}`);
          // Note that the callback receives a reference to the accumulating buffer
          console.log(bufRef.toString("utf-8"));
        }
      );
    };
    read(Math.min(512, totalBytes));
  });
});
