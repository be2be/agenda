require 'webrick'

server_port = 8000  # port for preview server

desc "Start development server"
task :preview do
    root = File.expand_path './app'
    server = WEBrick
    puts "Starting WEBrick on port #{server_port}"
    server = WEBrick::HTTPServer.new :Port => server_port, :DocumentRoot => root
    trap 'INT' do server.shutdown end
    server.start
end
