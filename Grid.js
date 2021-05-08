class Grid{
	constructor(){

		this.Array = [];

		let stickGeo = new THREE.CylinderGeometry( 1, 1, 80, 32 );
		let stickMat = new THREE.MeshBasicMaterial( {color: "red"} );
		
		this.stick = new THREE.Mesh( stickGeo, stickMat );
		this.stick.position.y = -2;
		this.stick.rotation.x = Math.PI / 2;
		scene.add( this.stick );

		this.initJson();
	}

	initJson() {
		if (myData != "undefined") {
			for (let i = 0; i < myData.notes.length; i++) {
				this.createNewBall(myData.notes[i].pos, myData.notes[i].term, myData.notes[i].type);
			}
			for (let i = 0; i < this.Array.length; i++){
				this.Array[i].group.position.x += ((audio.audio.currentTime) / bpmTime) * distance;
			}
		}
	}

	createNewBall(idx, term = undefined, type = undefined) {
		//如果設了offset之後，term小於0就不給跑
		if (term < 0) return;
		for (let i = 0; i < this.Array.length; i++)
			if (this.Array[i].term == term && this.Array[i].pos == idx)
				return;

		//生成新的球
		let newSphere = new Ball({
			pos: idx,
			term: term,
			type: type
		});
		this.Array.push(newSphere);
	}

	update(delta){
		let move_delta = (delta / bpmTime) * distance;
		for (let i = 0; i < this.Array.length; i++){
			this.Array[i].update(delta, move_delta);
			this.Array[i].collision(pointTop, pointBot);
		}
	}
}