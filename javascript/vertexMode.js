var vertexSpheres = [];			//tableau contenant une sphere par sommet d'objet
var selectVertex = [];			//indice de la sphere selectionnee dans le tableau "vertexSpheres"
var changeVertexColor;			//variable utilisee pour le menu du mode contrainte
var xshift;
var yshift;
var zshift;

//initialisation du mode contrainte
//une sphere est creee a chaque sommet d'objet
//on selectionne un sommet en cliquant sur la sphere correspondante
function start_vertex_mode(){
	document.addEventListener( 'mousedown', on_mouse_down_vertex, false );
	var allVertices = [];
	var vector;
	var position;
	for (var i = objects.length - 1; i >= 0; i--) {
		position = objects[i].mesh.position;
		for (var j = objects[i].mesh.geometry.vertices.length -1; j >= 0; j--) {
			vector = new THREE.Vector3;
			vector.x = objects[i].mesh.geometry.vertices[j].x + position.x;
			vector.y = objects[i].mesh.geometry.vertices[j].y + position.y;
			vector.z = objects[i].mesh.geometry.vertices[j].z + position.z;
			allVertices.push(vector);
		}
	}
	for (var i = allVertices.length - 1; i >= 0; i--) {
		create_sphere_vertex(allVertices[i]);
	}
	create_vertex_menu();
}

//fonction executee en quittant le mode contrainte
function stop_vertex_mode(){
	document.removeEventListener('mousedown', on_mouse_down_vertex, false);
	delete_vertex_menu();
	for (var i = vertexSpheres.length - 1; i >= 0; i--) {
		scene.remove (vertexSpheres[i]);
	}
	vertexSpheres = [];
	selectVertex = [];
}

//creation du menu specifique au mode contrainte
function create_vertex_menu(){
	var menu = new vertex_menu();
	changeVertexColor = gui.addColor(menu, 'color');
	changeVertexColor.onChange(function(value){
		color_vertex(value);
	});
	xshift = gui.add(menu, 'x_shifting');
	yshift = gui.add(menu, 'y_shifting');
	zshift = gui.add(menu, 'z_shifting');
	xshift.onChange(function(value){
	add_x_shift(value);
	});
	yshift.onChange(function(value){
	add_y_shift(value);
	});
	zshift.onChange(function(value){
	add_z_shift(value);
	});
}

//supression du menu specifique au mode contrainte
function delete_vertex_menu(){
	gui.remove(changeVertexColor);
	gui.remove(xshift);
	gui.remove(yshift);
	gui.remove(zshift);
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

//fonction executee au clic de souris dans le mode contrainte
function on_mouse_down_vertex( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects( vertexSpheres );
	if ( intersects.length > 0 ) {
		var ind = indexOf(intersects[0].object,vertexSpheres);
		if(event.ctrlKey){
			if (ind != -1 && selectVertex.indexOf(ind) < 0){
				selectVertex.push(ind);
				red_sphere([ind]);
			}
		}
		else {
			if (ind != -1){
				black_sphere(selectVertex);
				selectVertex = [ind];
				red_sphere(selectVertex);
			}
		}
	}
}

//colore en noir la sphere situe a "index" dans le tableau "vertexSpheres"
function black_sphere(indextab){
	for (var index = indextab.length - 1; index >= 0; index--) {
		vertexSpheres[indextab[index]].material.color = new THREE.Color(0x000000);
	}
}

//colore en rouge la sphere situe a "index" dans le tableau "vertexSpheres"
function red_sphere(indextab){
	for (var index = indextab.length - 1; index >= 0; index--) {
		vertexSpheres[indextab[index]].material.color = new THREE.Color(0xff0000);
	}
}

//colore en couleur "c" le sommet correspondant a la sphere selectionnee
//Fonctionne sur un cube, a travailler sur les autres formes
function color_vertex(c){
	for (var k = selectVertex.length - 1; k >= 0; k--) {
		var s = -1;
		var i = -1;
		while (i < objects.length - 1 && s < selectVertex[k]){
			i++;
			s += objects[i].mesh.geometry.vertices.length;
		}
		if (i != -1) {
			var vector;
			var position;
			s = 0;
			position = objects[i].mesh.position;
			vector = new THREE.Vector3;
			vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
			vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
			vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			while (!vector_is_equal(vector , vertexSpheres[selectVertex[k]].position)){
				s++;
				vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
				vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
				vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			}
			for (var j = objects[i].mesh.geometry.faces.length - 1; j >= 0; j--) {
				if (objects[i].mesh.geometry.faces[j].a == s){
					objects[i].mesh.geometry.faces[j].vertexColors[0].set(c);
				}
				if (objects[i].mesh.geometry.faces[j].b == s){
					objects[i].mesh.geometry.faces[j].vertexColors[1].set(c);
				}
				if (objects[i].mesh.geometry.faces[j].c == s){
					objects[i].mesh.geometry.faces[j].vertexColors[2].set(c);
				}
			}
			objects[i].mesh.geometry.colorsNeedUpdate = true;
		}
	}
}

function add_x_shift(value){
	for (var k = selectVertex.length - 1; k >= 0; k--) {
		var s = -1;
		var i = -1;
		while (i < objects.length - 1 && s < selectVertex[k]){
			i++;
			s += objects[i].mesh.geometry.vertices.length;
		}
		if (i != -1) {
			var vector;
			var position;
			s = 0;
			position = objects[i].mesh.position;
			vector = new THREE.Vector3;
			vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
			vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
			vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			while (!vector_is_equal(vector , vertexSpheres[selectVertex[k]].position)){
				s++;
				vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
				vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
				vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			}
			if (objects[i].vertexConstraint[s] === undefined){
				var v = Object.create(myVertex);
				v.init(s,objects[i]);
				objects[i].vertexConstraint[s] = v;
			}
			objects[i].vertexConstraint[s].xshift = value;
		}
	}
}

function add_y_shift(value){
	for (var k = selectVertex.length - 1; k >= 0; k--) {
		var s = -1;
		var i = -1;
		while (i < objects.length - 1 && s < selectVertex[k]){
			i++;
			s += objects[i].mesh.geometry.vertices.length;
		}
		if (i != -1) {
			var vector;
			var position;
			s = 0;
			position = objects[i].mesh.position;
			vector = new THREE.Vector3;
			vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
			vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
			vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			while (!vector_is_equal(vector , vertexSpheres[selectVertex[k]].position)){
				s++;
				vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
				vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
				vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			}
			if (objects[i].vertexConstraint[s] === undefined){
				var v = Object.create(myVertex);
				v.init(s,objects[i]);
				objects[i].vertexConstraint[s] = v;
			}
			objects[i].vertexConstraint[s].yshift = value;
		}
	}
}

function add_z_shift(value){
	for (var k = selectVertex.length - 1; k >= 0; k--) {
		var s = -1;
		var i = -1;
		while (i < objects.length - 1 && s < selectVertex[k]){
			i++;
			s += objects[i].mesh.geometry.vertices.length;
		}
		if (i != -1) {
			var vector;
			var position;
			s = 0;
			position = objects[i].mesh.position;
			vector = new THREE.Vector3;
			vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
			vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
			vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			while (!vector_is_equal(vector , vertexSpheres[selectVertex[k]].position)){
				s++;
				vector.x = objects[i].mesh.geometry.vertices[s].x + position.x;
				vector.y = objects[i].mesh.geometry.vertices[s].y + position.y;
				vector.z = objects[i].mesh.geometry.vertices[s].z + position.z;
			}
			if (objects[i].vertexConstraint[s] === undefined){
				var v = Object.create(myVertex);
				v.init(s,objects[i]);
				objects[i].vertexConstraint[s] = v;
			}
			objects[i].vertexConstraint[s].zshift = value;
		}
	}
}
//variable utilisee pour la creation du menu specifique au mode contrainte
var vertex_menu = function() {
	this.color = "#000000";
	this.x_shifting = 0;
	this.y_shifting = 0;
	this.z_shifting = 0;
}