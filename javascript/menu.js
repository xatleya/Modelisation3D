var gui = new dat.GUI(); 		//variable menu

//variable utilisee pour la creation du menu principal
//association des 3 boutons de position de camera aux fonctions associees
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

//creation du menu de base avec trois boutons pour la position de la camera
function create_main_menu() {
	var m = new main_menu(0);
	gui.add(m,'front_view');
	gui.add(m,'side_view');
	gui.add(m,'top_view');
};