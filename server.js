var url = require('url');
var telldus=require('telldus');

var devices=[];

telldus.getDevices(function(err,dev) {
  if ( err ) {
    console.log('Error: ' + err);
  } else {
    // A list of all configured devices is returned
    
    for(var i=0;<dev.length;i++){
    	for(var j=0;j<dev[i].methods.length;j++){
    		if(decoration[dev[i].methods[j]]!==undefined){
    			for(var p in decoration[dev[i].methods[j]]){
    				dev[p]=p;
    			}
    		}
    	}
    }
    console.log(dev);
  }
});

var listener = telldus.addRawDeviceEventListener(function(controllerId, data) {
  console.log(controllerId+ 'Raw device event: ' + data);
});

var decoration=[
		TURNON:{
			on:function(){
				telldus.turnOn(this.id,function(err) {
  					console.log('ON');
				});
			},
			off:function(){
				telldus.turnOff(this.id,function(err) {
  					console.log('OFF');
				});
			},
			onFor:function(settings){
				console.log(JSON.stringify(settings));
				if(settings){
					this.on();
					setTimeout((function(ctx){
						return function(){
							ctx.off.apply(ctx);
						}
					})(this), settings.time || 1000);
				}
			}

		}
]



/*
var commandName="tdtool";

var unit={
	on:function(){
		exec(commandName+" -n "+this.id, tdtool.puts);
	},
	off:function(){
		exec(commandName+" -f "+this.id, tdtool.puts);
	},
	onFor:function(settings){
		console.log(JSON.stringify(settings));
		if(settings){
			this.on();
			setTimeout((function(ctx){
				return function(){
					ctx.off.apply(ctx);
				}
			})(this), settings.time || 1000);
		}
	}
}

var tdtool={
	units:[],
	init:function(){
		tdtool.findUnits();
	},
	getById:function(id){
		for(var i=0;i<tdtool.units.length;i++){
			if(tdtool.units[i].id==id){
				return tdtool.units[i];
			}
		}
	},
	findUnits:function(){
		exec(commandName+" -l ", function(error, stdout, stderr){
			var lines=stdout.match(/[^\r\n]+/g);
			var unitCount=(lines[0].indexOf("devices")!=-1)?(lines[0].split(":"))[1].trim():0;
			for(var i=1;i<lines.length;i++){
				var fields=lines[i].match(/[^\t]+/g);
				tdtool.units.push(Object.create(unit, {
					id:{
						value:fields[0],
						writable: true,
      					enumerable: true,
      					configurable: true
					},
					name:{
						value:fields[1],
						writable: true,
      					enumerable: true,
      					configurable: true
					},
					status:{
						value:fields[2],
						writable: true,
      					enumerable: true,	
      					configurable: true
					}
				}));
			}
			//console.log(JSON.stringify(tdtool.units));
		});
	},
	puts:function(error, stdout, stderr) { sys.puts(stdout) }

	
}
tdtool.init();

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var uri=url.parse(req.url, true);
  var route=uri.pathname.split("/");
  if(route[1]==="unit"){ //Control single unit
  	var unitId=route[2];
  	var action=route[3];
  	tdtool.getById(unitId)[action](uri.query);
  }
  res.end('OK\n');
}).listen(1337, '192.168.1.80');
console.log('Server running at http://127.0.0.1:1337/');

*/

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var uri=url.parse(req.url, true);
  var route=uri.pathname.split("/");
  if(route[1]==="unit"){ //Control single unit
  	var unitId=route[2];
  	var action=route[3];
  	tdtool.getById(unitId)[action](uri.query);
  }
  res.end('OK\n');
}).listen(1337, '192.168.1.80');
console.log('Server running at http://127.0.0.1:1337/');
