import Page from "@app/classes/Page";
import GridPainting from "@app/classes/components/painting";

export default class Painting extends Page {
	constructor(lenis) {
		super({
			id: "painting",
			selectors: {
				fading: ".painting__wrapper",
				navigation: ".navigation__header",
			},
		});
		this.lenis = lenis;
	}

	create() {
		super.create();

		const grigPainting = new GridPainting(this.lenis);
	}
}
