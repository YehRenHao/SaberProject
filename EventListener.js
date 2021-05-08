function EventListener(){
	// resize

	window.addEventListener('resize', onWindowResize, false);

	raycaster = new THREE.Raycaster();
	document.addEventListener('mousedown', onDocumentMouseDown, true);
	document.addEventListener('mousemove', onDocumentMouseMove, true);
}

function onWindowResize() {

	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	bloomComposer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	finalComposer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

}

function onDocumentMouseDown(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables);
	if (intersects.length > 0) {
		if(intersects[0].object.name == "Click"){
			StartButton.move = true;
			pickables.pop( Click );
			scene.remove(Click);
		}
	}
}

function onDocumentMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
	raycaster.setFromCamera(mouse, camera);
	
	var intersects = raycaster.intersectObjects(pickables);
	
	if (intersects.length > 0) {
		document.body.style.cursor = 'pointer';
	} else {
		document.body.style.cursor = 'auto';
	}
}