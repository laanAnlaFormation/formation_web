import Page from "@app/classes/Page";

export default class NotFound extends Page {
	constructor() {
		super({
			id: "404",
			selectors: {
				fading: ".not-found__wrapper",
			},
		});
	}
}
