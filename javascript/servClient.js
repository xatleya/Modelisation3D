var tab = [];

//envoie au serveur les fichiers .stl et les contraintes de chaque forme modelisee dans l'application
function exportation() {
	//stop_previous_mode();
	var socket = io.connect('http://localhost:8080');
	for (var i=0; i<objects.length; i++){
		scene.remove(objects[i].mesh);
		var current_mesh = exporter.parse(objects[i].mesh);
		socket.emit('export', {'file' : current_mesh, 'file_name' : i + ".stl"});
		socket.emit('constraint', {'associated_file' : i + ".stl", 'vertices' : objects[i].vertexConstraint, 'faces' : objects[i].faceConstraint});
		socket.emit('conversion', {'name' : i});
		socket.on('load', function (data) {
			load_form(data['name']);
		});
	}
}

//associe a chaque objet MyMesh le maillage recu depuis le serveur
//affiche le maillage et supprime la forme originale de l'affichage ainsi que les arretes associees
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

//appel la fonction exportation
//est appelee au lancement du mode meshing : touche e
function start_meshing_mode(){
	exportation();
}

//pour chaque objet supprime le maillage de l'affichage et affiche la forme originale ainsi que les arretes associees
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




