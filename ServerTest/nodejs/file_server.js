var Files = {};
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , exec = require('child_process').exec
  , util = require('util')
 
app.listen(8080);
 
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
 
io.sockets.on('connection', function (socket) {
    socket.on('export', function (data) { 
		console.log(data['file']);
		try{
			var file_name = "mesh.stl"
			var Stat = fs.statSync('Temp/' + file_name);	//check if a file exists
			if(Stat.isFile())	//if the file exists
			{
				//fs.unlink('Temp/' + file_name, function() {
					
				//});
				//console.log('successfully deleted');			
			}
		}
		catch(er){} //It's a New File, we do nothing !
		fs.open("Temp/" + file_name, "w", 0755, function(err, fd){
			if(err)	//if error
			{
				console.log(err);	//print error
			}
			else	//if it works
			{
				fs.write(fd, data['file'], null, 'Binary', function(err, Writen){	//write data in handler
                
				});
			}
		});
    });
	
	socket.on('conversion', function () {
		var cmd = 'py STL_to_GEO.py Temp/mesh.stl';
		exec(cmd, function(error, stdout, stderr) {
		  // command output is in stdout
		});
		var cmd = 'gmsh en mesh.geo -3 -format stl';
		exec(cmd, function(error, stdout, stderr) {
		  // command output is in stdout
		});
	});
});