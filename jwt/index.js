let token;

function send(route, formData, cb) {
  if (!(formData instanceof FormData)) {
    cb = formData;
    formData = new FormData();
  }

  let caller = new XMLHttpRequest();
  caller.onload = function () {
    cb(JSON.parse(this.responseText));
  };
  caller.open("POST", route);
  token && caller.setRequestHeader("Authorization", "Bearer " + token);
  caller.send(formData);
}

document.addEventListener("click", function (ev) {
  let el = ev.target;
  let formData;

  switch (el.getAttribute("id")) {
    case "login": // POST
      formData = new FormData();
      formData.append("username", "sandro");
      formData.append("password", "abcdefg");

      send("/login", formData, function (res) {
        token = res.token;
        console.log("Set token: " + token);
      });

      break;

    case "getTokenData": // GET
      send("/tokendata", function (tokenData) {
        console.log("token data: ", tokenData);
      });
      break;
    default:
      break;
  }
});
