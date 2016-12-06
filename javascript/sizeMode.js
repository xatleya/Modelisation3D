//initialisation du mode taille
function start_size_mode(){
	document.addEventListener( 'mousedown', on_mouse_down_size, false );
	create_size_menu();
}

//fonction executee en quittant le mode taille
function stop_size_mode(){
	delete_size_menu();
	document.removeEventListener('mousedown', on_mouse_down_size, false);
}

//fonction executee au clic de souris dans le mode taille
function on_mouse_down_size(){

}

//creation du menu specifique au mode taille
function create_size_menu(){
	var menu = new size_menu();
	Size = gui.add(menu, 'size');
	Xsize = gui.add(menu, 'x_size');
	Ysize = gui.add(menu, 'y_size');
	Zsize = gui.add(menu, 'z_size');
	Size.onChange(function(value){
	increase_shape(value);
	});
	Xsize.onChange(function(value){
	increase_x_shape(value);
	});
	Ysize.onChange(function(value){
	increase_y_shape(value);
	});
	Zsize.onChange(function(value){
	increase_z_shape(value);
	});
}

//supression du menu specifique au mode taille
function delete_size_menu(){
	gui.remove(Size);
	gui.remove(Xsize);
	gui.remove(Ysize);
	gui.remove(Zsize);
}

//variable utilisee pour la creation du menu specifique au mode taille
var size_menu = function() {
	this.size = 0;
	this.x_size = 0;
	this.y_size = 0;
	this.z_size = 0;
};

function increase_x_shape(value){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].x < 0){
				selectedMesh.mesh.geometry.vertices[j].x -= value;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].x > 0){
				selectedMesh.mesh.geometry.vertices[j].x += value;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function increase_y_shape(value){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].y < 0){
				selectedMesh.mesh.geometry.vertices[j].y -= value;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].y > 0){
				selectedMesh.mesh.geometry.vertices[j].y += value;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function increase_z_shape(value){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].z < 0){
				selectedMesh.mesh.geometry.vertices[j].z -= value;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].z > 0){
				selectedMesh.mesh.geometry.vertices[j].z += value;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function increase_shape(value){
	if (selectShape != -1){
		increase_x_shape(value);
		increase_y_shape(value);
		increase_z_shape(value);
	}
}

function replace_edges(){
	var geometry = new THREE.EdgesGeometry( selectedMesh.mesh.geometry );
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
	var edges = new THREE.Line( geometry, material, THREE.LineSegments );
	scene.remove(selectedMesh.edges)
	selectedMesh.edges = edges;
	scene.add(edges);
	move_edges();
}