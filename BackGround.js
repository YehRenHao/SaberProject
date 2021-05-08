class BackGround{
	constructor() {
		
		this.Left = [];
		for(let i = 0, z = 0; i < 3; i++, z -= 5){
			let geo = new THREE.CylinderGeometry(1, 1, 1500, 32);
			let mat = new THREE.MeshBasicMaterial({
				color: "white",
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0
			});
			
			let object = new THREE.Mesh(geo,mat);
			object.position.x = -800;
			object.position.y = -100;
			object.position.z = z;
			object.rotation.x = Math.PI / 24;
			object.layers.toggle( BLOOM_SCENE );

			this.Left.push(object);
			scene.add( object );
		}

		this.Right = [];
		for(let i = 0, z = 0; i < 3; i++, z += 5){
			let geo = new THREE.CylinderGeometry(1, 1, 1500, 32);
			let mat = new THREE.MeshBasicMaterial({
				color: "white",
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0
			});
			
			let object = new THREE.Mesh(geo,mat);
			object.position.x = -800;
			object.position.y = -100;
			object.position.z = z;
			object.rotation.x = -Math.PI / 24;
			object.layers.toggle( BLOOM_SCENE );

			this.Right.push(object);
			scene.add( object );
		}

	}

	setNewColor(color){

		this.Left.forEach(o => {
			o.material.color.set(color)
			o.material.opacity = 1;
		});

		this.Right.forEach(o => {
			o.material.color.set(color)
			o.material.opacity = 1;
		});

	}

	setVisible(){
		this.Left.forEach(o => {
			o.visible = true;
		});

		this.Right.forEach(o => {
			o.visible = true;
		});
	}
	
	setNotVisible(){
		this.Left.forEach(o => {
			o.visible = false;
		});

		this.Right.forEach(o => {
			o.visible = false;
		});
	}
			
	update(delta){
		this.Left.forEach(o => {
			o.material.opacity -= (delta / bpmTime) * 1;
		});

		this.Right.forEach(o => {
			o.material.opacity -= (delta / bpmTime) * 1;
		});
	}
}