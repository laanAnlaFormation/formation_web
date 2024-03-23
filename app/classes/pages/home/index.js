import Page from "@app/classes/Page";
import HomeAnimations from "@app/classes/components/home";
import ExpandTitle from "@app/classes/utils/ExpandTitle";

export default class Home extends Page {
	constructor() {
		super({
			id: "home",
			selectors: {
				fading: ".home__wrapper",
				navigation: ".header-expanded",
			},
		});
	}

	create() {
		super.create();
		if (window.innerWidth > 1024) {
			this.expandTitle = new ExpandTitle();
		}
		this.homeAnimations = new HomeAnimations();
	}

	destroy() {
		super.destroy();
		this.homeAnimations.destroy();
	}
}
