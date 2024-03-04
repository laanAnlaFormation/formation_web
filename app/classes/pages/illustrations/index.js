import Page from "@app/classes/Page";
import GridIllustrations from "@app/classes/components/illustrations";

export default class Illustrations extends Page {
	constructor(lenis) {
		super({
			id: "illustrations",
			selectors: {
				fading: ".illustrations__wrapper",
			},
		});
		this.lenis = lenis;
	}

	create() {
		super.create();

		const gridIllustrations = new GridIllustrations(this.lenis);
	}
}
