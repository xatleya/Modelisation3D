var button = function(shape) {  
  this.cube = function (){
    create_cube();
  };
  this.cylinder = function (){
    create_cylinder();
  };
  this.front_view = function(){
    cam_front_view();
  }
  this.side_view = function(){
    cam_side_view();
  }
  this.top_view = function(){
    cam_top_view();
  }
  this.number = function() {
    selectCube = shape;
    arrowChange();
  }
};

var cubeProperties = function() {
  this.posX = 0;
  this.posY = 0;
  this.posZ = 0;
  this.length = 5;
  this.width = 5;
  this.height = 5;
  this.color0 = "#000000";
  this.color1 = "#000000";
  this.color2 = "#000000";
  this.color3 = "#000000";
  this.color4 = "#000000";
  this.color5 = "#000000";
  this.color6 = "#000000";
  this.color7 = "#000000";  
};

var vertexProperties = function() {
  this.color = "#000000";
}

function create_menu() {
  var bu = new button(0);
  var prop = new cubeProperties();
  var vert = new vertexProperties();
  var v = gui.addFolder('Vertex Properties');
  d.add(bu,'cube');
  d.add(bu,'cylinder');
  d.add(bu,'front_view');
  d.add(bu,'side_view');
  d.add(bu,'top_view');
  var f1 = c.addFolder('Position');
  var f2 = c.addFolder('Size');
  var f3 = c.addFolder('Color');
  var changeX = f1.add(prop, 'posX', -500, 500)
  var changeY = f1.add(prop, 'posY', -500, 500);
  var changeZ = f1.add(prop, 'posZ', -500, 500);
  var changeLength = f2.add(prop, 'length', 0, 100);
  var changeWidth = f2.add(prop, 'width', 0, 100);
  var changeHeight = f2.add(prop, 'height', 0, 100);
  var changeC0 = f3.addColor(prop, 'color0');
  var changeC1 = f3.addColor(prop, 'color1');
  var changeC2 = f3.addColor(prop, 'color2');
  var changeC3 = f3.addColor(prop, 'color3');
  var changeC4 = f3.addColor(prop, 'color4');
  var changeC5 = f3.addColor(prop, 'color5');
  var changeC6 = f3.addColor(prop, 'color6');
  var changeC7 = f3.addColor(prop, 'color7');
  var changeVertexColor = v.addColor(vert, 'color');
  d.open();
  changeX.onChange(function(value){
    x_position(value);
  });
  changeY.onChange(function(value){
    y_position(value);
  });
  changeZ.onChange(function(value){
    z_position(value);
  });
  changeLength.onChange(function(value){
    length_shape(value);
  });
  changeWidth.onChange(function(value){
    width_shape(value);
  });
  changeHeight.onChange(function(value){
    heigth_shape(value);
  });
  changeC0.onChange(function(value){
    color0_cube(value);
  });
  changeC1.onChange(function(value){
    color1_cube(value);
  });
  changeC2.onChange(function(value){
    color2_cube(value);
  });
  changeC3.onChange(function(value){
    color3_cube(value);
  });
  changeC4.onChange(function(value){
    color4_cube(value);
  });
  changeC5.onChange(function(value){
    color5_cube(value);
  });
  changeC6.onChange(function(value){
    color6_cube(value);
  });
  changeC7.onChange(function(value){
    color7_cube(value);
  });
  changeVertexColor.onChange(function(value){
    color_vertex(value);
  });
};

function add_line() {
  var text = new button(counter);
  counter++;
  o.add(text, 'number');
}