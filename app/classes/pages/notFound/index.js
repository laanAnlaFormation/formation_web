import Page from "@app/classes/Page";

export default class NotFound extends Page {
	constructor() {
		super({
			id: "notFound",
			selectors: {
				fading: ".not-found__wrapper",
			},
		});
	}
}
