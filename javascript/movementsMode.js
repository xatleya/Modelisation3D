var crcube;
var crcyl;
var delmash;
var changeX;
var changeY;
var changeZ;

function start_movement_mode(){
	attach_translation_to_mesh(selectedMesh);
	document.addEventListener( 'mousedown', on_mouse_down_move, false );
	create_movement_menu();
}

function stop_movement_mode(){
	document.removeEventListener('mousedown', on_mouse_down_move, false);
	objectControl.detach(selectedMesh);
	delete_movement_menu();
}

function create_movement_menu(){
	var menu = new movements_menu();
	crcube = gui.add(menu,'cube');
	crcyl = gui.add(menu,'cylinder');
	delmesh = gui.add(menu, 'delete');
	changeX = gui.add(menu, 'posX', -500, 500);
	changeY = gui.add(menu, 'posY', -500, 500);
	changeZ = gui.add(menu, 'posZ', -500, 500);
	changeX.onChange(function(value){
	x_position(value);
	});
	changeY.onChange(function(value){
	y_position(value);
	});
	changeZ.onChange(function(value){
	z_position(value);
	});
}

function delete_movement_menu(){
	gui.remove(crcube);
	gui.remove(crcyl);
	gui.remove(delmesh);
	gui.remove(changeX);
	gui.remove(changeY);
	gui.remove(changeZ);
}

function on_mouse_down_move( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects( objects );
	if ( intersects.length > 0 ) {
		if (selectedMesh != null){
			objectControl.detach(selectedMesh);
		}
		selectedMesh = intersects[0].object;
		var i = 0;
		while (selectedMesh != objects[i] && i < objects.length){
			i++;
		}
		selectShape = i;
		attach_translation_to_mesh(selectedMesh);
	}
}

function attach_translation_to_mesh(current_mesh){
	objectControl.addEventListener( 'change', render );
	objectControl.attach(current_mesh);
	scene.add(objectControl);
}

function arrowChange(){
	if (selectedMesh != null){
		objectControl.detach(selectedMesh);
	}
	selectedMesh = objects[selectShape];
	attach_translation_to_mesh(selectedMesh);
}

function create_cube(){
	var cube = new THREE.BoxGeometry(100, 100, 100);
	init_cube_color(cube);
	var boxMaterials = new THREE.MeshBasicMaterial({ vertexColors:THREE.VertexColors });
	var mesh = new THREE.Mesh(cube, boxMaterials);
	
	scene.add(mesh);
	objects.push(mesh);
	attach_translation_to_mesh(mesh);
	var exporter = new THREE.STLExporter();
}

function create_cylinder(){
	var cylinder = new THREE.CylinderGeometry(30, 30, 100, 32);
	var boxMaterials = [
		new THREE.MeshBasicMaterial({color:0xFF0000}),
		new THREE.MeshBasicMaterial({color:0x0000FF}),
		new THREE.MeshBasicMaterial({color:0x00FF00})
	];
	var material = new THREE.MeshFaceMaterial(boxMaterials);
	var mesh = new THREE.Mesh(cylinder, material);
	scene.add(mesh);
	objects.push(mesh);
	attach_translation_to_mesh(mesh);
	
	var exporter = new THREE.STLExporter();
	console.log(exporter.parse( mesh ));
}

function delete_mesh(){
	if (selectShape >= 0 && selectShape < objects.length){
		objectControl.detach(selectedMesh);
		scene.remove (objects[selectShape]);
		objects = supr(selectShape,objects);
	}
}

function supr(indice,tab){
	var newtab = [];
	for (var i = 0; i < indice; i++) {
		newtab.push(tab[i]);
	}
	for (var i = indice +1; i < tab.length; i++) {
		newtab.push(tab[i]);
	}
	return newtab;
}

function x_position(value){
	objects[selectShape].position.setX(value);
}

function y_position(value){
	objects[selectShape].position.setY(value);
}

function z_position(value){
	objects[selectShape].position.setZ(value);
}

function init_cube_color(cube){
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 3; j++) {
			cube.faces[i].vertexColors[j] = new THREE.Color("#000000");
		}
	}
}

var movements_menu = function(){
	this.posX = 0;
	this.posY = 0;
	this.posZ = 0;
	this.cube = function (){
		create_cube();
	};
	this.cylinder = function (){
		create_cylinder();
	};
	this.delete = function (){
		delete_mesh();
	};
}