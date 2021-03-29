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

  class Channel < LiteCable::Channel::Base # :nodoc:
    # identifier :chat

    # def subscribed
    #   reject unless chat_id
    #   stream_from "chat_#{chat_id}"
    # end

    # def speak(data)
    #   LiteCable.broadcast "chat_#{chat_id}", user: user, message: data["message"], sid: sid
    # end

    # private

    # def chat_id
    #   params.fetch("id")
    # end
  end

end
