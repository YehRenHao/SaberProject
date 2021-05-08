function OpeningRender(){
	if(StartButton.move == true){
		StartButton.position.x += 2;
		StartButton.position.y += 0.25;
				
		if( StartButton.position.x == 300 ){
			
			StartButton.move = false;
			
			scene.remove(BeatText);
			scene.remove(SaberText);
			scene.remove(StartButton);

			mySaber = new Saber("#f8c90e");
			//backGround = new BackGround();
			audio.music();
			grid = new Grid();
			audio.setVisible();
			camera.position.set(250, 25, 0);
			start = true;
			clock.start();
			audio.play();
		}
	}
}