console.log("hello World");

const button = document.querySelector(".mobile--nav-toggle");
const menu = document.querySelector(".navigation__list");
const span = document.querySelector(".mobile--area span");
const logo = document.querySelector(".navigation__logo a");

button.addEventListener("click", () => {
	const visibility = menu.getAttribute("data-visible");

	if (visibility === "false") {
		menu.setAttribute("data-visible", true);
		menu.classList.add("active");
		button.classList.add("active");
		span.classList.add("active");
		logo.classList.add("active");
	} else if (visibility === "true") {
		menu.setAttribute("data-visible", false);
		menu.classList.remove("active");
		button.classList.remove("active");
		span.classList.remove("active");
		logo.classList.remove("active");
	}
});

// footer

const footer = document.querySelector("footer");

footer.addEventListener("click", () => {
	const visibility = footer.getAttribute("data-visible");

	if (visibility === "false") {
		footer.setAttribute("data-visible", true);
		footer.classList.add("active__footer");
	} else if (visibility === "true") {
		footer.setAttribute("data-visible", false);
		footer.classList.remove("active__footer");
	}
});

const workPainting = document.querySelector(".painting__grid");
const images = document.querySelectorAll("img.images--modal");

if (workPainting) {
	images.forEach((img) => {
		img.addEventListener("click", () => {});
	});
}
