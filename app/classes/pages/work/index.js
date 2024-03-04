import Page from "@app/classes/Page";

export default class Work extends Page {
	constructor() {
		super({
			id: "work",
			selectors: {
				fading: ".work__wrapper",
			},
		});
	}
}
