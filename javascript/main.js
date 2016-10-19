var renderer, camera, scene;
var objects = [];
var selectedMesh;
var controls;
var raycaster, mouse;
var objectControl;
var counter = 0;
var selectCube = 0;
var stats;
var mode = 77;

init();
render();

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

	document.addEventListener( 'keydown', mode_selection, false );
	objectControl = new THREE.TransformControls( camera, renderer.domElement );

	start_movement_mode();
}

function render(){
	requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function mode_selection( event ) {
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
		default:
			break;
	}
	switch ( event.keyCode ) {
		case 77: // m
			mode = 77;
			start_movement_mode();
			break;
		case 67: // c
			mode = 67;
			start_vertex_mode();
			break;
		case 83: // s
			mode = 83;
			start_size_mode();
			break;
		case 82: // r
			mode = 82;
			start_rotate_mode();
			break;
		default:
			break;
	}
}

function export_in_file(){
	var exporter = new THREE.STLExporter();
	console.log(exporter.parse( mesh ));
	var blob = new Blob([exporter.parse(mesh)], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "data/export.stl");
}

function cam_front_view(){
	camera.position.set(0, 50, 1000);
	camera.lookAt(new THREE.Vector3( 1, 0, 0 ));
}

function cam_side_view(){
	camera.position.set(1000, 50, 0);
	camera.lookAt(new THREE.Vector3( 0, 0, -1 ));
}

function cam_top_view(){
	camera.position.set(0, 1000, 0);
	camera.lookAt(new THREE.Vector3( 0, -1, 0 ));
}

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

function vector_is_equal(v1,v2){
	return(v1.x == v2.x && v1.y == v2.y && v1.z == v2.z);
}