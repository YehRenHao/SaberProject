var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

var camera, scene, renderer;
var container;

var bloomComposer, finalComposer;
var BLOOM_SCENE = 1;
		
var bloomLayer = new THREE.Layers();
	bloomLayer.set( BLOOM_SCENE );

var params = {
	exposure: 1,
	bloomThreshold: 0,
	bloomStrength: 1,
	bloomRadius: 0
};

var materials = {};

var distance = 120,
	bpm = 174,
	bpmTime = (60/bpm) * 4;

var raycaster;
var mouse = new THREE.Vector2();
var pickables = [];

var keyboard = new KeyboardState();

var clock = new THREE.Clock(), begin = false, start = false, pause = false;

var BeatText, SaberText, pauseText;
var StartButton, Click;

var mySaber;

var HitSound;

var controls;

var ComboCount = 0, ScoreCount = 0;

var cubeMap = loadBaLLCubeMap();

var pointTop = new THREE.Vector3();
var pointBot = new THREE.Vector3();
var notes;

const watermelon = new THREE.TextureLoader().load('files/images/watermelon.jpg');
const nuclear = new THREE.TextureLoader().load('files/images/nuclear.png');

var myData;
$.getJSON('files/sounds/Cartoon - On _ On (feat. Daniel Levi).json', function(data) {
	myData = data;
});

init();

function init() {

	container = document.createElement('div');
	document.body.appendChild(container);

	// scene

	scene = new THREE.Scene();
	SetSceneCubeMap();
	
	// camera

	camera = new THREE.PerspectiveCamera(30, aspect, 1, 10000);
	camera.position.set(300, 0, 0);

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.autoClear = false;
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.shadowMap.enabled = true;

	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;

	container.appendChild(renderer.domElement);

	// controls

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	/*controls.minPolarAngle = Math.PI * (70 / 180);
	controls.maxPolarAngle = Math.PI * (110 / 180);
	
	controls.minAzimuthAngle = Math.PI * (70 / 180);
	controls.maxAzimuthAngle = Math.PI * (110 / 180);
*/
	// Bloom
	makeComposer();

	// Font Tron make Text
	createBeatSaberText();

	HitSound = document.getElementById ('HitSound');
	HitSound.volume = 0.5;
	
	Opening();
	EventListener();

	animate();
}

function animate() {
	keyboard.update();

	if(!begin){
		audio = new myAudio();
		begin = !begin;
	}
	else{
		DetectKeyboard();
		OpeningRender();

		Update();
	}

	requestAnimationFrame(animate);
	render();

}

function render() {

	scene.traverse( darkenNonBloomed );
	renderer.toneMapping = THREE.ReinhardToneMapping;
	bloomComposer.render();

	scene.traverse( restoreMaterial );
	renderer.toneMapping = THREE.NoToneMapping;
	finalComposer.render();

}