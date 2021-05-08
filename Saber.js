class Saber{
	static Host = 'http://localhost:2222';

	constructor(color){
		
		this.SaberLength = 50;
		this.HandleLength = 15;
		this.color = color;

		this.group = this.makeGroup();
		
		this.vel = this.group.position.clone();
	
		this.group.rotation.x = -0.314;

		scene.add(this.group);

		this.tail = new Tail(this.color);
	}

	update(delta) {
		this.kbControl();
		this.tail.update(this.calcTailPos());
		this.getJoycon(delta);
	}

	getJoycon(delta){
		let group = this.group;
		$.ajax({
			type: 'GET',
			url: Saber.Host,
			success: function (result){
				let gyro = result[0].gyro;
				if(group.position.z + gyro.Z * 20 * delta < 20)
					group.position.x += gyro.Z * 20 * delta;
				
				if(group.position.y + gyro.X * 20 * delta < 20)
					group.position.y += gyro.X * 20 * delta;
				
				if(group.position.y + gyro.X * 20 * delta < 20)
					group.position.y += gyro.X * 20 * delta;

				let rotate = result[0].rotate;
				group.rotation.set(parseFloat(rotate.Y.toFixed(1)) * Math.PI / 180, 0, parseFloat(-rotate.X.toFixed(1)) * Math.PI / 180);
			},
			error: function(xhr, textStatus, thrownError){
				console.log(textStatus);
			}
		})
	}

	kbControl() {
		// z 50
		if (keyboard.pressed("W")) {
			this.group.position.x += 1;
		}
		if (keyboard.pressed("S")) {
			this.group.position.x -= 1;
		}
		if (keyboard.pressed("A")) {
			if(this.group.position.z + 1 < 50)
				this.group.position.z += 1;
		}
		if (keyboard.pressed("D")) {
			if(this.group.position.z - 1 > -50)
				this.group.position.z -= 1;
		}
	}

	makeGroup() {
		let SaberGroup = new THREE.Group();
		SaberGroup.name = 'SaberGroup';
		let Saber = this.makeSaber();
		SaberGroup.add(Saber);
		let Glow = this.makeGlow();
		SaberGroup.add(Glow);
		let Handle = this.makeHandle();
		SaberGroup.add(Handle);

		let DotGroup = this.makeDot(Saber);
		SaberGroup.add(DotGroup);

		return SaberGroup;
	}

	makeSaber() {
		let Saber = new THREE.Mesh(
			new THREE.CylinderGeometry(0.8, 0.8, this.SaberLength, 32),
			new THREE.MeshBasicMaterial({
				color: "white",
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0.9
			})
		);
		Saber.layers.toggle( BLOOM_SCENE );
		Saber.position.y = this.SaberLength / 2;
		
		return Saber;
	}

	makeGlow(){
		let Glow = new THREE.Mesh(
			new THREE.CylinderGeometry(1, 1, this.SaberLength, 32),
			new THREE.MeshBasicMaterial({
				color: this.color,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0.5
			})
		);
		Glow.layers.toggle( BLOOM_SCENE );
		Glow.position.y = this.SaberLength / 2;

		return Glow;
	}

	makeHandle(){
		let Handle = new THREE.Mesh(
			new THREE.CylinderGeometry( 1, 1, this.HandleLength, 32 ),
			new THREE.MeshBasicMaterial({
				color: "black",
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 1
			})
		);
		//Handle.layers.toggle( BLOOM_SCENE );
		Handle.position.y = -this.HandleLength / 2;
		
		return Handle;
	}

	makeDot(Saber) {
		let DotGroup = new THREE.Group();

		this.dotTop = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshBasicMaterial({})
		);
		this.dotBot = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshBasicMaterial({})
		);

		let Top = Saber.position.clone();
		Top.y += this.SaberLength / 2;
		this.dotTop.position.copy(Top);
		this.dotTop.name = 'dotTop';
		this.dotTop.visible = false;
		DotGroup.add(this.dotTop);

		let Bot = Saber.position.clone();
		Bot.y -= this.SaberLength / 2;
		this.dotBot.position.copy(Bot);
		this.dotBot.name = 'dotBot';
		this.dotBot.visible = false;
		DotGroup.add(this.dotBot);

		return DotGroup;
	}

	calcTailPos() {
		// 一個用於取出當前上下兩端的世界座標
		let tmpVec = new THREE.Vector3();
		let needPos = [];
		//上中下
		[this.dotTop, this.group, this.dotBot].forEach((pos) => {
			pos.getWorldPosition(tmpVec);
			needPos.push([tmpVec.x, tmpVec.y, tmpVec.z]);
		});
		return needPos;
	}
	
}