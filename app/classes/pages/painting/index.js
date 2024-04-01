import Page from "@app/classes/Page";
import GridPainting from "@app/classes/components/painting";

export default class Painting extends Page {
	constructor(lenis) {
		super({
			id: "painting",
			selectors: {
				fading: ".painting__wrapper",
				navigation: ".navigation__header",
			},
		});
		this.lenis = lenis;
		this.gridPainting = null; // Ajouter pour garder la référence
		this.observer = null; // Pour garder la référence à l'observer
	}

	create() {
		super.create();
		this.initLazyLoading();

		this.gridPainting = new GridPainting(this.lenis);
	}

	initLazyLoading() {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
		};
		this.observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target;
					const dataSrc = target.getAttribute("data-src");
					target.setAttribute("src", dataSrc);
					observer.unobserve(target);
				}
			});
		});

		const imagesStore = document.querySelectorAll(".painting__grid__item--image");
		imagesStore.forEach((image) => this.observer.observe(image));
	}

	destroy() {
		super.destroy();

		if (this.gridPainting) {
			this.gridPainting.destroy(); // Supposant que GridPainting a une méthode destroy
			this.gridPainting = null;
		}

		// Annuler l'observation de toutes les images
		if (this.observer) {
			const imagesStore = document.querySelectorAll(".painting__grid__item--image");
			imagesStore.forEach((image) => this.observer.unobserve(image));
			this.observer = null;
		}

		console.log("destroy painting main");
		// Autre nettoyage spécifique à la page peut être ajouté ici
	}
}
