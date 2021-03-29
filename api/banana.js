// ~/app/client.js
// A client that talks to the WS server.
// To run, Open chrome console and paste this code

let socket = null;

(function init() {
  socket = new WebSocket("ws://0.0.0.0:9292/cable?token=abc123");

  socket.onopen = function (e) {
    console.info("[connected] : Connection established to the server");
  };

  socket.onmessage = function (e) {
    console.info("[message] : Message from the server", e.data);
  };

  socket.onerror = function (e) {
    console.error("[error] : Error establishing connection", e.message);
  };

})();

// subscribe to the calculator channel
socket.send(
  JSON.stringify({
    command: "subscribe",
    identifier: JSON.stringify({
      channel: "calculator",
    }),
  })
);

// call the evaluate method on the Calculator channel
socket.send(
  JSON.stringify({
    command: "message",
    identifier: JSON.stringify({
      channel: "calculator",
    }),
    data: JSON.stringify({
      expression: "150 * 4 - 3 / (2 + 2)",
      action: "evaluate",
    }),
  })
);
