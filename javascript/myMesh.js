var myMesh = {
	init: function (mesh){
		this.mesh = mesh;
		this.edges = this.create_edges();
		this.meshing = null;
		this.vertexConstraint = [];
		this.faceConstraint = [];
	},
	
	create_edges: function(){
		this.mesh.material.polygonOffset = true;
		this.mesh.material.polygonOffsetFactor = 1;
		this.mesh.material.polygonOffsetUnits = 1;
		var geometry = new THREE.EdgesGeometry( this.mesh.geometry );
		var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
		var edges = new THREE.Line( geometry, material, THREE.LineSegments );
		scene.add(edges);
		return edges;
	}
};

var myVertex = {
	init: function (index,object){
		this.index = index;
		this.coordx = object.mesh.geometry.vertices[index].x;
		this.coordy = object.mesh.geometry.vertices[index].y;
		this.coordz = object.mesh.geometry.vertices[index].z;
		this.xshift = null;
		this.yshift = null;
		this.zshift = null;
	}
};

var myFace = {
	init: function (index,object){
		this.index = index;
		this.index_a = object.mesh.geometry.faces[index].a
		this.index_b = object.mesh.geometry.faces[index].b
		this.index_c = object.mesh.geometry.faces[index].c
		this.coordx_a = object.mesh.geometry.vertices[this.index_a].x;
		this.coordy_a = object.mesh.geometry.vertices[this.index_a].y;
		this.coordz_a = object.mesh.geometry.vertices[this.index_a].z;
		this.coordx_b = object.mesh.geometry.vertices[this.index_b].x;
		this.coordy_b = object.mesh.geometry.vertices[this.index_b].y;
		this.coordz_b = object.mesh.geometry.vertices[this.index_b].z;
		this.coordx_c = object.mesh.geometry.vertices[this.index_c].x;
		this.coordy_c = object.mesh.geometry.vertices[this.index_c].y;
		this.coordz_c = object.mesh.geometry.vertices[this.index_c].z;
		this.xshift = null;
		this.yshift = null;
		this.zshift = null;
	}
};