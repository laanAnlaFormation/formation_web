import Page from "@app/classes/Page";
import ProjectsGallery from "@app/classes/components/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Projects extends Page {
	constructor(lenis) {
		super({
			id: "projects",
			selectors: {
				fading: ".projects__wrapper",
			},
		});

		this.lenis = lenis;
	}

	create() {
		super.create();

		const projectsGallery = new ProjectsGallery(this.lenis);
	}
}
