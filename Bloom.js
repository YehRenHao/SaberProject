function makeComposer(){
	var renderScene = new THREE.RenderPass( scene, camera );
	
	var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
	bloomPass.threshold = params.bloomThreshold;
	bloomPass.strength = params.bloomStrength;
	bloomPass.radius = params.bloomRadius;

	bloomComposer = new THREE.EffectComposer( renderer );
	bloomComposer.renderToScreen = false;
	// 將bloom不輸出到螢幕上
	bloomComposer.addPass( renderScene );
	bloomComposer.addPass( bloomPass );

	var finalPass = new THREE.ShaderPass(
		new THREE.ShaderMaterial( {
			uniforms: {
				baseTexture: { value: null },
				bloomTexture: { value: bloomComposer.renderTarget2.texture }
			},
			vertexShader: document.getElementById( 'bloomvertexshader' ).textContent,
			fragmentShader: document.getElementById( 'bloomfragmentshader' ).textContent,
			defines: {}
		} ), "baseTexture"
	);
	finalPass.needsSwap = true;

	FxaaPass = createFxaaPass();
	// Fxaa 抗拒齒
	finalComposer = new THREE.EffectComposer( renderer );
	finalComposer.addPass( renderScene );
	finalComposer.addPass( finalPass );
	finalComposer.addPass( FxaaPass );
}

function createFxaaPass() {
	let FxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
	const pixelRatio = renderer.getPixelRatio();
	FxaaPass.material.uniforms["resolution"].value.x = 1 / (window.innerWidth * pixelRatio);
	FxaaPass.material.uniforms["resolution"].value.y = 1 / (window.innerHeight * pixelRatio);
	FxaaPass.renderToScreen = true;
	
	return FxaaPass;
}

function darkenNonBloomed( obj ) {
	if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
		materials[ obj.uuid ] = obj.material;
		obj.material = new THREE.MeshBasicMaterial( { color: "black" } );
	}
}

function restoreMaterial( obj ) {
	if ( materials[ obj.uuid ] ) {
		obj.material = materials[ obj.uuid ];
		delete materials[ obj.uuid ];
	}
}