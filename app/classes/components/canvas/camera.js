import { PerspectiveCamera } from "three";

function createCamera(container) {
	const camera = new PerspectiveCamera(
		2 * Math.atan(container.clientHeight / 2 / 600) * (180 / Math.PI),
		container.clientWidth / container.clientHeight,
		20, // near clipping plane
		1000 // far clipping plane
	);

	// move the camera back so we can view the scene
	camera.position.set(0, 0, 600);

	return camera;
}

export { createCamera };
