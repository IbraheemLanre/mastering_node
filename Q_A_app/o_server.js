const http = require("http");
const fs = require("fs");
const url = require("url");

let UNIQUE_ID = 1;
let USER_ID = 1e10;

let clients = {};
let clientQMap = {};
let questions = {};
let answers = {};

function removeClient(id) {
  if (id) {
    delete clients[id];
    delete clientQMap[id];
  }
}

http
  .createServer((req, res) => {
    let parsedURL = url.parse(req.url, true);
    let pathname = parsedURL.pathname;
    let args = pathname.split("/");

    // lose initial null value
    args.shift();

    let method = args.shift();
    let parameter = decodeURIComponent(args[0]);

    let sseUserId = req.headers["_sse_user_id_"];

    function broadcast(toId, msg, eventName) {
      if (toId === "*") {
        for (let p in clients) {
          broadcast(p, msg);
        }
        return;
      }

      let clientSocket = clients[toId];
      if (!clientSocket) {
        return;
      }

      eventName && clientSocket.write("event: " + eventName + "\n");
      clientSocket.write("id: " + (++UNIQUE_ID) + "\n");
      clientSocket.write("data: " + JSON.stringify(msg) + "\n\n");
    }

    if (method === "login") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      });

      res.write(":" + Array(2049).join(" ") + "\n");
      res.write("retry: 2000\n");

      removeClient(sseUserId);

      sseUserId = (USER_ID++).toString(36);

      clients[sseUserId] = res;

      broadcast(sseUserId, sseUserId, "login");

      broadcast(sseUserId, {
        type: "questions",
        questions: questions,
      });

      res.on("close", function () {
        removeClient(sseUserId);
      });

      setInterval(
        () => broadcast(sseUserId, new Date().getTime(), "ping"),
        10000
      );
      return;
    }

    if (method === "askquestion") {
      // check if already asked?
      if (questions[parameter]) {
        return res.end("already asked");
      }

      questions[parameter] = sseUserId;

      broadcast("*", {
        type: "questions",
        questions: questions,
      });

      return res.end();
    }

    if ((method = "addanswer")) {
      if (!parameter) {
        broadcast(sseUserId, {
          type: "notification",
          message: "Your answer is too short.",
        });
        return res.end();
      }

      var curUserQuestion = clientQMap[sseUserId];
      if (!curUserQuestion) {
        broadcast(sseUserId, {
          type: "notification",
          message: "Please select a question to answer",
        });
        return res.end();
      }

      answers[curUserQuestion] = answers[curUserQuestion] || [];
      answers[curUserQuestion].push(parameter);

      // Tell everyone watching about this question
      for (let id in clientQMap) {
        if (clientQMap[id] === curUserQuestion) {
          broadcast(id, {
            type: "answers",
            question: curUserQuestion,
            answers: answers[curUserQuestion],
          });
        }
      }
      return res.end();
    }

    if (method === "selectquestion") {
      if (parameter && questions[parameter]) {
        clientQMap[sseUserId] = parameter;
        broadcast(sseUserId, {
          type: "answers",
          question: parameter,
          answers: answers[parameter] ? answers[parameter] : [],
        });
      }
      return res.end();
    }

    if (!method) {
      return fs.createReadStream("./o_index.html").pipe(res);
    }
  })
  .listen(3000, () => console.log("Server is up!"));
