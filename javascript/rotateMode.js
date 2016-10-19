function start_rotate_mode(){
	document.addEventListener( 'mousedown', on_mouse_down_rotate, false );
}

function stop_rotate_mode(){
	document.removeEventListener('mousedown', on_mouse_down_rotate, false);
}

function on_mouse_down_rotate(){

}