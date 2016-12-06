var myMesh = {
	init: function (mesh){
		this.mesh = mesh;
		this.edges = this.create_edges();
		this.meshing = null;
		this.vertexConstraint = [];
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