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
      LiteCable.broadcast "mumulala_todo", result: payload['content']
    end
  end

end
