http = require("http"),  
path = require("path"),  
url = require("url"),  
fs = require("fs");  
exec = require('child_process').exec;
util = require('util');


function sendError(errCode, errString, response){
    response.writeHeader(errCode, {"Content-Type": "text/plain"});  
    response.write(errString + "\n");  
    response.end(); 
    return; 
}

function sendFile(err, file, response){  
  if(err) return sendError(500, err, response);
  response.writeHeader(200);  
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

var server = http.createServer(getFilename);
server.listen(8087);  
console.log("Server available...");  
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('export', function (data) { 
		console.log(data['file']);
		try{
			//var file_name = "mesh.stl"
			var file_name = data['file_name'];
			var Stat = fs.statSync('Temp/' + file_name);	//check if a file exists
			if(Stat.isFile()){	//if the file exists
			
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
		
    socket.on('constraint', function (socket){
    	console.log(socket);
    });

	socket.on('conversion', function (data){
		var name = data['name'];
		var cmd = 'py Python/STL_to_GEO.py Temp/' + name + '.stl';
		exec(cmd, function(error, stdout, stderr) {
			var cmd = 'gmsh en ' + name + '.geo -3 -format stl';
			exec(cmd, function(error, stdout, stderr) {
				socket.emit('load', {'name' : name});
			});
		});
	});
});