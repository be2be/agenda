require 'webrick'

server_port = 8000      # port for preview server
test_server_port = 8080 # port for test server

desc "Start development server"
task :preview do
    root = File.expand_path './app'
    server = WEBrick
    puts "Starting WEBrick on port #{server_port}"
    server = WEBrick::HTTPServer.new :Port => server_port, :DocumentRoot => root
    trap 'INT' do server.shutdown end
    trap 'TERM' do server.shutdown end
    server.start
end

desc "Start test server"
task :test do
    root = File.expand_path './'
    server = WEBrick
    puts "Starting WEBrick on port #{test_server_port}"
    server = WEBrick::HTTPServer.new :Port => test_server_port, :DocumentRoot => root
    trap 'INT' do server.shutdown end
    trap 'TERM' do server.shutdown end
    server.start
end
