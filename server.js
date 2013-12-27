var sys = require('sys');
var exec = require('child_process').exec;
var url = require('url');

var commandName="tdtool";

var tdtool={
	puts:function(error, stdout, stderr) { sys.puts(stdout) },

	on:function(unit){
		exec(commandName+" -n "+unit, tdtool.puts);
	},
	of:function(unit){
		exec(commandName+" -f "+unit, tdtool.puts);
	}
}


var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var route=url.parse(req.url).pathname.split("/");
  if(route[1]==="unit"){ //Control single unit
  	var unitId=route[2];
  	var action=route[3];
  	tdtool[action](unitId);
  }
  res.end('Hello World\n'+route[1]);
}).listen(1337, '192.168.1.80');
console.log('Server running at http://127.0.0.1:1337/');
