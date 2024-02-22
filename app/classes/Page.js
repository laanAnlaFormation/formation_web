import Navigation from "@app/classes/partials/Navigation";

export default class Page {
	constructor({ id }) {
		this.id = id;
	}

	create() {
		this.navigation = new Navigation();
	}
}
