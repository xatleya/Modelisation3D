var app = require('http').createServer(getFilename)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , exec = require('child_process').exec
  , util = require('util')
  , path = require('path')
  ,	url = require('url');
 
app.listen(1000);
console.log("Server available...");

function sendError(errCode, errString, response){
  response.writeHead(errCode, {"Content-Type": "text/plain"});
  response.write(errString + "\n");
  response.end();
  return;
}

function sendFile(err, file, response){
  if(err) return sendError(500, err, response);
  response.writeHead(200);
  response.write(file, "binary");
  response.end();
}

function getFile(exists, response, localpath){
  if(!exists) return sendError(404, '404 Not Found', response);
  fs.readFile(localpath, "binary",
   function(err, file){ sendFile(err, file, response);});
}

function getFilename(request, response){
  var urlpath = url.parse(request.url).pathname; // following domain or IP and port
  var localpath = path.join(process.cwd(), urlpath); // if we are at root
  fs.exists(localpath, function(result) { getFile(result, response, localpath)});
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