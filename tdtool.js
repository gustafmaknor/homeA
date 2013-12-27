var sys = require('sys');
var exec = require('child_process').exec;
var commandName="tdtool";

function puts(error, stdout, stderr) { sys.puts(stdout) }

function on(unit){
	exec(commandName+" -n "+unit, puts);
}
function of(unit){
	exec(commandName+" -f "+unit, puts);
}