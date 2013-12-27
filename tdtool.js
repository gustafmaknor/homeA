var sys = require('sys');
var exec = require('child_process').exec;


function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("tdtool -f 2", puts);


function on(){}
function of(){}