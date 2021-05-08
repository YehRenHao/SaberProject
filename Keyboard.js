function DetectKeyboard(){
	if (start && keyboard.down("esc")) {
		pause = !pause;
		if(pause){
			clock.stop();
			audio.pause();
			pauseText.visible = true;
		}
		else{
			clock.start();
			audio.play();
			pauseText.visible = false;
		}
	}
}