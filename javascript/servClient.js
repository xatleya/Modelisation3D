var tab = [];

function exportation() {
	//stop_previous_mode();
	var socket = io.connect('http://localhost:8087');
	for (var i=0; i<objects.length; i++){
		scene.remove(objects[i].mesh);
		var current_mesh = exporter.parse(objects[i].mesh);
		socket.emit('export', {'file' : current_mesh, 'file_name' : i + ".stl"});
		//socket.emit('constraint', {'arrayName' : "Array" + i, 'array' : objects[i].vertexConstraint});
		socket.emit('conversion', {'name' : i});
		socket.on('load', function (data) {
			load_form(data['name']);
		});
	}
}

function load_form(name){
	var loader = new THREE.STLLoader();
	loader.load( name + '.stl', function ( geometry ) {
		var material = new THREE.MeshPhongMaterial({ wireframe : true });
		var mesh = new THREE.Mesh( geometry, material );
		objects[name].meshing = mesh;
		scene.remove(objects[name].mesh);
		scene.remove(objects[name].edges);
		scene.add(objects[name].meshing);
		tab.push(mesh);
	});
}

function start_meshing_mode(){
	exportation();
}

function stop_meshing_mode(){
	for(var i=0; i<objects.length; i++){
		scene.remove(objects[i].meshing)
		scene.add(objects[i].mesh);
		scene.add(objects[i].edges);
	}
	for(var i=0; i<tab.length; i++){
		scene.remove(tab[i]);
	}
}




