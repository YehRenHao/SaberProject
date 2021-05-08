function createBeatSaberText(){
	var fontName = "TR2N",
		fontWeight = "Regular";

	var	font = undefined,
		size = 200,
		height = 5,
		curveSegments = 4,
		bevelEnabled = true,
		bevelThickness = 2,
		bevelSize = 1.5,
		bevelSegments = 2;

	var loader = new THREE.FontLoader();
	var font = loader.load(
		'../files/fonts/' + fontName + '_' + fontWeight + '.json',

		function ( font ) {
			textGeo = new THREE.TextGeometry( "Rhythm", {

				font: font,

				size: size,
				height: height,
				curveSegments: curveSegments,

				bevelThickness: bevelThickness,
				bevelSize: bevelSize,
				bevelEnabled: bevelEnabled,
				bevelSegments: bevelSegments

			});

			textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
			var materials = new THREE.MeshBasicMaterial({
				color:"#0ef8f8"
			});
			BeatText = new THREE.Mesh( textGeo, materials );
			BeatText.layers.toggle( BLOOM_SCENE );
			BeatText.scale.set(0.1, 0.1, 0.1);
			BeatText.position.y = 15;
			BeatText.position.z = 60;
			BeatText.rotation.y = Math.PI / 2;
			
			scene.add(BeatText);

			textGeo = new THREE.TextGeometry( "Beater", {

				font: font,

				size: size,
				height: height,
				curveSegments: curveSegments,

				bevelThickness: bevelThickness,
				bevelSize: bevelSize,
				bevelEnabled: bevelEnabled,
				bevelSegments: bevelSegments

			});

			textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
			var materials = new THREE.MeshBasicMaterial({
				color:"#f8c90e"
			});
			SaberText = new THREE.Mesh( textGeo, materials );
			SaberText.layers.toggle( BLOOM_SCENE );
			SaberText.scale.set(0.1, 0.1, 0.1);
			SaberText.position.y = -10;
			SaberText.position.z = 60;
			SaberText.rotation.y = Math.PI / 2;
			
			scene.add(SaberText);

			textGeo = new THREE.TextGeometry( "PAUSE", {

				font: font,

				size: size,
				height: height,
				curveSegments: curveSegments,

				bevelThickness: bevelThickness,
				bevelSize: bevelSize,
				bevelEnabled: bevelEnabled,
				bevelSegments: bevelSegments

			});

			textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
			var materials = new THREE.MeshBasicMaterial({
				color:"#ffffff"
			});
			pauseText = new THREE.Mesh( textGeo, materials );
			pauseText.layers.toggle( BLOOM_SCENE );
			pauseText.scale.set(0.1, 0.1, 0.1);
			pauseText.position.y = 50;
			pauseText.position.z = 50;
			pauseText.visible = false;
			pauseText.position.x = 20;
			pauseText.rotation.y = Math.PI / 2;
			
			scene.add(pauseText);
		},

		function ( xhr ) {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		}
	);
}