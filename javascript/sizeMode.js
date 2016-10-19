var changeLength;
var changeWidth;
var changeHeight;

function start_size_mode(){
	document.addEventListener( 'mousedown', on_mouse_down_size, false );
	create_size_menu();
}

function stop_size_mode(){
	delete_size_menu();
	document.removeEventListener('mousedown', on_mouse_down_size, false);
}

function on_mouse_down_size(){

}

function create_size_menu(){
	var menu = new size_menu();
	changeLength = gui.add(menu, 'length', 0, 100);
	changeWidth = gui.add(menu, 'width', 0, 100);
	changeHeight = gui.add(menu, 'height', 0, 100);
	changeLength.onChange(function(value){
		length_shape(value);
	});
	changeWidth.onChange(function(value){
		width_shape(value);
	});
	changeHeight.onChange(function(value){
		heigth_shape(value);
	});
}

function delete_size_menu(){
	gui.remove(changeLength);
	gui.remove(changeWidth);
	gui.remove(changeHeight);
}

var size_menu = function() {
  this.length = 5;
  this.width = 5;
  this.height = 5;
};

function length_shape(value){
	objects[selectShape].scale.x = value;
}

function width_shape(value){
	objects[selectShape].scale.y = value;
}

function heigth_shape(value){
	objects[selectShape].scale.z = value;
}
/*
function decrease_shape(){
	objects[selectCube].scale.x -= 1;
	objects[selectCube].scale.y -= 1;
	objects[selectCube].scale.z -= 1;
}

function increase_shape(){
	objects[selectCube].scale.x += 1;
	objects[selectCube].scale.y += 1;
	objects[selectCube].scale.z += 1;
}*/