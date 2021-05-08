function loadBaLLCubeMap(){
    let path = "../files/cubeMap/Universe/";
	let format = '.jpg';
	let urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];
	let loader = new THREE.CubeTextureLoader();
	let cubeMap = loader.load(urls);
    cubeMap.format = THREE.RGBFormat;
    
    return cubeMap;
}

function SetSceneCubeMap(){
    let path = "../files/cubeMap/UniverseDark/";
	let format = '.png';
	let urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];
	let loader = new THREE.CubeTextureLoader();
	let cubeMap = loader.load(urls);
    cubeMap.format = THREE.RGBFormat;
    
   	scene.background = cubeMap;

}
