let redis = require("redis");
let client = redis.createClient();
client.set("userId", "jack", (err) => {
  client.get("userId", (err, data) => {
    console.log(data);
  });
});
