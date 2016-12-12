var renderer, camera, scene;	//variables necessaires au rendu 3D
var objects = []; 				//liste d'objets MyMesh créés
var selectedMesh = null;		//objet MyMesh selectionne
var controls;
var raycaster, mouse;			//variable permettant le controle a la souris (deplacement,selection)
var objectControl;
var mode = 77;					//numero du mode dans lequel on se trouve
								//correspond au code de la touche declenchant le mode

init();
render();

//initialisation de la page, creation du rendu et des menus
function init(){
	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById('container').appendChild(renderer.domElement);
	
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.set(0, 50, 1000);
	scene.add(camera);
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.60;
	controls.enableZoom = true;
	
	var helper = new THREE.GridHelper( 800, 40, 0x0000ff, 0x808080 );
	helper.position.x = 0;
	helper.position.y = 0;
	helper.position.z = 0;
	scene.add( helper );

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	create_main_menu();

	document.addEventListener( 'keyup', mode_selection, false );
	objectControl = new THREE.TransformControls( camera, renderer.domElement );

	start_movement_mode();
}

//creation du rendu
function render(){
	requestAnimationFrame(render);
    renderer.render(scene, camera);
}

//changement de mode a l'appui d'une touche en fonction du code de la touche
function mode_selection( event ) {
	switch ( event.keyCode ) {
		case 77: // m
			stop_previous_mode();
			mode = 77;
			start_movement_mode();
			break;
		case 67: // c
			stop_previous_mode();
			mode = 67;
			start_vertex_mode();
			break;
		case 83: // s
			stop_previous_mode();
			mode = 83;
			start_size_mode();
			break;
		case 82: // r
			stop_previous_mode();
			mode = 82;
			start_rotate_mode();
			break;
		case 69: //e
			stop_previous_mode();
			mode = 69;
			start_meshing_mode();
			break;
		default:
			break;
	}
}

//appel la fonction permettant de quitter le mode actuel
function stop_previous_mode(){
		switch (mode){
		case 77:
			stop_movement_mode();
			break;
		case 67:
			stop_vertex_mode();
			break;
		case 83:
			stop_size_mode();
			break;
		case 82:
			stop_rotate_mode();
			break;
		case 69:
			stop_meshing_mode();
			break;
		default:
			break;
	}
}


//set la position de la camera en vue de face
function cam_front_view(){
	camera.position.set(0, 50, 1000);
	camera.lookAt(new THREE.Vector3( 1, 0, 0 ));
}

//set la position de la camera en vue de cote
function cam_side_view(){
	camera.position.set(1000, 50, 0);
	camera.lookAt(new THREE.Vector3( 0, 0, -1 ));
}

//set la position de la camera en vue de haut
function cam_top_view(){
	camera.position.set(0, 1000, 0);
	camera.lookAt(new THREE.Vector3( 0, -1, 0 ));
}

//retourne l'index de l'objet arg dans le tableau tab
function indexOf(arg,tab){
	var i = 0;
	while (i < tab.length && tab[i] !== arg){
		i++;
	}
	if (i == tab.length){
		return -1;
	} else {
		return i;
	}
}

//booleen = vrai si les 3 coordonnees des 2 vecteurs sont egales respectivement
function vector_is_equal(v1,v2){
	return(v1.x == v2.x && v1.y == v2.y && v1.z == v2.z);
}