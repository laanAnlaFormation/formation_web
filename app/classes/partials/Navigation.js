import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Navigation {
	constructor() {
		this.button = document.querySelector(".mobile--nav-toggle");
		this.menu = document.querySelector(".navigation__list");
		this.span = document.querySelector(".mobile--area span");
		this.logo = document.querySelector(".navigation__logo a");
		this.links = gsap.utils.toArray(".navigation__item a");
		this.linksReverse = this.links.slice().reverse();

		this.createNavigation();
		this.animateNavigation();
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

	animateNavigation() {
		ScrollTrigger.create({
			start: 50,
			onEnter: ({ direction }) => {
				this.scrollAnimation(direction);
			},
			onLeaveBack: ({ direction }) => {
				this.scrollAnimation(direction);
			},
		});
	}

	scrollAnimation(direction) {
		const scrollToBottom = direction === 1;
		const linksAnimation = scrollToBottom ? this.links : this.linksReverse;
		gsap.to(linksAnimation, {
			autoAlpha: () => {
				return scrollToBottom ? 0 : 1;
			},
			duration: 0.2,
			stagger: 0.05,
		});
	}
}
