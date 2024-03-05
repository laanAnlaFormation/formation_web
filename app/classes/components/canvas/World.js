import { createCamera } from "@app/classes/components/canvas/camera.js";
import { createHome, destroyHomeMesh } from "@app/classes/components/canvas/home";
import { createAbout, destroyAboutMesh } from "@app/classes/components/canvas/about";
import { createContact, destroyContactMesh } from "@app/classes/components/canvas/contact";
import { createScene } from "@app/classes/components/canvas/scene.js";

import { createRenderer } from "@app/classes/systems/renderer.js";
import { Resizer } from "@app/classes/systems/Resizer.js";

import Time from "@app/classes/components/canvas/Time";

export default class World {
	constructor(container, template) {
		this.container = container;
		this.template = template;

		this.time = new Time();
		this.camera = createCamera(this.container);
		this.scene = createScene();
		this.renderer = createRenderer();
		this.container.append(this.renderer.domElement);

		this.onChange(this.template);
		//this.home = createHome();

		//this.scene.add(this.home);
		this.addEventsListeners();

		this.time.on("tick", () => {
			this.update();
		});
	}

	onChange(template) {
		if (template === "home") {
			this.home = createHome();
			this.scene.add(this.home);
		} else if (this.home) {
			this.destroyHome();
		}

		if (template === "about") {
			this.about = createAbout();
			this.scene.add(this.about);
		} else if (this.about) {
			this.destroyAbout();
		}

		if (template === "contact") {
			this.contact = createContact();
			this.scene.add(this.contact);
		} else if (this.contact) {
			this.destroyContact();
		}
	}

	destroyHome() {
		if (!this.home) return;
		console.log("destroy home");
		this.time.off("tick", this.update);
		destroyHomeMesh(this.scene, this.home);
		this.scene.remove(this.home);
		this.home = null;
	}

	destroyAbout() {
		if (!this.about) return;
		this.time.off("tick", this.update);
		destroyAboutMesh(this.scene, this.about);
		this.scene.remove(this.about);
		this.about = null;
	}

	destroyContact() {
		if (!this.contact) return;
		this.time.off("tick", this.update);
		destroyContactMesh(this.scene, this.contact);
		this.scene.remove(this.contact);
		this.contact = null;
	}

	render() {
		this.resizer = new Resizer(this.camera, this.renderer, this.container);
		this.renderer.render(this.scene, this.camera);
	}

	resize() {
		this.resizer = new Resizer(this.camera, this.renderer, this.container);
		this.renderer.render(this.scene, this.camera);
	}

	update() {
		this.renderer.render(this.scene, this.camera);
	}

	addEventsListeners() {
		window.addEventListener("resize", this.resize.bind(this));
	}
}
