import Navigation from "@app/classes/partials/Navigation";
import Footer from "@app/classes/partials/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Page {
	constructor({ id, selectors = {} }) {
		this.id = id;
		this.selectors = selectors;
		this.elements = {};
	}

	create() {
		this.selectElements();
		this.navigation = new Navigation();
		this.footer = new Footer();
	}

	selectElements() {
		// Parcourir l'objet selectors pour sélectionner les éléments
		Object.keys(this.selectors).forEach((key) => {
			const selector = this.selectors[key];
			// Utiliser querySelectorAll pour récupérer tous les éléments correspondants
			const elements = document.querySelectorAll(selector);
			// Convertir le NodeList en Array en utilisant l'opérateur de décomposition
			this.elements[key] = [...elements];
		});
	}

	hide() {
		console.log("methode hide");
		const target = [this.elements.fading, this.elements.navigation];
		return new Promise((resolve) => {
			gsap.to(target, {
				autoAlpha: 0,
				//duration: 0.5,
				onComplete: resolve,
			});
		});
	}

	show() {
		console.log("methode show");
		const target = this.elements.fading;
		return new Promise((resolve) => {
			gsap.fromTo(
				target,
				{ autoAlpha: 0, y: 50 },
				{
					autoAlpha: 1,
					duration: 0.5,
					y: 0,
					onComplete: () => {
						ScrollTrigger.refresh(), resolve();
					},
				}
			);
		});
	}

	destroy() {}
}
