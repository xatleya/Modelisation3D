var gui = new dat.GUI();

var main_menu = function() {
	this.front_view = function(){
		cam_front_view();
	}
	this.side_view = function(){
		cam_side_view();
	}
	this.top_view = function(){
		cam_top_view();
	}
};

function create_main_menu() {
	var m = new main_menu(0);
	gui.add(m,'front_view');
	gui.add(m,'side_view');
	gui.add(m,'top_view');
};