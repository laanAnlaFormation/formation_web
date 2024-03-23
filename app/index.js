import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Home from "@pages/home";
import About from "@pages/about";
import Contact from "@pages/contact";
import Painting from "@pages/painting";
import Preloader from "@app/classes/partials/Preloder";
import World from "@app/classes/components/canvas/World";
import NotFound from "./classes/pages/notFound";
import Wiper from "./classes/partials/Wiper";

gsap.registerPlugin(ScrollTrigger);

class App {
	constructor() {
		this.firstLoad = true;
		this.createPreloader();

		//let pageName = window.location.pathname.split("/").pop().toLowerCase();
		//this.pageNotFound = pageName === "404" || pageName === "notfound";

		// if (!this.pageNotFound) {
		// 	this.createPreloader();
		// } else {
		// }
		this.svgWiper = new Wiper();

		//this.createContent();
		// //this.lenis.scrollTo((0, 0), { immediate: true });
		// this.initSmoothScrolling();
		// this.createPages();
		// this.createWorld();
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
		this.lenis.scrollTo((0, 0), { immediate: true });
		this.createWorld();
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
		console.log(this.lenis);
		this.pages = {
			home: new Home(),
			about: new About(),
			contact: new Contact(this.lenis),
			painting: new Painting(this.lenis),
			notFound: new NotFound(),
		};
		this.page = this.pages[this.template];
		this.page.create(this.lenis);

		this.onResize();
	}

	createWorld() {
		this.container = document.querySelector("#scene-container");
		this.world = new World(this.container, this.template, this.lenis);
		this.world.render();
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
			//const wiperPromise = this.svgWiper.startSvgWrapper();
			//this.lenis.destroy();
			const wiperPromise = this.svgWiper.startSvgWrapper();
			await this.page.hide();
			let seoData = null;

			let pageName = url.split("/").pop().toLowerCase(); // Extrait 'work', 'about', etc. de l'URL
			if (url === "/" || pageName === "") {
				pageName = "home"; // Utilise 'home' pour l'URL de base
			}

			const seoResponse = await fetch(`/api/seo/${pageName}`);
			if (seoResponse.ok) {
				seoData = await seoResponse.json();
				console.log(seoData);
			}
			if (seoData) {
				document.title = seoData.title;
				const metaDescription = document.querySelector('meta[name="description"]');
				metaDescription.setAttribute("content", seoData.description);
			}

			if (this.world.destroyHome) {
				this.world.destroyHome(); // Assurez-vous que cette méthode retourne une Promise
			}
			if (this.world.destroyAbout) {
				this.world.destroyAbout();
			}
			// await this.page.hide();
			this.page.destroy();
			// Si l'animation destroyHome doit être effectuée avant chaque changement de page
			await wiperPromise;
			// Ensuite, démarrez l'animation de transition de page (wiper, par exemple)
			// const wiperPromise = this.svgWiper.startSvgWrapper();
			// await wiperPromise;

			// End SEO
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

				//this.svgWiper = new Wiper();
				if (!this.page || typeof this.page.create !== "function") {
					throw new Error(`Page '${this.template}' non trouvée ou méthode 'create' non définie.`);
				}
				// this.initSmoothScrolling();
				this.lenis.scrollTo((0, 0), { immediate: true });
				// this.world.onChange(this.template);
				this.page.create();
				this.world.onChange(this.template);
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
			//autoResize: true,
			//infinite: false,
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

	onResize() {
		if (this.world && this.world.resize) {
			this.world.resize();
		}
	}

	onUpdate() {}

	destroy() {
		if (this.page && this.page.destroy) {
			this.page.destroy();
		}
	}
}

new App();
