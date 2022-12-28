function longPoll() {
  $.get("http://localhost:2112/poll", (data) => {
    $("<li>" + data + "</li>").appendTo("#results");
    longPoll();
  });
}

longPoll();
