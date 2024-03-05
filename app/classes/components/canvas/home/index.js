import { BoxGeometry, Mesh, MeshNormalMaterial, PlaneGeometry, ShaderMaterial } from "three";
import vertexShader from "@app/shaders/vertexShader.glsl";
import fragmentShader from "@app/shaders/fragmentShader.glsl";

function createHome(scene) {
	const planeGeometry = new PlaneGeometry(300, 300, 10, 10);

	const shaderMaterial = new ShaderMaterial({
		uniforms: {},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	});

	const Home = new Mesh(planeGeometry, shaderMaterial);

	return Home;
}

function destroyHomeMesh(scene) {
	if (!scene) {
		return;
	}

	scene.traverse((child) => {
		if (child instanceof Mesh) {
			// Dispose la géométrie du mesh
			if (child.geometry) {
				child.geometry.dispose();
			}

			// Dispose le matériau du mesh
			if (child.material) {
				if (Array.isArray(child.material)) {
					child.material.forEach((material) => {
						if (material && typeof material.dispose === "function") {
							material.dispose();
						}
					});
				} else if (child.material && typeof child.material.dispose === "function") {
					child.material.dispose();
				}
			}
		}
	});
}

export { createHome, destroyHomeMesh };
