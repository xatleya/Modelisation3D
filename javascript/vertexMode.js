var vertexSpheres = [];
var selectVertex = -1;
var changeVertexColor;

function start_vertex_mode(){
	document.addEventListener( 'mousedown', on_mouse_down_vertex, false );
	var allVertices = [];
	var vector;
	var position;
	for (var i = objects.length - 1; i >= 0; i--) {
		position = objects[i].position;
		for (var j = objects[i].geometry.vertices.length -1; j >= 0; j--) {
			vector = new THREE.Vector3;
			vector.x = objects[i].geometry.vertices[j].x + position.x;
			vector.y = objects[i].geometry.vertices[j].y + position.y;
			vector.z = objects[i].geometry.vertices[j].z + position.z;
			allVertices.push(vector);
		}
	}
	for (var i = allVertices.length - 1; i >= 0; i--) {
		create_sphere_vertex(allVertices[i]);
	}
	if (allVertices.length != 0) {
		selectVertex = 0;
		red_sphere(selectVertex);
	} else {
		selectVertex = -1;
	}
	create_vertex_menu();
}

function stop_vertex_mode(){
	document.removeEventListener('mousedown', on_mouse_down_vertex, false);
	delete_vertex_menu();
	for (var i = vertexSpheres.length - 1; i >= 0; i--) {
		scene.remove (vertexSpheres[i]);
	}
	vertexSpheres = [];
	selectVertex = -1;
}

function create_vertex_menu(){
	var menu = new vertex_menu();
	changeVertexColor = gui.addColor(menu, 'color');
	changeVertexColor.onChange(function(value){
		color_vertex(value);
	});
}

function delete_vertex_menu(){
	gui.remove(changeVertexColor);
}

function create_sphere_vertex(position){
	var sphere = new THREE.SphereGeometry(5);
	var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
	var mesh = new THREE.Mesh( sphere, material );
	mesh.position.x = position.x;
	mesh.position.y = position.y;
	mesh.position.z = position.z;
	scene.add( mesh );
	vertexSpheres.push(mesh);
}

function on_mouse_down_vertex( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects( vertexSpheres );
	if ( intersects.length > 0 ) {
		var ind = indexOf(intersects[0].object,vertexSpheres);
		if (ind != -1 && ind != selectVertex){
			black_sphere(selectVertex);
			selectVertex = ind;
			red_sphere(selectVertex);
		}
	}
}

function black_sphere(index){
	vertexSpheres[index].material.color = new THREE.Color(0x000000);
}

function red_sphere(index){
	vertexSpheres[index].material.color = new THREE.Color(0xff0000);
}

function color_vertex(c){
	if (selectVertex != -1){
		var s = -1;
		var i = -1;
		while (i < objects.length - 1 && s < selectVertex){
			i++;
			s += objects[i].geometry.vertices.length;
		}
		if (i != -1) {
			var vector;
			var position;
			s = 0;
			position = objects[i].position;
			vector = new THREE.Vector3;
			vector.x = objects[i].geometry.vertices[s].x + position.x;
			vector.y = objects[i].geometry.vertices[s].y + position.y;
			vector.z = objects[i].geometry.vertices[s].z + position.z;
			while (!vector_is_equal(vector , vertexSpheres[selectVertex].position)){
				s++;
				vector.x = objects[i].geometry.vertices[s].x + position.x;
				vector.y = objects[i].geometry.vertices[s].y + position.y;
				vector.z = objects[i].geometry.vertices[s].z + position.z;
			}
			for (var j = objects[i].geometry.faces.length - 1; j >= 0; j--) {
				if (objects[i].geometry.faces[j].a == s){
					objects[i].geometry.faces[j].vertexColors[0].set(c);
				}
				if (objects[i].geometry.faces[j].b == s){
					objects[i].geometry.faces[j].vertexColors[1].set(c);
				}
				if (objects[i].geometry.faces[j].c == s){
					objects[i].geometry.faces[j].vertexColors[2].set(c);
				}
			}
			objects[i].geometry.colorsNeedUpdate = true;
		}
	}
}

var vertex_menu = function() {
	this.color = "#000000";
}