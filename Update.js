function Update(){
	if(start && !pause){
		let delta = clock.getDelta();

		//$("#Time").text(current_time);

		audio.update();
		//backGround.update(delta);
		grid.update(delta);
		
		//grid.detection();
		mySaber.dotTop.getWorldPosition(pointTop);
		mySaber.dotBot.getWorldPosition(pointBot);

		mySaber.update(delta);
		
				
	}

	if (keyboard.pressed("left")) {
		controls.autoRotate = true;
		controls.autoRotateSpeed = 10;
		controls.update();
	}
	if (keyboard.pressed("right")) {
		controls.autoRotate = true;
		controls.autoRotateSpeed = -10;
		controls.update();
	}
}