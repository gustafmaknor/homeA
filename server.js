var sys = require('sys');
var exec = require('child_process').exec;
var url = require('url');

var commandName="tdtool";

function puts(error, stdout, stderr) { sys.puts(stdout) }

function on(unit){
	exec(commandName+" -n "+unit, puts);
}
function of(unit){
	exec(commandName+" -f "+unit, puts);
}



var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n'+url.parse(req.url).pathname);
}).listen(1337, '192.168.1.80');
console.log('Server running at http://127.0.0.1:1337/');
