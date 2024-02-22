export default class Navigation {
	constructor() {
		this.button = document.querySelector(".mobile--nav-toggle");
		this.menu = document.querySelector(".navigation__list");
		this.span = document.querySelector(".mobile--area span");
		this.logo = document.querySelector(".navigation__logo a");

		this.createNavigation();
	}

	createNavigation() {
		this.button.addEventListener("click", () => {
			const visibility = this.menu.getAttribute("data-visible");

			if (visibility === "false") {
				this.menu.setAttribute("data-visible", true);
				this.menu.classList.add("active");
				this.button.classList.add("active");
				this.span.classList.add("active");
				this.logo.classList.add("active");
			} else if (visibility === "true") {
				this.menu.setAttribute("data-visible", false);
				this.menu.classList.remove("active");
				this.button.classList.remove("active");
				this.span.classList.remove("active");
				this.logo.classList.remove("active");
			}
		});
	}
}
