var increaseXsize;
var increaseYsize;
var increaseZsize;
var decreaseXsize;
var decreaseYsize;
var decreaseZsize;

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
	increaseXsize = gui.add(menu, 'increase_x_size');
	increaseYsize = gui.add(menu, 'increase_y_size');
	increaseZsize = gui.add(menu, 'increase_z_size');
	decreaseXsize = gui.add(menu, 'decrease_x_size');
	decreaseYsize = gui.add(menu, 'decrease_y_size');
	decreaseZsize = gui.add(menu, 'decrease_z_size');
}

//supression du menu specifique au mode taille
function delete_size_menu(){
	gui.remove(increaseXsize);
	gui.remove(increaseYsize);
	gui.remove(increaseZsize);
	gui.remove(decreaseXsize);
	gui.remove(decreaseYsize);
	gui.remove(decreaseZsize);
}

//variable utilisee pour la creation du menu specifique au mode taille
var size_menu = function() {
	this.increase_x_size = function(){
		increase_x_shape();
	}
	this.increase_y_size = function(){
		increase_y_shape();
	}
	this.increase_z_size = function(){
		increase_z_shape();
	}
	this.decrease_x_size = function(){
		decrease_x_shape();
	}
	this.decrease_y_size = function(){
		decrease_y_shape();
	}
	this.decrease_z_size = function(){
		decrease_z_shape();
	}
};

function increase_x_shape(){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].x < 0){
				selectedMesh.mesh.geometry.vertices[j].x -= 1;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].x > 0){
				selectedMesh.mesh.geometry.vertices[j].x += 1;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function increase_y_shape(){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].y < 0){
				selectedMesh.mesh.geometry.vertices[j].y -= 1;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].y > 0){
				selectedMesh.mesh.geometry.vertices[j].y += 1;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function increase_z_shape(){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].z < 0){
				selectedMesh.mesh.geometry.vertices[j].z -= 1;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].z > 0){
				selectedMesh.mesh.geometry.vertices[j].z += 1;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function decrease_x_shape(){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].x < 0){
				selectedMesh.mesh.geometry.vertices[j].x += 1;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].x > 0){
				selectedMesh.mesh.geometry.vertices[j].x -= 1;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function decrease_y_shape(){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].y < 0){
				selectedMesh.mesh.geometry.vertices[j].y += 1;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].y > 0){
				selectedMesh.mesh.geometry.vertices[j].y -= 1;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
	}
}

function decrease_z_shape(){
	if (selectedMesh != null){
		for (var j = selectedMesh.mesh.geometry.vertices.length - 1; j >= 0; j--){
			if (selectedMesh.mesh.geometry.vertices[j].z < 0){
				selectedMesh.mesh.geometry.vertices[j].z += 1;
			}
			else if (selectedMesh.mesh.geometry.vertices[j].z > 0){
				selectedMesh.mesh.geometry.vertices[j].z -= 1;
			}
		}
		selectedMesh.mesh.geometry.verticesNeedUpdate = true;
		replace_edges();
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