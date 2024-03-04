export default class Footer {
	constructor() {
		this.footer = document.querySelector("footer");
		this.lightModeButton = document.querySelector("div.toggle-switch");

		this.createFooter();
		this.createLightMode();
		this.applyInitialTheme();
	}

	createFooter() {
		this.footer.addEventListener("click", () => {
			const visibility = this.footer.getAttribute("data-visible");

			if (visibility === "false") {
				this.footer.setAttribute("data-visible", true);
				this.footer.classList.add("active__footer");
			} else if (visibility === "true") {
				this.footer.setAttribute("data-visible", false);
				this.footer.classList.remove("active__footer");
			}
		});
	}

	createLightMode() {
		const page = document.documentElement;

		this.lightModeButton.addEventListener("click", (event) => {
			event.stopPropagation();
			const currentTheme = page.getAttribute("data-theme");
			const newTheme = currentTheme === "dark" ? "light" : "dark";
			page.setAttribute("data-theme", newTheme);
			this.lightModeButton.classList.add("is-switched-mode");
			localStorage.setItem("theme", newTheme);
		});
	}

	applyInitialTheme() {
		const savedTheme = localStorage.getItem("theme");

		const page = document.documentElement;

		if (savedTheme) {
			page.setAttribute("data-theme", savedTheme);
			if (savedTheme === "light") {
				this.lightModeButton.classList.add("is-switched-mode");
			} else {
				this.lightModeButton.classList.remove("is-switched-mode");
			}
		}
	}
}
