var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
exec("tdtool -n 2", puts);