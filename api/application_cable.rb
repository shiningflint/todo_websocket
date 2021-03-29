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
end
