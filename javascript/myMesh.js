var myMesh = {
	init: function (mesh){
		this.mesh = mesh;
		//this.edges = this.create_edges();
		this.edges = null;
	},
	
	create_edges: function(){
		this.mesh.material.polygonOffset = true;
		this.mesh.material.polygonOffsetFactor = 1;
		this.mesh.material.polygonOffsetUnits = 1;
		var geometry = new THREE.EdgesGeometry( this.mesh.geometry );
		var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
		var edges = new THREE.Line( geometry, material, THREE.LineSegments );
		scene.add(edges);
		this.edges = edges;
	}
};