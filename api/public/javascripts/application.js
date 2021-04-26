(() => {
  const AppSocket = {
    // Data
    socket: null,
    channel: "mumulala_todo",

    // Methods
    init: function () {
      this.socket = new WebSocket("ws://localhost:9292/cable");
      this.socket.onopen = (e) => {
        console.info("[connected] : Connection established to the server");
        this.subscribeToChannel();
      };

      this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data)

        if (data.type === "ping") return

        // console.log("[message] : Message from the server", data);
        if (data.message && data.message.result) {
          TodoList.updateList(data.message.result)
        }
      };

      this.socket.onerror = (e) => {
        console.error("[error] : Error establishing connection", e);
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
  };

  const Form = {
    // Data
    form: null,
    todoInput: null,

    // Methods
    init: function () {
      this.form = document.getElementById("todo_form")
      this.todoInput = document.getElementById("todo_input")
      this.form.addEventListener("submit", (e) => { this.onFormSubmit(e) }, false)
    },
    onFormSubmit: function (e) {
      e.preventDefault()
      AppSocket.sendMessage(this.todoInput.value, "add_todo")
      this.todoInput.value = ""
    },
  };

  const TodoList = {
    // Data
    todoList: null,

    // Methods
    init: function () {
      this.todoList = document.getElementById("todo_list")
      this.todoList.addEventListener("click", this.onTodoListClick, false)
    },
    updateList: function (newList) {
      this.todoList.innerHTML = newList
    },
    onTodoListClick: function (e) {
      if (e.target.classList.contains("delete")) {
        const itemId = e.target.dataset.id
        AppSocket.sendMessage(itemId, "delete_todo")
      }

      if (e.target.classList.contains("done")) {
        const itemId = e.target.dataset.id
        AppSocket.sendMessage(itemId, "toggle_done")
      }
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    AppSocket.init()
    TodoList.init()
    Form.init()
  })
})()
