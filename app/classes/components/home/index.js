import Components from "@app/classes/Components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitTextToSpans from "@app/classes/utils/SplitTextToSpan";

gsap.registerPlugin(ScrollTrigger);

export default class HomeAnimations extends Components {
	constructor(lenis) {
		super({
			selectors: {
				title: ".home__section--left-title h2",
				paragraph: ".home__section--left-paragraph p",
				antonin: ".navigation__logo",
				images: ".mobile-animation",
			},
		});
		this.selectElements();
		//this.lenis = lenis;

		this.initAnimations();
	}

	initAnimations() {
		this.animateAntonin();
		if (window.innerWidth < 1024) {
			this.animImage();
		}

		this.createTitle();
		this.createParagraph();
	}

	animateAntonin() {
		gsap.fromTo(
			this.elements.antonin,
			{
				autoAlpha: 0,
				y: 30,
			},
			{
				autoAlpha: 1,
				duration: 0.5,
				y: 0,
			}
		);
	}

	animImage() {
		this.elements.images.forEach((image) => {
			gsap.set(image, { autoAlpha: 0, y: 50, scaleY: 0.25 });
			gsap.to(image, {
				y: 0,
				scaleY: 1,
				autoAlpha: 1,
				duration: 0.8,
				ease: "power4.inOut",
				scrollTrigger: {
					trigger: image,
					start: "top bottom",
					end: "bottom center",
				},
			});
		});
	}

	createTitle() {
		this.elements.title.forEach((title) => {
			const splitTextToSpans = new SplitTextToSpans(title);
			gsap.set(title.querySelectorAll(".word > span"), { yPercent: 103 });
			title.querySelectorAll(".word > span").forEach((div) => {
				gsap.to(div, {
					yPercent: 0,
					duration: 0.9,
					ease: "power4.inOut",
					stagger: 0.05,
					scrollTrigger: {
						trigger: div,
						start: "top bottom-=50",
					},
				});
			});
		});
	}

	createParagraph() {
		this.elements.paragraph.forEach((paragraph) => {
			const splitTextToSpans = new SplitTextToSpans(paragraph);
			gsap.set(paragraph.querySelectorAll(".word"), {
				autoAlpha: 0.1,
			});
			paragraph.querySelectorAll(".word").forEach((div) => {
				gsap.to(div, {
					autoAlpha: 1,
					ease: "power4.inOut",
					scrollTrigger: {
						trigger: div,
						start: "top bottom-=50",
						end: "bottom center",
					},
				});
			});
		});
	}

	destroy() {
		ScrollTrigger.killAll();
		this.elements.title = null;
		this.elements.paragraph = null;
		this.elements.antonin = null;
		console.log("destroy home");
	}
}
