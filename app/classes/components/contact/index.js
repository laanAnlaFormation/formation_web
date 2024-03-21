import Components from "@app/classes/Components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitTextToSpans from "../../utils/SplitTextToSpan";
import FallingLetters from "../../utils/FallingLetters";

gsap.registerPlugin(ScrollTrigger);

export default class ContactAnimations extends Components {
	constructor(lenis) {
		super({
			selectors: {
				body: "body",
				title: ".contact__introduction__title__wrapper h1",
				paragraph: ".contact__introduction__paragraph__wrapper p",
				links: ".link--social",
			},
		});
		this.selectElements();
		this.lenis = lenis;

		this.initAnimations();
	}

	initAnimations() {
		this.createTitle();
		this.createParagraph();
		this.createFallingLetters();
	}

	createTitle() {
		const splitTextToSpans = new SplitTextToSpans(this.elements.title);
		const tl = gsap.timeline({
			//delay: this.delayIn,
		});
		gsap.set(this.elements.title.querySelectorAll(".word > span"), { yPercent: 103 });
		tl.to(this.elements.title.querySelectorAll(".word > span"), {
			yPercent: 0,
			duration: 0.9,
			ease: "power4.inOut",
			stagger: 0.05,
		});
	}

	createParagraph() {
		const splitTextToSpans = new SplitTextToSpans(this.elements.paragraph);
		gsap.set(this.elements.paragraph.querySelectorAll(".word"), {
			autoAlpha: 0.1,
		});
		this.elements.paragraph.querySelectorAll(".word").forEach((div) => {
			let startValue = window.innerWidth <= 1025 ? "top center" : "top center+=100";
			gsap.to(div, {
				autoAlpha: 1,
				ease: "power4.inOut",
				scrollTrigger: {
					trigger: div,
					start: startValue,
					end: "bottom center",
				},
			});
		});
	}

	createFallingLetters() {
		this.fallingLetters = new FallingLetters(this.elements.links);
	}

	destroy() {
		console.log("methode destroy");
		ScrollTrigger.killAll();
		if (this.fallingLetters) {
			this.fallingLetters.destroy();
		}
	}
}
