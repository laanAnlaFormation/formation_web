import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Home from "@pages/home";
import About from "@pages/about";
import Contact from "@pages/contact";
import Painting from "@pages/painting";
import Preloader from "@app/classes/partials/Preloder";

gsap.registerPlugin(ScrollTrigger);

class App {
	constructor() {
		this.firstLoad = true;
		this.createPreloader();
		//this.initSmoothScrolling();
		//this.createContent();
		//this.createPages();
		// this.addSpaLinksListeners();

		// this.addPopStateListener();
		//this.updatePage(window.location.pathname);
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once("finished", this.onPreloaded.bind(this));
	}

	onPreloaded() {
		this.preloader.destroy();
		this.initSmoothScrolling();
		this.createContent();
		this.createPages();
		this.addSpaLinksListeners();

		this.addPopStateListener();
		if (!this.firstLoad) {
			this.updatePage(window.location.pathname);
		} else {
			this.page.show();
			this.firstLoad = false;
		}
	}

	createContent() {
		this.content = document.querySelector(".content");
		this.template = this.content.getAttribute("data-template");
	}

	createPages() {
		this.pages = {
			home: new Home(),
			about: new About(),
			contact: new Contact(),
			painting: new Painting(this.lenis),
		};
		this.page = this.pages[this.template];
		this.page.create();
	}

	updatePage(url) {
		this.onChange(url);
	}

	addSpaLinksListeners() {
		document.body.addEventListener("click", (event) => {
			const link = event.target.closest(".spa");
			if (link) {
				event.preventDefault();
				const url = new URL(link.href);
				window.history.pushState({}, "", url.pathname); // Mise à jour de l'URL sans rechargement
				this.updatePage(url.pathname);
			}
		});
	}

	async onChange(url) {
		try {
			await this.page.hide();

			this.page.destroy();

			const request = await window.fetch(url);
			if (request.status === 200) {
				const html = await request.text();
				const div = document.createElement("div");
				div.innerHTML = html;
				const divContent = div.querySelector(".content");

				if (!divContent) {
					throw new Error("Élément '.content' non trouvé dans la réponse HTML.");
				}

				this.template = divContent.getAttribute("data-template");
				if (!this.template) {
					throw new Error("Attribut 'data-template' manquant dans l'élément '.content'.");
				}

				this.content.setAttribute("data-template", this.template);
				this.content.innerHTML = divContent.innerHTML;

				this.page = this.pages[this.template];

				if (!this.page || typeof this.page.create !== "function") {
					throw new Error(`Page '${this.template}' non trouvée ou méthode 'create' non définie.`);
				}
				this.initSmoothScrolling();
				this.lenis.scrollTo((0, 0), { immediate: true });
				this.page.create();
				this.page.show();
			} else {
				// Gestion des réponses autres que 200
				throw new Error(`Échec de la requête avec le statut : ${request.status}`);
			}
		} catch (error) {
			console.error("Erreur lors du changement de page : ", error);
			// Redirection vers la page 404
			window.location.href = "/404"; // Assurez-vous que le chemin est correct pour votre page 404
		}
	}

	addPopStateListener() {
		window.addEventListener("popstate", () => {
			this.updatePage(window.location.pathname);
		});
	}

	initSmoothScrolling() {
		this.lenis = new Lenis({
			duration: 3,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			direction: "vertical",
			gestureDirection: "vertical",
			smooth: true,
			mouseMultiplier: 1,
			smoothTouch: false,
			touchMultiplier: 2,
			infinite: false,
		});

		this.updateSmoothScrolling = (time) => {
			if (this.lenis) {
				this.lenis.raf(time * 1000);
			}
		};

		this.lenis.on("scroll", () => {
			ScrollTrigger.update();
		});

		gsap.ticker.add(this.updateSmoothScrolling);
	}

	resize() {}

	update() {}

	destroy() {
		if (this.page && this.page.destroy) {
			this.page.destroy();
		}
	}
}

new App();
