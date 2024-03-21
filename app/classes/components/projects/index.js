import Components from "@app/classes/Components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ProjectsGallery extends Components {
	constructor(lenis) {
		super({
			selectors: {
				scroller: ".projects",
				section: ".projects__section",
				wrapper: ".projects__wrapper",
			},
		});
		this.selectElements();
		this.lenis = lenis;
		this.createGallery();
	}

	createGallery() {
		this.sections = gsap.utils.toArray(this.elements.section);

		this.sections.forEach((section, idx) => {
			gsap.set(section, { transformOrigin: "center top" });
			gsap.fromTo(
				section,
				{
					scale: idx >= this.sections.length - 1 ? 1 : 0.9,
				},
				{
					scale: 1,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: "top bottom",
						end: "+=100%",
						scrub: true,
					},
				}
			);

			gsap.to(section, {
				filter: idx >= this.sections.length - 1 ? "none" : "blur(1.5rem)",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: "+=100%",
					scrub: true,
				},
			});

			ScrollTrigger.create({
				immediateRender: false,
				trigger: section,
				//pin: idx >= this.sections.length - 1 ? false : true,
				pin: true,
				start: "top top",
				end: "+=100%",
				//pinSpacing: idx >= this.sections.length - 1 ? true : false,
				pinSpacing: false,
				markers: true,
			});
		});
	}
}
