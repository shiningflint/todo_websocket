# ~/app/server.rb
# A simple WS server that evaluates math expression literally using ruby eval
# Run this server with ruby server.rb

require "rack"
require "rack/handler/puma"
require "lite_cable"
require "lite_cable/server"

class CalculatorConnection < LiteCable::Connection::Base
  identified_by :token

  def connect
    self.token = request.params["token"]

    $stdout.puts "Session #{token} is connected to the server"
  end

  def disconnect
    $stdout.puts "Session #{token} disconnected from the server"
  end
end

class CalculatorChannel < LiteCable::Channel::Base
  identifier :calculator

  def subscribed
    stream_from "calculator"
  end

  def evaluate(payload)
    $stdout.puts "Data received from the client"

    LiteCable.broadcast "calculator", result: eval(payload['expression'])
  end
end

app = Rack::Builder.new
app.map "/cable" do
  use LiteCable::Server::Middleware, connection_class: CalculatorConnection

  run(proc { |_| [200, {"Content-Type" => "text/plain"}, ["OK"]] })
end

Rack::Handler::Puma.run app
