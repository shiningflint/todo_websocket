require "sinatra"

CABLE_URL = ENV.fetch("CABLE_URL", "/cable")

class App < Sinatra::Application
  set :public_folder, "assets"

  get "/" do
    # send_file File.expand_path('index.html', settings.public_folder)
    erb :index
  end

  not_found do
    content_type :json
    { status: 404, message: "Resource not found." }.to_json
  end
end
