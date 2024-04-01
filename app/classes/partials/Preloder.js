import Components from "@app/classes/Components";
import { gsap } from "gsap";
//import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

export default class Preloader extends Components {
	constructor() {
		super({
			selectors: {
				preloader: ".preloader",
				firstName: ".preloader__title--one",
				lastName: ".preloader__title--two",
				subTitle: ".preloader__sub-title",
				number: ".preloader__number",
			},
		});
		this.selectElements();
		this.timelineCompleted = false;
		window.TEXTURES = {};
		this.createPreloader();
	}

	createPreloader() {
		this.initSplit();
		this.initPreloader();
	}

	splitText(element, className) {
		const letters = element.textContent.split("");
		const spannedLetters = letters.map((letter) => `<span class="${className}">${letter}</span>`).join("");
		element.innerHTML = spannedLetters;
	}

	initSplit() {
		this.splitText(this.elements.firstName, "first-name");
		this.splitText(this.elements.lastName, "last-name");
		this.splitText(this.elements.subTitle, "sub-title");

		gsap.set([".first-name", ".last-name"], { display: "inline-block", autoAlpha: 0 });
		this.tl = new gsap.timeline({
			delay: 0.5,
			onComplete: () => {
				this.timelineCompleted = true;
				this.checkCompletion();
			},
		})
			.fromTo(
				".first-name",
				{
					yPercent: -150,
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					duration: 0.9,
					yPercent: 0,
					stagger: 0.03,
					ease: "expo.inOut",
				}
			)
			.fromTo(
				".last-name",
				{
					yPercent: 150,
					autoAlpha: 0,
				},
				{
					yPercent: 0,
					autoAlpha: 1,
					duration: 0.9,
					stagger: 0.03,
					ease: "expo.inOut",
				},
				0
			)
			.to([this.elements.firstName, this.elements.lastName], {
				autoAlpha: 0,
				duration: 0.4,
				delay: 0.8,
				onComplete: () => {
					gsap.to([this.elements.firstName, this.elements.lastName], {
						display: "none",
					});
				},
			})
			.to(this.elements.subTitle, {
				display: "inline-block",
			})
			.fromTo(
				".sub-title",
				{
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					duration: 0.9,
					stagger: 0.01,
					ease: "power4.out",
				}
			);
	}

	checkCompletion() {
		if (this.percentage === 100 && this.timelineCompleted) {
			this.imagesLoaded();
		}
	}

	initPreloader() {
		// Initialisation du pourcentage à 0
		this.percentage = 0;
		this.elements.number.innerHTML = `${this.percentage}%`;

		// Promesses pour le chargement des textures Three.js
		const texturePromises = window.ASSETS.map((asset, index, array) => {
			return new Promise((resolve, reject) => {
				new TextureLoader().load(
					asset,
					(texture) => {
						window.TEXTURES[asset] = texture;

						// Mise à jour de la progression
						this.percentage = ((index + 1) / array.length) * 100;
						this.elements.number.innerHTML = `${Math.round(this.percentage)}%`;

						resolve();
					},
					undefined,
					reject
				);
			});
		});

		// Attendre que toutes les textures et images classiques soient chargées
		Promise.all(texturePromises)
			.then(() => {
				// Toutes les ressources sont chargées
				this.percentage = 100;
				this.elements.number.innerHTML = `${this.percentage}%`;
				this.checkCompletion();
			})
			.catch((error) => {
				console.error("Erreur lors du chargement des ressources :", error);
			});
	}

	imagesLoaded() {
		this.emit("finished");
	}

	destroy() {
		gsap.to(this.elements.preloader, {
			//yPercent: -100,
			autoAlpha: 0,
			duration: 0.9,
			ease: "power4.inOut",
			onComplete: () => {
				this.elements.preloader.remove();
			},
		});
	}
}
