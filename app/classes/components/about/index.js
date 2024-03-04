import Components from "@app/classes/Components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitTextToSpans from "../../utils/splitTextToSpan";

gsap.registerPlugin(ScrollTrigger);

export default class AboutAnimations extends Components {
	constructor(lenis) {
		super({
			selectors: {
				title: ".about__gallery h1",
				paragraph: ".about__gallery--text p",
			},
		});
		this.selectElements();
		this.lenis = lenis;
		ScrollTrigger.refresh();
		this.initAnimations();
	}

	initAnimations() {
		this.createTitle();
		this.createParagraph();
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
						start: "top bottom-=100",
						end: "bottom center",
					},
				});
			});
		});
	}

	destroy() {
		ScrollTrigger.killAll();
	}
}
