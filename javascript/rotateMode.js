//initialisation du mode rotation
function start_rotate_mode(){
	document.addEventListener( 'mousedown', on_mouse_down_rotate, false );
}

//fonction executee en quittant le mode rotation
function stop_rotate_mode(){
	document.removeEventListener('mousedown', on_mouse_down_rotate, false);
}

//fonction executee au clic de souris dans le mode rotation
function on_mouse_down_rotate(){

}