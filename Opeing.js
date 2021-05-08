function Opening(){
	let StartGeo = new THREE.TorusBufferGeometry( 10, 1, 16, 100 );
	let StartMat = new THREE.MeshBasicMaterial( { color: "white" } );
	StartButton = new THREE.Mesh( StartGeo, StartMat );
	StartButton.layers.toggle( BLOOM_SCENE );
	StartButton.rotation.y = Math.PI / 2;
	StartButton.position.y = -35;
	StartButton.move = false;
	scene.add( StartButton );
	
	let ClickGeo = new THREE.CircleGeometry( 11, 32 );
	let ClickMat = new THREE.MeshBasicMaterial();
	Click = new THREE.Mesh( ClickGeo, ClickMat );
	Click.rotation.y = Math.PI / 2;
	Click.position.y = -35;
	Click.visible = false;
	scene.add( Click );
	Click.name = "Click";
	pickables.push( Click );
}