import Home from "@pages/home";
import Work from "@pages/work";
import About from "@pages/about";
import Contact from "@pages/contact";
import Painting from "@pages/painting";
import Illustrations from "@pages/illustrations";
import Projects from "@pages/projects";

class App {
	constructor() {
		this.createContent();
		this.createPages();
		this.addSpaLinksListeners();

		this.addEventListener();
		this.addPopStateListener();
		this.updatePage(window.location.pathname);
	}

	createContent() {
		this.content = document.querySelector(".content");
		this.template = this.content.getAttribute("data-template");
	}

	createPages() {
		this.pages = {
			home: new Home(),
			work: new Work(),
			about: new About(),
			contact: new Contact(),
			painting: new Painting(),
			illustrations: new Illustrations(),
			projects: new Projects(),
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

				this.page.create();
			} else {
				// Gestion des réponses autres que 200
				throw new Error(`Échec de la requête avec le statut : ${request.status}`);
			}
		} catch (error) {
			console.error("Erreur lors du changement de page : ", error);
			// Redirection vers la page 404
			window.location.href = "/404.html"; // Assurez-vous que le chemin est correct pour votre page 404
		}
	}

	addPopStateListener() {
		window.addEventListener("popstate", () => {
			this.updatePage(window.location.pathname);
		});
	}
}

new App();
