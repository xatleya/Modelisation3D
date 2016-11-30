//variables utilisees pour le menu du mode mouvement
var crcube;
var crcyl;
var delmash;
var changeX;
var changeY;
var changeZ;

var edgesTab = [];
var exporter = new THREE.STLExporter();
var current_mesh;

//initialisation du mode mouvement
function start_movement_mode(){
	attach_translation_to_mesh(selectedMesh);
	document.addEventListener( 'mousedown', on_mouse_down_move, false );
	create_movement_menu();
}

//fonction executee en quittant le mode mouvement
function stop_movement_mode(){
	document.removeEventListener('mousedown', on_mouse_down_move, false);
	objectControl.detach(selectedMesh);
	delete_movement_menu();
}

//creation du menu specifique au mode mouvement
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

//supression du menu specifique au mode mouvement
function delete_movement_menu(){
	gui.remove(crcube);
	gui.remove(crcyl);
	gui.remove(delmesh);
	gui.remove(changeX);
	gui.remove(changeY);
	gui.remove(changeZ);
}

//fonction executee au clic de souris dans le mode mouvement
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

//affiche un repere de fleches sur l'objet selectionnee
//les fleches permettent de deplacer l'objet
function attach_translation_to_mesh(current_mesh){
	objectControl.addEventListener( 'change', render );
	objectControl.addEventListener( 'change', move_edges );
	objectControl.attach(current_mesh);
	scene.add(objectControl);
}

//affiche un repere de fleches sur l'objet selectionnee 
//apres l'avoir supprime sur la forme precedemment selectionne
//les fleches permettent de deplacer l'objet
function arrowChange(){
	if (selectedMesh != null){
		objectControl.detach(selectedMesh);
	}
	selectedMesh = objects[selectShape];
	attach_translation_to_mesh(selectedMesh);
}


function move_edges(){
	edgesTab[selectShape].position.setX(objects[selectShape].position.x);
	edgesTab[selectShape].position.setY(objects[selectShape].position.y);
	edgesTab[selectShape].position.setZ(objects[selectShape].position.z);
}


function create_edges(mesh){
	mesh.material.polygonOffset = true
	mesh.material.polygonOffsetFactor = 1
	mesh.material.polygonOffsetUnits = 1
	var geometry = new THREE.EdgesGeometry( mesh.geometry );
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
	var edges = new THREE.Line( geometry, material, THREE.LineSegments );
	scene.add(edges);
	edgesTab.push(edges);
}


//cree un cube
function create_cube(){
	var cube = new THREE.BoxGeometry(100, 100, 100);
	init_cube_color(cube);
	var boxMaterials = new THREE.MeshBasicMaterial({ vertexColors:THREE.VertexColors });
	var mesh = new THREE.Mesh(cube, boxMaterials);
	create_edges(mesh);
	scene.add(mesh);
	objects.push(mesh);
	selectedMesh = mesh;
	selectShape = objects.length -1;
	attach_translation_to_mesh(mesh);
	//current_mesh = exporter.parse(cube);
	current_mesh = exporter.parse(mesh);
}

//cree un cylindre
function create_cylinder(){
	var cylinder = new THREE.CylinderGeometry(30, 30, 100, 32);
	var boxMaterials = [
		new THREE.MeshBasicMaterial({color:0xFF0000}),
		new THREE.MeshBasicMaterial({color:0x0000FF}),
		new THREE.MeshBasicMaterial({color:0x00FF00})
	];
	var material = new THREE.MeshFaceMaterial(boxMaterials);
	var mesh = new THREE.Mesh(cylinder, material);
	create_edges(mesh);
	scene.add(mesh);
	objects.push(mesh);
	selectedMesh = mesh;
	selectShape = objects.length -1;
	attach_translation_to_mesh(mesh);
	selectedMesh = mesh;
	selectShape = objects.length -1;
}

//supprime un objet
function delete_mesh(){
	if (selectShape >= 0 && selectShape < objects.length){
		objectControl.detach(selectedMesh);
		scene.remove(objects[selectShape]);
		scene.remove(edgesTab[selectShape]);
		objects = supr(selectShape,objects);
		edgesTab = supr(selectShape,edgesTab);
	}
}

//supprime l'objet à l'indice "indice" dans le tableau "tab"
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

//positionne l'objet selectionne a "value" sur l'axe x
function x_position(value){
	objects[selectShape].position.setX(value);
}

//positionne l'objet selectionne a "value" sur l'axe y
function y_position(value){
	objects[selectShape].position.setY(value);
}

//positionne l'objet selectionne a "value" sur l'axe z
function z_position(value){
	objects[selectShape].position.setZ(value);
}

//la couleur du cube est fixee en gris
function init_cube_color(cube){
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 3; j++) {
			cube.faces[i].vertexColors[j] = new THREE.Color("#3e3e3e");
		}
	}
}

//variable utilisee pour la creation du menu specifique au mode mouvemebt
//associe les boutons de creation de cube, de creation de cylindre, et de supression d'objet au fonctions associees
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