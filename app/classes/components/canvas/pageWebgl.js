import { Mesh } from "three/src/objects/Mesh.js";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial.js";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry.js";
//import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import vertexShader from "@app/shaders/vertexShaderHome.glsl";
import fragmentShader from "@app/shaders/fragmentShader.glsl";
import { Texture } from "three";
import { Vector4, Vector2 } from "three";
import { gsap } from "gsap";
import { LoadingManager, TextureLoader } from "three";

export default class PageWebgl {
	constructor(scene) {
		this.scene = scene;
		this.materials = [];
		this.loadedTextures = window.TEXTURES;
	}

	createObject() {
		console.log(window.TEXTURES);
		this.geometry = new PlaneGeometry(1, 1, 30, 30);
		this.material = new ShaderMaterial({
			uniforms: {
				//uTexture: { value: this.textures[0] },
				//uTexture2: { value: this.textures[1] },
				//uTexture: { value: new TextureLoader().load() },
				uTexture: { value: new TextureLoader().load() },
				uTexture2: { value: new TextureLoader().load() },
				uScroll: { value: 0.0 },
				uTime: { value: 0 },
				uProgress: { value: 0 },
				uResolution: { value: new Vector4() },
				uHoverMouse: { value: 0 },
				uOffset: { value: new Vector2(0.0, 0.0) },
				uHover: { value: new Vector2(0.5, 0.5) },
				uAlpha: { value: 1.0 },
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
		});
		//this.mesh = new Mesh(this.geometry, this.material);
		//this.mesh.scale(100, 100, 1);

		this.images = [...document.querySelectorAll(".home-webgl")];

		this.imageStore = this.images.map((img) => {
			let bounds = img.getBoundingClientRect();
			let m = this.material.clone();
			this.materials.push(m);

			let texture = this.loadedTextures[img.src] || new Texture();
			texture.needsUpdate = true;
			m.uniforms.uTexture.value = texture;

			let texture2 = this.loadedTextures[img.getAttribute("data-src")] || new Texture(); // Exemple pour une deuxième texture
			texture2.needsUpdate = true;
			m.uniforms.uTexture2.value = texture2;
			// let texture = window.TEXTURES[img.src];
			// if (!texture) {
			// 	console.warn(`Texture ${img.src} not found in window.TEXTURES.`);
			// 	texture = new Texture(); // Texture de fallback si non trouvée
			// }
			// //let texture = new Texture(img);
			// texture.needsUpdate = true;

			// m.uniforms.uTexture.value = texture;

			// let texture2 = window.TEXTURES[img.getAttribute("data-src")];
			// if (!texture2) {
			// 	console.warn(`Texture ${img.src} not found in window.TEXTURES.`);
			// 	texture2 = new Texture(); // Texture de fallback si non trouvée
			// }
			// //let texture = new Texture(img);
			// texture2.needsUpdate = true;

			//m.uniforms.uTexture2.value = texture2;

			img.addEventListener("mouseenter", () => {
				gsap.to(m.uniforms.uHoverMouse, {
					value: 1,
				});
			});

			img.addEventListener("mouseout", () => {
				gsap.to(m.uniforms.uHoverMouse, {
					value: 0,
					duration: 0.8,
				});
			});

			let mesh = new Mesh(this.geometry, m);
			mesh.scale.set(bounds.width, bounds.height, 1);
			gsap.to(mesh.position, {
				y: "+=40",
				duration: 0.6,
			});

			return {
				img,
				mesh,
				top: bounds.top,
				left: bounds.left,
				width: bounds.width,
				height: bounds.height,
			};
		});
	}

	setPosition(width, height) {
		this.imageStore.forEach((image) => {
			image.mesh.position.y = -image.top + height / 2 - image.height / 2;
			image.mesh.position.x = image.left - width / 2 + image.width / 2;
		});
	}

	destroy() {
		// S'assurer que la scène est définie
		if (!this.scene) return;

		// Parcourir chaque image stockée
		this.imageStore.forEach((imageStoreItem) => {
			const { mesh } = imageStoreItem; // Destructuration pour obtenir le mesh

			// Retirer le mesh de la scène
			this.scene.remove(mesh);

			// Libérer les ressources utilisées par le mesh
			if (mesh.geometry) mesh.geometry.dispose();

			// Vérifier si le matériau est un tableau (pour les objets avec plusieurs matériaux)
			if (Array.isArray(mesh.material)) {
				mesh.material.forEach((material) => material.dispose());
			} else {
				mesh.material.dispose();
			}

			// Si les textures sont stockées dans les uniforms, il faut également les disposer
			if (mesh.material.uniforms) {
				Object.values(mesh.material.uniforms).forEach((uniform) => {
					if (uniform.value && uniform.value.isTexture) {
						uniform.value.dispose();
					}
				});
			}
		});

		// Vider `imageStore` et `materials` pour libérer les références
		this.imageStore = [];
		this.materials.forEach((material) => material.dispose());
		this.materials = [];

		// Dispose d'autres ressources si nécessaire
		this.geometry.dispose();
		this.material.dispose();

		// Optionnel: Si vous avez initialisé d'autres objets Three.js (comme Raycaster, Vector2, etc.)
		// et que vous maintenez des références à eux qui nécessitent une nettoyage, faites-le ici.
	}
}
