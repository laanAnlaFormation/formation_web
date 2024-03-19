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
		this.initLazyLoading();

		const grigPainting = new GridPainting(this.lenis);
	}

	initLazyLoading() {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
		};

		const callback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target;
					const dataSrc = target.getAttribute("data-src");
					target.setAttribute("src", dataSrc);
					observer.unobserve(target);
				}
			});
		};

		const observer = new IntersectionObserver(callback, options);
		const imagesStore = document.querySelectorAll(".painting__grid__item--image");

		imagesStore.forEach((image) => observer.observe(image));
	}
}
