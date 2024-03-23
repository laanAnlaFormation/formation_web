import { gsap } from "gsap";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { Vector4 } from "three/src/math/Vector4.js";
import { Vector2 } from "three/src/math/Vector2.js";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
import vertexShader from "@app/shaders/vertexShaderHome.glsl";
import vertexShaderMobile from "@app/shaders/vertexShader.glsl";
import fragmentShader from "@app/shaders/fragmentShader.glsl";
import fragmentShaderMobile from "@app/shaders/fragmentShaderMobile.glsl";

if (!window.TEXTURES) {
	window.TEXTURES = {};
}

function loadTexture(url) {
	return new Promise((resolve, reject) => {
		new TextureLoader().load(
			url,
			(texture) => {
				texture.needsUpdate = true;
				window.TEXTURES[url] = texture;
				resolve(texture);
			},
			undefined,
			reject
		);
	});
}

function createAboutMesh(offset, sizes, width, height) {
	return new Promise((resolve, reject) => {
		const mobile = window.matchMedia("(max-width: 1025px)");
		const images = [...document.querySelectorAll(".about-webgl")];
		const geometry = new PlaneGeometry(1, 1, 30, 30);
		const loadPromises = images.map((img) => {
			const textureUrl = img.getAttribute("src");
			const textureUrl2 = img.getAttribute("data-src");

			return Promise.all([loadTexture(textureUrl), loadTexture(textureUrl2)]).then(([texture1, texture2]) => {
				const material = new ShaderMaterial({
					uniforms: {
						uTexture: { value: texture1 },
						uTexture2: { value: texture2 },
						uScroll: { value: 0.0 },
						uTime: { value: 0 },
						uProgress: { value: 0 },
						uResolution: { value: new Vector4() },
						uHoverMouse: { value: 0 },
						uOffset: { value: new Vector2(0.0, 0.0) },
						uHover: { value: new Vector2(0.5, 0.5) },
						uAlpha: { value: 1.0 },
					},
					vertexShader: mobile.matches ? vertexShaderMobile : vertexShader,
					fragmentShader: mobile.matches ? fragmentShaderMobile : fragmentShader,
				});

				img.addEventListener("mouseenter", () => {
					gsap.to(material.uniforms.uHoverMouse, {
						value: 1,
					});
				});

				img.addEventListener("mouseout", () => {
					gsap.to(material.uniforms.uHoverMouse, {
						value: 0,
						duration: 0.5,
					});
				});

				const mesh = new Mesh(geometry, material);
				let bounds = img.getBoundingClientRect();

				sizes.set(bounds.width, bounds.height);
				offset.set(bounds.left - width / 2 + bounds.width / 2, -bounds.top + height / 2 - bounds.height / 2);
				mesh.scale.set(bounds.width, bounds.height, 1);

				gsap.to(mesh.position, { y: "+=50", duration: 0.7 });

				return {
					img,
					mesh,
					top: bounds.top,
					left: bounds.left,
					width: bounds.width,
					height: bounds.height,
				};
			});
		});

		// Attendre le chargement de toutes les textures
		Promise.all(loadPromises)
			.then((meshInfos) => {
				resolve(meshInfos);
			})
			.catch((error) => {
				console.error("Erreur lors du chargement des textures :", error);
				reject(error);
			});
	});
}

function createAboutPosition(imagesArray, width, height) {
	imagesArray.forEach((image) => {
		image.mesh.position.y = -image.top + height / 2 - image.height / 2;
		image.mesh.position.x = image.left - width / 2 + image.width / 2;
	});
}

function destroyAboutMesh(scene, renderer) {
	if (!scene) {
		return;
	}
	//renderer.dispose();
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

export { createAboutMesh, createAboutPosition, destroyAboutMesh };
