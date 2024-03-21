import Components from "@app/classes/Components";
import { gsap } from "gsap";

export default class GridIllustrations extends Components {
	constructor(lenis) {
		super({
			selectors: {
				body: "body",
				images: ".illustrations__grid__item",
				title: ".illustrations__title",
				wrapper: ".illustrations__wrapper",
			},
		});
		this.selectElements();
		this.lenis = lenis;

		this.createGrid();
		this.inView = false;
		this.modal = null;
	}

	createGrid() {
		this.elements.images.forEach((item) => {
			item.addEventListener("click", () => {
				const scale = parseFloat(item.getAttribute("data-scale"));
				const xScale = parseFloat(item.getAttribute("data-xscale"));
				this.inView ? this.animateOut(item) : this.animateIn(item, scale, xScale);
			});
		});
	}

	animateIn(item, scale, xscale) {
		if (!this.modal) {
			this.createModal();
		}
		this.elements.wrapper.classList.add("is-modal-img");
		const isMobile = window.innerWidth <= 1025;
		const scaleImg = this.getScaleValue(scale, xscale, isMobile);
		const { x, y } = this.calculatePosition(item);

		this.timaline = gsap
			.timeline({
				onStart: () => {
					this.toggleItemVisibility(item, true);
				},
				onComplete: () => {
					this.lenis.stop();
				},
			})
			.to(item, {
				scale: scaleImg,
				duration: 0.8,
				ease: "expo.in",
				x: x,
				y: y,
			})
			.to(
				this.elements.title,
				{
					autoAlpha: 0,
					duration: 0.8,
					ease: "power4.inOut",
				},
				0
			)
			.to(
				this.modal,
				{
					autoAlpha: 1,
					duration: 0.5,
				},
				0
			);
		this.inView = true;
	}

	animateOut(item) {
		this.inView = false;
		this.toggleItemVisibility(item, false);
		this.timeline = gsap
			.timeline({
				onComplete: () => {
					this.elements.body.removeChild(this.modal);
					this.modal = null;
					this.elements.wrapper.classList.remove("is-modal-img");
					this.lenis.start();
				},
			})
			.to(item, {
				scale: 1,
				x: 0,
				y: 0,
				ease: "expo.in",
				duration: 0.8,
			})
			.to(
				this.elements.title,
				{
					autoAlpha: 1,
					duration: 0.8,
					ease: "power4.inOut",
				},
				0.5
			);
	}

	createModal() {
		this.modal = document.createElement("div");
		this.modal.classList.add("modal");
		this.elements.body.appendChild(this.modal);
	}

	calculatePosition(item) {
		let bounds = item.getBoundingClientRect();
		let x = -bounds.left + (window.innerWidth / 2 - bounds.width / 2);
		let y = -bounds.top + (window.innerHeight / 2 - bounds.height / 2);
		return { x, y };
	}

	getScaleValue(scale, xScale, isMobile) {
		if (scale >= 1 && xScale >= 1) {
			return isMobile ? 3 : 1.3;
		} else if (scale >= 1) {
			return isMobile ? 2 : 1.3;
		}
		return 1;
	}

	toggleItemVisibility(item, isVisible) {
		this.elements.images.forEach((notItem) => {
			if (notItem !== item) {
				gsap.to(notItem, { autoAlpha: isVisible ? 0 : 1, duration: 0.8, ease: "power1.inOut" });
			}
		});
	}
}
