require "roda"
require "tilt"

CABLE_URL = ENV.fetch("CABLE_URL", "/cable")

class App < Roda
  plugin :render

  route do |r|
    r.root do
      @todos = Todo.all
      view :index
    end
  end
end
