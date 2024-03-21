import { PerspectiveCamera } from "three";

function createCamera(width, height) {
	const camera = new PerspectiveCamera(2 * Math.atan(height / 2 / 600) * (180 / Math.PI), width / height, 20, 1000);

	// move the camera back so we can view the scene
	camera.position.set(0, 0, 600);

	return camera;
}

export { createCamera };
