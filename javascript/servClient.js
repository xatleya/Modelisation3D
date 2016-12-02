function exportation() {
	var socket = io.connect('http://localhost:8080');
	var current_mesh = exporter.parse(selectedMesh.mesh);
	socket.emit('export', {'file' : current_mesh});
	socket.emit('conversion');
	socket.on('load', function () {
		load_form();
	});
}

function load_form(){
	var loader = new THREE.STLLoader();
	loader.load( 'mesh.stl', function ( geometry ) {
		var material = new THREE.MeshPhongMaterial({ wireframe : true });
		var mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );
		var m = Object.create(myMesh);
		m.init(mesh);
		objects.push(m);
	});
}


