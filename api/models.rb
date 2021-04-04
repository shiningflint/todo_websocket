require 'sequel'
require 'sqlite3'

DB = Sequel.connect("sqlite://mumulala.db")

Dir[File.join(__dir__, "models", "*.rb")].each { |file| require file }
