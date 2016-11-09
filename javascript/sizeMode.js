var increaseSize;
var decreaseSize;

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
	increaseSize = gui.add(menu, 'increase_size');
	decreaseSize = gui.add(menu, 'decrease_size');
}

//supression du menu specifique au mode taille
function delete_size_menu(){
	gui.remove(increaseSize);
	gui.remove(decreaseSize);
}

//variable utilisee pour la creation du menu specifique au mode taille
var size_menu = function() {
	this.increase_size = function(){
		increase_shape();
	}
	this.decrease_size= function(){
		decrease_shape();
	}
};

function increase_shape(){
	if (selectShape != -1){
		for (var j = objects[selectShape].geometry.vertices.length - 1; j >= 0; j--){
			if (objects[selectShape].geometry.vertices[j].x < 0){
				objects[selectShape].geometry.vertices[j].x -= 1;
			}
			else if (objects[selectShape].geometry.vertices[j].x > 0){
				objects[selectShape].geometry.vertices[j].x += 1;
			}
			if (objects[selectShape].geometry.vertices[j].y < 0){
				objects[selectShape].geometry.vertices[j].y -= 1;
			}
			else if (objects[selectShape].geometry.vertices[j].y > 0){
				objects[selectShape].geometry.vertices[j].y += 1;
			}
			if (objects[selectShape].geometry.vertices[j].z < 0){
				objects[selectShape].geometry.vertices[j].z -= 1;
			}
			else if (objects[selectShape].geometry.vertices[j].z > 0){
				objects[selectShape].geometry.vertices[j].z += 1;
			}
		}
		objects[selectShape].geometry.verticesNeedUpdate = true;
	}
}

function decrease_shape(){
	if (selectShape != -1){
		for (var j = objects[selectShape].geometry.vertices.length - 1; j >= 0; j--){
			if (objects[selectShape].geometry.vertices[j].x < 0){
				objects[selectShape].geometry.vertices[j].x += 1;
			}
			else if (objects[selectShape].geometry.vertices[j].x > 0){
				objects[selectShape].geometry.vertices[j].x -= 1;
			}
			if (objects[selectShape].geometry.vertices[j].y < 0){
				objects[selectShape].geometry.vertices[j].y += 1;
			}
			else if (objects[selectShape].geometry.vertices[j].y > 0){
				objects[selectShape].geometry.vertices[j].y -= 1;
			}
			if (objects[selectShape].geometry.vertices[j].z < 0){
				objects[selectShape].geometry.vertices[j].z += 1;
			}
			else if (objects[selectShape].geometry.vertices[j].z > 0){
				objects[selectShape].geometry.vertices[j].z -= 1;
			}
		}
		objects[selectShape].geometry.verticesNeedUpdate = true;
	}
}