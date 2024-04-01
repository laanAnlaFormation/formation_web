import { createCamera } from "@app/classes/components/canvas/camera.js";
import { createScene } from "@app/classes/components/canvas/scene.js";
import { createRenderer } from "@app/classes/systems/renderer.js";
import { Resizer } from "@app/classes/systems/Resizer.js";
import { Raycaster } from "three/src/core/Raycaster.js";
import { Vector2 } from "three/src/math/Vector2.js";

import CreateHomeWebgl from "./home/createHomeWebgl.js";
import CreateAboutWebgl from "./about/createAboutMesh.js";
import CreateContactWebgl from "./contact/createContactWebgl.js";
import { createHomeMesh, createHomePosition, destroyHomeMesh } from "@app/classes/components/canvas/home";
import { createAboutMesh, destroyAboutMesh, createAboutPosition } from "@app/classes/components/canvas/about";
import { createContactMesh, destroyContactMesh, createContactPosition } from "@app/classes/components/canvas/contact";

import Time from "@app/classes/components/canvas/Time";

export default class World {
	constructor(container, template, lenis) {
		this.container = container;
		this.template = template;
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;

		this.lenis = lenis;

		this.offset = new Vector2(0.0, 0.0);
		this.sizes = new Vector2(0.0, 0.0);

		this.time = new Time();
		this.camera = createCamera(this.width, this.height);

		this.scene = createScene();

		this.raycaster = new Raycaster();
		this.pointer = new Vector2();

		this.renderer = createRenderer();
		this.container.append(this.renderer.domElement);

		this.handleMouseMove = this.handleMouseMove.bind(this);

		this.onChange(this.template);

		this.addEventsListeners();

		this.time.on("tick", () => {
			this.update();
		});
		this.resize();
	}

	onChange(template) {
		if (window.innerWidth > 1024) {
			this.currentTemplate = template;

			// this.links = document.querySelectorAll("a.spa");
			// this.links.forEach((link) => {
			// 	link.addEventListener("click", (e) => {
			// 		if (e.currentTarget.getAttribute("href").toLowerCase() === window.location.pathname.toLowerCase()) {
			// 			e.preventDefault();
			// 			e.stopPropagation();
			// 		}
			// 	});
			// });

			if (this.currentTemplate === "home") {
				console.log("create Home");
				//this.timeoutId = setTimeout(() => {
				this.createHome();
				//}, 100);
			} else if (this.createHomeMesh) {
				//this.destroyHome();
			}

			if (this.currentTemplate === "about") {
				//this.timeoutId = setTimeout(() => {
				this.createAbout();
				//}, 100);
			} else if (this.about) {
				//this.destroyAbout();
			}

			if (this.currentTemplate === "contact") {
				this.createContact();
			} else if (this.contact) {
				//this.destroyContact();
			}
		}
	}

	createHome() {
		this.createHomeMesh = new CreateHomeWebgl(this.width, this.height, this.scene);
		this.createHomeMesh.imageStore.forEach((item) => {
			this.scene.add(item.mesh);
		});
		this.render();
		this.mouseMovement();
		// this.renderer.render(this.scene, this.camera);
		// this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
		// this.camera.updateProjectionMatrix();
		// this.scene.add(this.createHomeMesh.imageStore.mesh);
		// createHomeMesh(this.offset, this.sizes, this.width, this.height)
		// 	.then((items) => {
		// 		this.home = items;
		// 		createHomePosition(this.home, this.width, this.height);
		// 		this.home.forEach((item) => {
		// 			this.scene.add(item.mesh);
		// 		});
		// 		this.mouseMovement();
		// 	})
		// 	.catch((error) => {
		// 		console.error("Erreur lors du chargement des maillages :", error);
		// 	});
	}

	destroyHome() {
		if (!this.createHomeMesh) return;
		this.time.off("tick", this.update);
		// destroyHomeMesh(this.scene);
		// this.home.forEach((item) => {
		// 	this.scene.remove(item.mesh);
		// });
		this.createHomeMesh.destroy(this.scene);
		this.createHomeMesh = null;
		// if (this.renderer && this.camera) {
		// 	this.renderer.render(this.scene, this.camera);
		// }
	}

	// destroyHome() {
	// 	if (!this.home) return;
	// 	this.time.off("tick", this.update);
	// 	destroyHomeMesh(this.scene);
	// 	this.home.forEach((item) => {
	// 		this.scene.remove(item.mesh);
	// 	});
	// 	this.destroy();
	// 	this.scene.remove(this.home);
	// 	this.home = null;
	// }

	// createAbout() {
	// 	createAboutMesh(this.offset, this.sizes, this.width, this.height)
	// 		.then((items) => {
	// 			this.about = items;
	// 			createAboutPosition(this.about, this.width, this.height);
	// 			this.about.forEach((item) => {
	// 				this.scene.add(item.mesh);
	// 			});
	// 			this.mouseMovement();
	// 		})
	// 		.catch((error) => {
	// 			console.error("Erreur lors du chargement des maillages :", error);
	// 		});
	// }

	createAbout() {
		console.log(this.currentTemplate);
		this.createAboutMesh = new CreateAboutWebgl(this.width, this.height, this.scene);
		this.createAboutMesh.imageStore.forEach((item) => {
			this.scene.add(item.mesh);
		});
		this.render();
		// console.log(this.scene, this.camera);
		// this.renderer.render(this.scene, this.camera);
		// this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
		// this.camera.updateProjectionMatrix();
		//this.scene.add(this.createHomeMesh.imageStore.mesh);
		// createHomeMesh(this.offset, this.sizes, this.width, this.height)
		// 	.then((items) => {
		// 		this.home = items;
		// 		createHomePosition(this.home, this.width, this.height);
		// 		this.home.forEach((item) => {
		// 			this.scene.add(item.mesh);
		// 		});
		this.mouseMovement();
		// 	})
		// 	.catch((error) => {
		// 		console.error("Erreur lors du chargement des maillages :", error);
		// 	});
	}

	// destroyAbout() {
	// 	if (!this.about) return;
	// 	this.time.off("tick", this.update);
	// 	destroyAboutMesh(this.scene);
	// 	this.about.forEach((item) => {
	// 		this.scene.remove(item.mesh);
	// 	});
	// 	this.destroy();
	// 	this.scene.remove(this.about);
	// 	this.about = null;
	// }

	destroyAbout() {
		if (!this.createAboutMesh) return;
		this.time.off("tick", this.update);
		// destroyHomeMesh(this.scene);
		// this.home.forEach((item) => {
		// 	this.scene.remove(item.mesh);
		// });
		this.createAboutMesh.destroy(this.scene);
		this.createAboutMesh = null;
		// if (this.renderer && this.camera) {
		// 	this.renderer.render(this.scene, this.camera);
		// }
	}

	createContact() {
		// createContactMesh()
		// 	.then((items) => {
		// 		this.contact = items;
		// 		createContactPosition(this.contact, this.width, this.height);
		// 		this.contact.forEach((item) => {
		// 			this.scene.add(item.mesh);
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.error("Erreur lors du chargement des maillages :", error);
		// 	});
		this.createContactMesh = new CreateContactWebgl(this.width, this.height, this.scene);
		this.createContactMesh.imageStore.forEach((item) => {
			this.scene.add(item.mesh);
		});
		this.render();
		this.mouseMovement();
	}

	// destroyContact() {
	// 	if (!this.contact) return;
	// 	this.time.off("tick", this.update);
	// 	destroyContactMesh(this.scene);
	// 	this.contact.forEach((item) => {
	// 		this.scene.remove(item.mesh);
	// 	});
	// 	this.scene.remove(this.contact);
	// 	this.contact = null;
	// 	if (this.renderer && this.camera) {
	// 		this.renderer.render(this.scene, this.camera);
	// 	}
	// }
	destroyContact() {
		if (!this.createContactMesh) return;
		this.time.off("tick", this.update);
		// destroyHomeMesh(this.scene);
		// this.home.forEach((item) => {
		// 	this.scene.remove(item.mesh);
		// });
		this.createContactMesh.destroy(this.scene);
		this.createContactMesh = null;
		// if (this.renderer && this.camera) {
		// 	this.renderer.render(this.scene, this.camera);
		// }
	}

	handleMouseMove(event) {
		//if (this.currentTemplate === "contact") return;

		this.pointer.x = (event.clientX / this.width) * 2 - 1;
		this.pointer.y = -(event.clientY / this.height) * 2 + 1;
		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.scene.children);
		if (intersects.length > 0) {
			let obj = intersects[0].object;
			obj.material.uniforms.uHover.value = intersects[0].uv;
		}
	}

	mouseMovement() {
		window.addEventListener("mousemove", this.handleMouseMove, false);
	}

	render() {
		this.resizer = new Resizer(this.camera, this.renderer, this.container);
		this.renderer.render(this.scene, this.camera);
	}

	resize() {
		console.log("resize");
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);
		// if (this.currentTemplate === "home" && this.home) {
		// 	this.home.forEach((item) => {
		// 		let bounds = item.img.getBoundingClientRect();
		// 		item.mesh.scale.set(bounds.width, bounds.height, 1);

		// 		item.top = bounds.top;
		// 		item.left = bounds.left;
		// 		item.width = bounds.width;
		// 		item.height = bounds.height;
		// 		item.mesh.position.x = bounds.left - this.width / 2 + bounds.width / 2;
		// 		item.mesh.position.y = -bounds.top + this.height / 2 - bounds.height / 2;
		// 	});
		// }

		if (this.currentTemplate === "home" && this.createHomeMesh) {
			this.createHomeMesh.imageStore.forEach((item) => {
				let bounds = item.img.getBoundingClientRect();
				item.mesh.scale.set(bounds.width, bounds.height, 1);

				item.top = bounds.top;
				item.left = bounds.left;
				item.width = bounds.width;
				item.height = bounds.height;
				item.mesh.position.x = bounds.left - this.width / 2 + bounds.width / 2;
				item.mesh.position.y = -bounds.top + this.height / 2 - bounds.height / 2;
			});
		}

		if (this.currentTemplate === "about" && this.createAboutMesh) {
			this.createAboutMesh.imageStore.forEach((item) => {
				let bounds = item.img.getBoundingClientRect();
				item.mesh.scale.set(bounds.width, bounds.height, 1);

				item.top = bounds.top;
				item.left = bounds.left;
				item.width = bounds.width;
				item.height = bounds.height;
				item.mesh.position.x = bounds.left - this.width / 2 + bounds.width / 2;
				item.mesh.position.y = -bounds.top + this.height / 2 - bounds.height / 2;
			});
		}

		// if (this.currentTemplate === "about" && this.about) {
		// 	this.about.forEach((item) => {
		// 		let bounds = item.img.getBoundingClientRect();
		// 		item.mesh.scale.set(bounds.width, bounds.height, 1);

		// 		item.top = bounds.top;
		// 		item.left = bounds.left;
		// 		item.width = bounds.width;
		// 		item.height = bounds.height;
		// 		item.mesh.position.x = bounds.left - this.width / 2 + bounds.width / 2;
		// 		item.mesh.position.y = -bounds.top + this.height / 2 - bounds.height / 2;
		// 	});
		// }
		if (this.currentTemplate === "contact" && this.createContactMesh) {
			this.createContactMesh.imageStore.forEach((item) => {
				let bounds = item.img.getBoundingClientRect();
				item.mesh.scale.set(bounds.width, bounds.height, 1);

				item.top = bounds.top;
				item.left = bounds.left;
				item.width = bounds.width;
				item.height = bounds.height;
				item.mesh.position.x = bounds.left - this.width / 2 + bounds.width / 2;
				item.mesh.position.y = -bounds.top - this.height + bounds.height / 2 - this.lenis.scroll + bounds.height + 30;
				console.log(-this.lenis.scroll + this.height);
			});
		}

		// if (this.currentTemplate === "contact" && this.contact) {
		// 	this.contact.forEach((item) => {
		// 		let bounds = item.img.getBoundingClientRect();
		// 		item.mesh.scale.set(bounds.width, bounds.height, 1);

		// 		item.top = bounds.top;
		// 		item.left = bounds.left;
		// 		item.width = bounds.width;
		// 		item.height = bounds.height;
		// 		item.mesh.position.x = bounds.left - this.width / 2 + bounds.width / 2;
		// 		item.mesh.position.y = -bounds.top + this.height / 2 - bounds.height / 2;
		// 	});
		// }
		this.renderer.render(this.scene, this.camera);
	}

	update() {
		// if (this.currentTemplate === "home" && this.home) {
		// 	this.home.forEach((m) => {
		// 		m.mesh.material.uniforms.uTime.value = this.time.elapsed / 1000;
		// 		m.mesh.material.uniforms.uOffset.value.set(this.offset.y * 0.0, -(this.lenis.targetScroll - this.lenis.actualScroll) * 0.00008);
		// 	});
		// 	//this.camera.updateProjectionMatrix();
		// 	//this.camera.position.y = -window.scrollY;
		// 	//this.camera.position.y = -this.lenis.scroll;
		// }

		if (this.currentTemplate === "home" && this.createHomeMesh) {
			this.createHomeMesh.imageStore.forEach((img) => {
				img.mesh.material.uniforms.uTime.value = this.time.elapsed / 1000;
				img.mesh.material.uniforms.uOffset.value.set(this.offset.y * 0.0, -(this.lenis.targetScroll - this.lenis.actualScroll) * 0.00008);
			});
			//this.createHomeMesh.mesh.rotation.x = this.time.elapsed / 1000;
			//this.createHomeMesh.mesh.rotation.y = this.time.elapsed / 1000;
			//this.camera.updateProjectionMatrix();
			//this.camera.position.y = -window.scrollY;
			//this.camera.position.y = -this.lenis.scroll;
		}

		if (this.currentTemplate === "about" && this.createAboutMesh) {
			this.createAboutMesh.imageStore.forEach((img) => {
				img.mesh.material.uniforms.uTime.value = this.time.elapsed / 1000;
				img.mesh.material.uniforms.uOffset.value.set(this.offset.y * 0.0, -(this.lenis.targetScroll - this.lenis.actualScroll) * 0.00008);
			});
			//this.createHomeMesh.mesh.rotation.x = this.time.elapsed / 1000;
			//this.createHomeMesh.mesh.rotation.y = this.time.elapsed / 1000;
			//this.camera.updateProjectionMatrix();
			//this.camera.position.y = -window.scrollY;
			//this.camera.position.y = -this.lenis.scroll;
		}

		// if (this.currentTemplate === "about" && this.about) {
		// 	this.about.forEach((m) => {
		// 		m.mesh.material.uniforms.uTime.value = this.time.elapsed / 1000;
		// 		m.mesh.material.uniforms.uOffset.value.set(this.offset.y * 0.0, -(this.lenis.targetScroll - this.lenis.actualScroll) * 0.00008);
		// 	});
		// 	//this.camera.position.y = -window.scrollY;
		// 	//this.camera.updateProjectionMatrix();
		// }

		// if (this.currentTemplate === "contact" && this.contact) {
		// 	this.contact.forEach((m) => {
		// 		m.mesh.material.uniforms.uTime.value = this.time.elapsed / 1000;
		// 		m.mesh.material.uniforms.uOffset.value.set(this.offset.y * 0.0, -(this.lenis.targetScroll - this.lenis.actualScroll) * 0.00008);
		// 	});
		// 	//this.camera.position.y = -window.scrollY;
		// 	//this.camera.updateProjectionMatrix();
		// }
		if (this.currentTemplate === "contact" && this.createContactMesh) {
			this.createContactMesh.imageStore.forEach((img) => {
				img.mesh.material.uniforms.uTime.value = this.time.elapsed / 1000;
				img.mesh.material.uniforms.uOffset.value.set(this.offset.y * 0.0, -(this.lenis.targetScroll - this.lenis.actualScroll) * 0.00008);
			});
			//this.createHomeMesh.mesh.rotation.x = this.time.elapsed / 1000;
			//this.createHomeMesh.mesh.rotation.y = this.time.elapsed / 1000;
			//this.camera.updateProjectionMatrix();
			//this.camera.position.y = -window.scrollY;
			//this.camera.position.y = -this.lenis.scroll;
		}

		this.camera.position.y = -this.lenis.actualScroll;
		this.renderer.render(this.scene, this.camera);
		//this.camera.position.y = -window.scrollY;
	}

	addEventsListeners() {
		window.addEventListener("resize", this.resize.bind(this));
	}

	destroy() {
		console.log("destroy worldddddd");
		window.removeEventListener("mousemove", this.handleMouseMove, false);
		if (this.createHomeMesh) {
			this.destroyHome();
		}
		if (this.createAboutMesh) {
			this.destroyAbout();
		}
		if (this.createContactMesh) {
			this.destroyContact();
		}
	}
}
