import Components from "@app/classes/Components";
import { gsap } from "gsap";

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
					duration: 0.6,
					yPercent: 0,
					stagger: 0.04,
					ease: "power4.inOut",
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
					duration: 0.6,
					stagger: 0.04,
					ease: "power4.inOut",
				},
				0
			)
			.to([this.elements.firstName, this.elements.lastName], {
				autoAlpha: 0,
				duration: 0.3,
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
					duration: 0.8,
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
		let loadedImages = 0;
		window.ASSETS.forEach((img) => {
			const image = new Image();
			image.crossOrigin = "anonymous";
			image.onload = () => {
				loadedImages++;
				this.percentage = Math.round((loadedImages / window.ASSETS.length) * 100);
				this.elements.number.innerHTML = `${this.percentage}%`;
				if (this.percentage === 100) {
					this.checkCompletion();
				}
			};
			image.src = img;
		});
	}

	imagesLoaded() {
		this.emit("finished");
	}

	destroy() {
		gsap.to(this.elements.preloader, {
			yPercent: -100,
			duration: 0.4,
			ease: "power4.inOut",
			onComplete: () => {
				this.elements.preloader.remove();
			},
		});
	}
}
