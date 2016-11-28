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
    socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
        var Name = data['Name'];
        Files[Name] = {  //Create a new Entry in The Files Variable
            FileSize : data['Size'],
            Data     : "",
            Downloaded : 0
        }
        var Place = 0;
        try{
            var Stat = fs.statSync('Temp/' +  Name);	//check if a file exists
            if(Stat.isFile())	//if the file exists
            {
                Files[Name]['Downloaded'] = Stat.size;	//set downloaded size
                Place = Stat.size / 524288;
            }
        }
        catch(er){} //It's a New File, we do nothing !
        fs.open("Temp/" + Name, "a", 0755, function(err, fd){	//open file to append (path / flag / mode (permissions and sticky bits) / callback), create if don't exists
            if(err)	//if error
            {
                console.log(err);	//print error
            }
            else	//if it works
            {
                Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
                socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
            }
        });
	});
	
	socket.on('Upload', function (data){
        var Name = data['Name'];
        Files[Name]['Downloaded'] += data['Data'].length;
        Files[Name]['Data'] += data['Data'];
        if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
        {
            fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){	//write data in handler
                
            });
        }
		//copy file inp in out and delete inp
		var inp = fs.createReadStream("Temp/" + Name);
		var out = fs.createWriteStream("Mesh/" + Name);
		inp.pipe(out);
        inp.on("end", function() {
			fs.unlink("Temp/" + Name, function () { //This Deletes The Temporary File
				//Moving File Completed
			});
		});
    });
});