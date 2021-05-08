class Ball{
	constructor(dict){

		this.pos = dict.pos;
		this.term = dict.term;
		this.type = dict.type;
		
		this.SaberLength = 50;
		this.radius = 5;
		
		this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);

		if (this.type == NoteType.normal) {
			this.material = new THREE.MeshBasicMaterial({
				map: watermelon,
				transparent: true,
			})
		} else {
			let faceVertexUvs = this.geometry.faceVertexUvs[0];
			for (let i = 0; i < faceVertexUvs.length; i++) {
				let uvs = faceVertexUvs[i];
				let face = this.geometry.faces[i];
				for (let j = 0; j < 3; j++) {
					uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
					uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
				}
			}
			this.material = new THREE.MeshBasicMaterial({
				map: nuclear,
				transparent: true,
			});
		}
		
		this.group = this.makeGroup();
		let i = Math.floor(this.pos / 3), j = this.pos % 3;
		this.group.position.set(-this.term * distance, gap * 2.5 - i * gap, j * gap - gap);

		scene.add(this.group);
		
		this.Status = BombStatus.未碰撞
		this.points = [];
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	
	makeGroup() {
		
		let SphereGroup = new THREE.Group();
		SphereGroup.name = 'SphereGroup';

		this.object = new THREE.Mesh(
			this.geometry,
			this.material
		);
		//this.object.layers.toggle( BLOOM_SCENE );
		if (this.type != NoteType.normal) {
			this.object.rotation.y = Math.PI / 2;
		}
		SphereGroup.add(this.object);

		return SphereGroup;
	}

	collision(pointTop, pointBot) {
		let point = new THREE.Vector3();
		point = this.group.position.clone();

		let line = pointTop.clone().sub(pointBot.clone());
		let line2 = point.clone().sub(pointTop.clone());
		let projectOnLine = line2.projectOnVector(line);
		let closestPoint = pointTop.clone().add(projectOnLine.clone());

		let DistanceToSaber = closestPoint.distanceTo(this.group.position);
		let DistanceToTop = closestPoint.distanceTo(pointTop);
		let DistanceToBot = closestPoint.distanceTo(pointBot);

		if (DistanceToTop < this.SaberLength && DistanceToBot < this.SaberLength) {
			if (DistanceToSaber <= this.radius && this.Status == BombStatus.未碰撞) {
				HitSound.play();

				ComboCount += 1;
				$("#Combo").text(ComboCount);

				if(Math.abs(closestPoint.x) < this.radius){
 					ScoreCount += 100;
				}
				else if(Math.abs(closestPoint.x) < this.radius * 1.5){
					ScoreCount += 50;
				}
				else{
					ScoreCount -= 50;
				}
				$("#Score").text(ScoreCount);

				//backGround.setNewColor(this.color);
				this.Status = BombStatus.碰撞中;
				this.points[0] = this.group.worldToLocal(closestPoint);
				//再多加入一個光劍頂點位置轉到球的座標的點
				this.points[2] = this.group.worldToLocal(pointTop.clone());
			}
			if (DistanceToSaber >= this.radius && this.Status == BombStatus.碰撞中) {
				this.Status = BombStatus.碰撞完;
				this.points[1] = this.group.worldToLocal(closestPoint);

				
				let v1 = this.points[1].clone().sub(this.points[0]);
				let v2 = this.points[2].clone().sub(this.points[0]);
				this.vel = new THREE.Vector3().crossVectors(v1, v2).normalize();

				this.ve2 = this.vel.clone().multiplyScalar(-1);
			}
			if (this.Status == BombStatus.碰撞完) {
				this.Status = BombStatus.爆炸中;
				this.group.remove(this.object);
				this.clip();
			}
		}
	}

	clip() {
		//計算要拆分thetaLength
		let angle = this.points[0].angleTo(this.points[1]);
		
		//console.log(this.points[0].clone())

		//第1 part
		let SpherePart1 = new THREE.Mesh(
			// radius, widthSegments, heightSegments, phiStart, phiLength
			// thetaStart, thetaLength
			new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2,
				0,
				angle / 2
			),
			this.material
		);
		
		//第2 part
		let SpherePart2 = new THREE.Mesh(
			// radius, widthSegments, heightSegments, phiStart, phiLength
			// thetaStart, thetaLength
			new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2,
				angle / 2,
				(2 * Math.PI - angle) / 2
			),
			this.material
		);

		//算法線向量
		let v1 = this.points[1].clone().sub(this.points[0]);
		let v2 = this.points[2].clone().sub(this.points[0]);
		let rotVec = new THREE.Vector3().crossVectors(v1, v2).normalize();
		let reverseRot = rotVec.clone().multiplyScalar(-1);
		if (reverseRot.distanceTo(this.points[2]) < rotVec.distanceTo(this.points[2]))
			rotVec = reverseRot;

		let yAxis = new THREE.Vector3(0, 1, 0);
		let newAxis = new THREE.Vector3();
		newAxis.crossVectors(yAxis, rotVec).normalize();
		
		let rotateAngle = yAxis.angleTo(rotVec);
		//console.log(newAxis);
		//console.log(rotateAngle);
		SpherePart1.rotateOnWorldAxis(newAxis, rotateAngle);
		SpherePart2.rotateOnWorldAxis(newAxis, rotateAngle);

		this.group.add(SpherePart1);
		this.group.add(SpherePart2);
		
		this.pos = new THREE.Vector3(0, 0, 0);
		this.vel = new THREE.Vector3(0, -50, 20);
		this.force = new THREE.Vector3(0, 0, 0);

		this.pos2 = new THREE.Vector3(0, 0, 0);
		this.vel2 = new THREE.Vector3(0, 50, 20);
		this.force2 = new THREE.Vector3(0, 0, 0);
	}
	update(delta, move_delta){
		if(this.Status != BombStatus.碰撞完){
			this.group.position.x += move_delta;
		}
		if(this.Status == BombStatus.爆炸中){
			
			/*this.vel.add(this.force.clone().multiplyScalar(delta / 1));
			this.pos.add(this.vel.clone().multiplyScalar(delta));
			this.group.children[0].position.copy(this.pos);

			this.vel2.add(this.force2.clone().multiplyScalar(delta / 1));
			this.pos2.add(this.vel2.clone().multiplyScalar(delta));
			this.group.children[1].position.copy(this.pos2);*/
		}
	}
}