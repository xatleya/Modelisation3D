//variables utilisees pour le menu du mode mouvement
var crcube;
var crcyl;
var delmash;
var changeX;
var changeY;
var changeZ;

var exporter = new THREE.STLExporter();		// variable utilisee pour creer un .stl

//initialisation du mode mouvement : affichage de fleches permettant de dplacer l'objet selectionne
//creation du menu specifique au mode
function start_movement_mode(){
	if(selectedMesh != null){
		attach_translation_to_mesh(selectedMesh.mesh);
	}
	document.addEventListener( 'mousedown', on_mouse_down_move, false );
	create_movement_menu();
}

//fonction executee en quittant le mode mouvement : supression des fleches
//suppression du menu specifique au mode
function stop_movement_mode(){
	document.removeEventListener('mousedown', on_mouse_down_move, false);
	objectControl.detach(selectedMesh.mesh);
	delete_movement_menu();
}

//creation du menu specifique au mode mouvement 
//boutons de creation de cubes et cylindres 
//sliders permettants de deplacer la forme selectionnee selon les 3 axes
function create_movement_menu(){
	var menu = new movements_menu();
	crcube = gui.add(menu,'cube');
	crcyl = gui.add(menu,'cylinder');
	crcone = gui.add(menu, 'cone');
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
	gui.remove(crcone);
	gui.remove(delmesh);
	gui.remove(changeX);
	gui.remove(changeY);
	gui.remove(changeZ);
}

//fonction executee au clic de souris dans le mode mouvement
//selection d'un objet, affichages des fleches de deplacement sur cet objet
function on_mouse_down_move( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var meshes = [];
	for (var i=0; i<objects.length;i++){
		meshes.push(objects[i].mesh);
	}
	var intersects = raycaster.intersectObjects( meshes );
	if ( intersects.length > 0 ) {
		if (selectedMesh != null){
			objectControl.detach(selectedMesh.mesh);
		}
		newSelectedMesh = intersects[0].object;
		var i = 0;
		while (newSelectedMesh != meshes[i] && i < objects.length){
			i++;
		}
		selectedMesh = objects[i];
		//selectShape = i;
		attach_translation_to_mesh(selectedMesh.mesh);
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
		objectControl.detach(selectedMesh.mesh);
	}
	selectedMesh = objects[selectShape];
	attach_translation_to_mesh(selectedMesh.mesh);
}


//Deplace les arretes blanches d'un objet sur la position de cet objet
function move_edges(){
	if(selectedMesh.edges != null){
		selectedMesh.edges.position.setX(selectedMesh.mesh.position.x);
		selectedMesh.edges.position.setY(selectedMesh.mesh.position.y);
		selectedMesh.edges.position.setZ(selectedMesh.mesh.position.z);
	}
}


//cree un cube de la classe MyMesh avec des arretes blanches permettants une meilleure visualisation
function create_cube(){
	var cube = new THREE.BoxGeometry(200, 200, 200);
	init_cube_color(cube);
	var boxMaterials = new THREE.MeshBasicMaterial({ vertexColors:THREE.VertexColors });
	var mesh = new THREE.Mesh(cube, boxMaterials);
	scene.add(mesh);
	var m = Object.create(myMesh);
	m.init(mesh);
	objects.push(m);
	selectedMesh = m;
	attach_translation_to_mesh(m.mesh);
}

//cree un cylindre de la classe MyMesh avec des arretes blanches permettants une meilleure visualisation
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
	var m = Object.create(myMesh);
	m.init(mesh);
	objects.push(m);
	selectedMesh = m;
	attach_translation_to_mesh(m.mesh);
}

//cree un cone
function create_cone(){
	var cone = new THREE.ConeGeometry( 105, 120, 8 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var mesh = new THREE.Mesh(cone, material);
	scene.add(mesh);
	var m = Object.create(myMesh);
	m.init(mesh);
	objects.push(m);
	selectedMesh = m;
	attach_translation_to_mesh(m.mesh);
}

//supprime l'objet selectionne
function delete_mesh(){
	if (selectedMesh != null){
		objectControl.detach(selectedMesh.mesh);
		scene.remove(selectedMesh.mesh);
		scene.remove(selectedMesh.edges);
		objects = removeMesh(selectedMesh,objects);
	}
}

//supprime l'objet à l'indice "indice" dans le tableau "tab"
function removeMesh(current,tab){
	var newtab = [];
	for (var i = 0; i < tab.length; i++) {
		if(current !== tab[i]) {
			newtab.push(tab[i]);
		}
	}
	return newtab;
}

//positionne l'objet selectionne a "value" sur l'axe x
function x_position(value){
	selectedMesh.mesh.position.setX(value);
	selectedMesh.edges.position.setX(value);
}

//positionne l'objet selectionne a "value" sur l'axe y
function y_position(value){
	selectedMesh.mesh.position.setY(value);
	selectedMesh.edges.position.setY(value);
}

//positionne l'objet selectionne a "value" sur l'axe z
function z_position(value){
	selectedMesh.mesh.position.setZ(value);
	selectedMesh.edges.position.setZ(value);
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
	this.cone = function (){
		create_cone();
	};
	this.delete = function (){
		delete_mesh();
	};
}