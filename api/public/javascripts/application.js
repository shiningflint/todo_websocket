(() => {
  const AppSocket = {
    // Data
    socket: null,
    channel: "mumulala_todo",

    // Methods
    init: function () {
      this.socket = new WebSocket("ws://0.0.0.0:9292/cable");
      this.socket.onopen = (e) => {
        console.info("[connected] : Connection established to the server");
        this.subscribeToChannel();
      };

      this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data)

        if (data.type !== "ping") {
          console.log("[message] : Message from the server", data);
        }
      };

      this.socket.onerror = (e) => {
        console.error("[error] : Error establishing connection", e.message);
      };
    },
    subscribeToChannel: function () {
      this.socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: this.channel,
          }),
        })
      );
    },
    sendMessage: function (message, action) {
      console.log("sending message", message, action, this);
      this.socket.send(
        JSON.stringify({
          command: "message",
          identifier: JSON.stringify({
            channel: this.channel,
          }),
          data: JSON.stringify({
            content: message,
            action: action,
          }),
        })
      );
    },
  }

  const Form = {
    // Data
    form: null,
    todoInput: null,

    // Methods
    init: function () {
      this.form = document.getElementById("todo_form")
      this.todoInput = document.getElementById("todo_input")
      this.form.addEventListener("submit", (e) => { this.onFormSubmit(e) }, false);
    },
    onFormSubmit: function (e) {
      e.preventDefault();
      AppSocket.sendMessage(this.todoInput.value, "add_todo");
      this.todoInput.value = "";
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    AppSocket.init()
    Form.init()
  })
})()
