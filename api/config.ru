# CONFIG
require_relative "./models"
require_relative "./app"
require_relative "./application_cable"

LiteCable.config.log_level = Logger::DEBUG
# END CONFIG

use Rack::Static, :urls => [ "/public" ]

app = Rack::Builder.new do
  map "/" do
    run App
  end
end

# Start built-in rack hijack middleware to serve websockets
require "lite_cable/server"
app.map "/cable" do
  use LiteCable::Server::Middleware, connection_class: ApplicationCable::Connection
  run(proc { |_| [200, {"Content-Type" => "text/plain"}, ["OK"]] })
end

run app
