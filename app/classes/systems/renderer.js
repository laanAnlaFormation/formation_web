import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";

function createRenderer() {
	const renderer = new WebGLRenderer({
		antialias: true,
		alpha: true,
		precision: "mediump",
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	return renderer;
}

export { createRenderer };
