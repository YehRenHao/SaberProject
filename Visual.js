const HIGHLIGHT_COLORS = [0x4200ff, 0x00ffff, 0xff0000, 0xff00ff];

class myAudio{
	constructor(){
		
		this.lut = new THREE.Lut( 'rainbow', 32 );
		
		this.leftArray = [];
		this.rightArray = [];
		this.buildBar();

		var geometry = new THREE.CylinderGeometry( 120, 120, 10000, 32, 1, true );
		this.texture = new THREE.TextureLoader().load('files/images/tunnel.png')
		this.texture.wrapT = THREE.RepeatWrapping;
		var material = new THREE.MeshBasicMaterial({map : this.texture, side: THREE.DoubleSide});
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		material.map.repeat.set(1, 10)
		this.object	= new THREE.Mesh( geometry, material );
		this.object.position.x = -4800;
		this.object.rotation.z	= Math.PI/2;
		scene.add( this.object );

	}

	music(){
		this.audio = new Audio();
		
		let file = 'files/sounds/Cartoon - On _ On (feat. Daniel Levi).mp3';
		
		this.audio.src = file;
		this.audio.controls = true;
		this.context = new AudioContext();
		this.analyser = this.context.createAnalyser();

		var source = this.context.createMediaElementSource(this.audio);
		source.connect(this.analyser);
		this.analyser.connect(this.context.destination);

		this.audio.currentTime = 50;

	}

	play(){
		$("#myRange").css({ display: "" });
		this.audio.play();
	}
	
	pause(){
		this.audio.pause();
	}

	buildBar(){
		for (let i = 0, x = -600, y = 50 - 75, z = 150; i < 32; i++, x += 15){
			let puckColor = this.lut.getColor( i / 32 );
			
			let geo = new THREE.BoxGeometry( 10, 60, 5 );
			let mat = new THREE.MeshBasicMaterial({
				color: puckColor,
				transparent: true,
				opacity: 0.25
			});
			let leftobject = new THREE.Mesh( geo, mat );
			leftobject.layers.toggle( BLOOM_SCENE );
			let rightObject = new THREE.Mesh( geo, mat );
			rightObject.layers.toggle( BLOOM_SCENE );

			this.leftArray.push(leftobject);
			this.rightArray.push(rightObject);
			leftobject.visible = false;
			rightObject.visible = false;
			leftobject.position.set(x, y, z);
			rightObject.position.set(x, y, -z);
			scene.add( leftobject );
			scene.add( rightObject );
		}
	}

	setVisible(){
		this.leftArray.forEach(a => {
			a.visible = true;
		});
		this.rightArray.forEach(a => {
			a.visible = true;
		});
	}

	update(){
		//if(this.context.currentTime < 100)
		//this.context.currentTime = 100;

		var array = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteFrequencyData(array);
		let time = this.audio.currentTime;
		//console.log( time/this.audio.duration * 100);
		$("#myRange").val(time/this.audio.duration * 100);
		let min = Math.floor(time / 60);
		let sec = Math.round(time % 60);
		if(sec < 10)
			sec = "0" + sec;
		$("#Time").text( min + ":" + sec);
		
		if(array != "undefined"){
			this.drawBars(array);
			this.visualize(array);
		}
	}
	
	visualize(array){
		let arrayCount = 0;
		for (let i = 0; i < 32; i++){
			let length = ( array[arrayCount] / 128 );
			arrayCount += 4;
			this.leftArray[i].position.y = 50 * length / 2 - 75;
			this.leftArray[i].scale.set(1, length, 1);
			this.rightArray[i].position.y = 50 * length / 2 - 75;
			this.rightArray[i].scale.set(1, length, 1);
		}
	}

	drawBars (array) {

		let bass = Math.floor(array[1]); //1Hz Frequenz
		let snare = Math.floor(array[250]);
		
		if (snare > 0) {
			if (snare > 100) {
				if (snare > 230) {
					this.texture.offset.y += 0.01;
				}
				else {
					this.texture.offset.y += 0.005;
				}
			} else {
				this.texture.offset.y += 0.001;
			}
		}
		
		if (bass > 230) {
			
			this.texture.offset.y += 0.02;
		}

		this.texture.needsUpdate = true;
	}
}