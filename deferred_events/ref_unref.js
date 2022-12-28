setTimeout(function () {
  console.log("now stop");
}, 100);
var intervalid = setInterval(function () {
  console.log("running");
}, 1);

intervalid.unref();
