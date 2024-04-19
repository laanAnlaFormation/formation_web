import Components from "@app/classes/Components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class GridPainting extends Components {
	constructor(lenis) {
		super({
			selectors: {
				body: "body",
				images: ".painting__grid__item",
				title: ".painting__title",
				wrapper: ".painting__wrapper",
			},
		});
		this.selectElements();
		this.lenis = lenis;
		this.timeoutId = null;

		this.timeoutId = setTimeout(() => {
			ScrollTrigger.refresh(true);
			this.createGrid();
		}, 100);

		this.inView = false;
		this.modal = null;

		document.addEventListener("click", (e) => {
			if (this.inView && !e.target.closest(".painting__grid__item")) {
				this.animateOut();
			}
		});
	}

	isInViewport(element) {
		const rect = element.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;

		const visibleArea = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

		return visibleArea >= element.offsetHeight * 0.5;
	}

	createGrid() {
		this.elements.images.forEach((item, index) => {
			if (!this.isInViewport(item)) {
				gsap.set(item, { autoAlpha: 0 });
				gsap.to(item, {
					autoAlpha: 1,
					duration: 0.6,
					scrollTrigger: {
						trigger: item,
						start: "top bottom",
						end: "bottom bottom",
						immediateRender: false,
					},
				});
			}

			item.addEventListener("click", (e) => {
				e.stopPropagation(); // Empêche la propagation pour éviter la fermeture immédiate
				const scale = parseFloat(item.getAttribute("data-scale"));
				if (this.inView) {
					this.animateOut();
				} else {
					this.animateIn(item, scale);
				}
			});
		});
	}

	animateIn(item, scale) {
		if (!this.modal) {
			this.createModal();
		}

		this.currentlyExpandedItem = item;

		this.elements.wrapper.classList.add("is-modal-img");
		const name = item.getAttribute("data-name");
		const dimensions = item.getAttribute("data-dimensions");
		this.updateModalContent(name, dimensions);
		const isMobile = window.innerWidth <= 1025;
		const scaleImg = this.getScaleValue(scale, isMobile);
		const { x, y, transformOrigin } = this.calculatePosition(item, isMobile);

		this.timeline = gsap
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
				transformOrigin: transformOrigin,
				duration: 0.8,
				ease: "expo.in",
				x: isMobile ? x + 0 : x + 50,
				y: isMobile ? y + 0 : y + 50,
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
			)
			.to([this.modalName, this.modalDimensions], {
				autoAlpha: 1,
				duration: 0.5,
				ease: "power4.inOut",
				x: isMobile ? 0 : -200,
			});
		this.inView = true;
	}

	animateOut() {
		if (!this.inView) return; // Sort si rien n'est agrandi

		const item = this.currentlyExpandedItem;

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
			)
			.to(
				[this.modalName, this.modalDimensions],
				{
					autoAlpha: 0,
					duration: 0.5,
					ease: "power4.inOut",
				},
				0
			);
	}

	createModal() {
		this.modal = document.createElement("div");
		this.modal.classList.add("modal");
		this.elements.body.appendChild(this.modal);
		this.modalName = document.createElement("h3");
		this.modalName.classList.add("is-modal-h3");
		this.modalDimensions = document.createElement("p");
		this.modalDimensions.classList.add("is-modal-p");
		this.modal.appendChild(this.modalName);
		this.modal.appendChild(this.modalDimensions);
	}

	updateModalContent(name, dimensions) {
		this.modalName.textContent = name;
		this.modalDimensions.textContent = dimensions;
	}

	calculatePosition(item, isMobile) {
		let bounds = item.getBoundingClientRect();
		let x = isMobile ? -bounds.left + (window.innerWidth / 2 - bounds.width / 2) : -bounds.left;
		let y = isMobile ? -bounds.top + (window.innerHeight / 2 - bounds.height / 2) : -bounds.top;
		let transformOrigin = isMobile ? "center" : "top left";
		return { x, y, transformOrigin };
	}

	getScaleValue(scale, isMobile) {
		if (scale > 0 || (scale === 0 && isMobile)) {
			return isMobile ? 4 : 2;
		}
		return 1.5;
	}

	toggleItemVisibility(item, isVisible) {
		this.elements.images.forEach((notItem) => {
			if (notItem !== item) {
				gsap.to(notItem, {
					autoAlpha: isVisible ? 0 : 1,
					duration: isVisible ? 0.4 : 0.9,
					delay: isVisible ? 0 : 0.5,
					ease: "power1.inOut",
				});
			}
		});
	}

	destroy() {
		if (this.timeoutId !== null) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null; // Réinitialisez l'identifiant après l'avoir annulé
		}

		ScrollTrigger.killAll();
	}
}
