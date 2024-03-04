import Page from "@app/classes/Page";
import ContactAnimations from "@app/classes/components/contact";

export default class Contact extends Page {
	constructor() {
		super({
			id: "contact",
			selectors: {
				fading: ".contact__wrapper",
				navigation: ".navigation__header",
			},
		});
	}

	create() {
		super.create();

		this.contactAnimations = new ContactAnimations();
	}

	destroy() {
		super.destroy();
		this.contactAnimations.destroy();
	}
}
