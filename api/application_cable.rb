require "litecable"

module ApplicationCable
  class Connection < LiteCable::Connection::Base
    def connect
      $stdout.puts "app cable connected"
    end

    def disconnect
      $stdout.puts "app cable disconnected"
    end
  end

  class MumulalaTodo < LiteCable::Channel::Base # :nodoc:
    identifier :mumulala_todo

    def subscribed
      stream_from "mumulala_todo"
    end

    def add_todo(payload)
      $stdout.puts "Data received from client: #{payload}"
      Todo.insert(name: payload["content"])
      render_todos
    end

    def toggle_done(payload)
      todo = Todo.find(id: payload["content"])
      todo.update(done: !todo.done)
      render_todos
    end

    def delete_todo(payload)
      $stdout.puts "Data received from client: #{payload}"
      todo = Todo.find(id: payload["content"])
      todo.delete
      render_todos
    end

    private

    def render_todos
      todos = Todo.all
      template = Tilt.new("views/index_items.erb")
      LiteCable.broadcast "mumulala_todo", result: template.render("", todos: todos)
    end
  end

end
