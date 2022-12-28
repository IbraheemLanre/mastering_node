/**
 * This file establishes a stream pointer to the same file that
 * our server will be watching
 */

const fs = require("fs");

const Twit = require("twit");

let twit = new Twit({
  consumer_key: "x3whrbF8SacywsyyuBEbifuHJ",
  consumer_secret: "RAEuTECuDA6rYwCBGORAb25IiMs80er8ibt921vxD4YhZKRkkp",
  access_token: "546770124-N8QlZQ3A8jcd2sbv9r7dRt0N4YwA2G2tCYvD8oWM",
  access_token_secret: "7A4EDoRxnX2eGEsSzfGmooMU8wWFV5KK4FSE71QJZDUfh",
});

let cleanBuffer = function (len) {
  let buf = Buffer.alloc(len);
  buf.fill("\0");
  return buf;
};

let check = function () {
  twit.get(
    "search/tweets",
    {
      q: "#nodejs since: 2013-01-01",
    },
    (err, reply) => {
      let buffer = cleanBuffer(reply.statuses.length * 140);
      reply.statuses.forEach((obj, idx) => {
        buffer.write(obj.text, idx * 140, 140);
      });
      writeStream.write(buffer);
    }
  );
  setTimeout(check, 10000);
};

check();
