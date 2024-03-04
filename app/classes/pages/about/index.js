import Page from "@app/classes/Page";
import AboutAnimations from "../../components/about";

export default class About extends Page {
	constructor() {
		super({
			id: "about",
			selectors: {
				fading: ".about__wrapper",
				navigation: ".navigation__header",
			},
		});
	}

	create() {
		super.create();
		this.aboutAnimations = new AboutAnimations();
	}
	destroy() {
		super.destroy();
		this.aboutAnimations.destroy();
	}
}
