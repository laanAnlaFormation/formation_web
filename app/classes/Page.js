import Navigation from "@app/classes/partials/Navigation";
import Footer from "@app/classes/partials/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./utils/Cursor";

gsap.registerPlugin(ScrollTrigger);

export default class Page {
	constructor({ id, selectors = {} }) {
		this.id = id;
		this.selectors = selectors;
		this.elements = {};
	}

	create(lenis) {
		this.selectElements();
		//this.svgWiper = new Wiper();
		this.cursor = new Cursor();
		this.navigation = new Navigation(this.lenis);
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
				duration: 0.5,
				ease: "power4.inOut",
				//delay: 1,
				onComplete: () => {
					resolve();
				},
			});
		});
	}

	show() {
		console.log("methode show");
		const target = this.elements.fading;
		return new Promise((resolve) => {
			gsap.fromTo(
				target,
				{
					autoAlpha: 0,
					y: 50,
				},
				{
					autoAlpha: 1,
					duration: 0.6,
					y: 0,
					onComplete: () => {
						resolve();
						ScrollTrigger.refresh(true);
					},
				}
			);
		});
	}

	destroy() {}
}
