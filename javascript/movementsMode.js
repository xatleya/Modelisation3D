function start_movement_mode(){
	attach_translation_to_mesh(selectedMesh);
	document.addEventListener( 'mousedown', on_mouse_down_move, false );
}

function stop_movement_mode(){
	document.removeEventListener('mousedown', on_mouse_down_move, false);
	objectControl.detach(selectedMesh);
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
		selectCube = i;
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
	selectedMesh = objects[selectCube];
	attach_translation_to_mesh(selectedMesh);
}

function create_cube(){
	var cube = new THREE.BoxGeometry(100, 100, 100);
	init_cube_color(cube);
	var boxMaterials = new THREE.MeshBasicMaterial({ vertexColors:THREE.VertexColors });
	var mesh = new THREE.Mesh(cube, boxMaterials);
	
	scene.add(mesh);
	objects.push(mesh);
	add_line(gui);
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

function decrease_shape(){
	objects[selectCube].scale.x -= 1;
	objects[selectCube].scale.y -= 1;
	objects[selectCube].scale.z -= 1;
}

function increase_shape(){
	objects[selectCube].scale.x += 1;
	objects[selectCube].scale.y += 1;
	objects[selectCube].scale.z += 1;
}

function x_position(value){
	objects[selectCube].position.setX(value);
}

function y_position(value){
	objects[selectCube].position.setY(value);
}

function z_position(value){
	objects[selectCube].position.setZ(value);
}

function length_shape(value){
	objects[selectCube].scale.x = value;
}

function width_shape(value){
	objects[selectCube].scale.y = value;
}

function heigth_shape(value){
	objects[selectCube].scale.z = value;
}

function init_cube_color(cube){
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 3; j++) {
			cube.faces[i].vertexColors[j] = new THREE.Color("#000000");
		}
	}
}