function exportation() {
	var socket = io.connect('http://localhost:8080');
	//console.log(current_mesh);
	socket.emit('export', {'file' : current_mesh});
	socket.emit('conversion');
	
}


