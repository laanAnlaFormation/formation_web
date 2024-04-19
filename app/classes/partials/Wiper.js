import { gsap } from "gsap";

export default class Wiper {
	constructor() {}

	// setupLinks() {
	// 	const links = document.querySelectorAll("a.spa");
	// 	links.forEach((link) => {
	// 		link.addEventListener("click", (e) => {
	// 			e.preventDefault();
	// 			this.startSvgWrapper(() => {
	// 				window.location.href = link.href;
	// 			});
	// 		});
	// 	});
	// }

	startSvgWrapper() {
		return new Promise((resolve) => {
			const path = document.querySelector(".path");
			const svgWrapper = document.querySelector(".wrapper__svg");

			const animate = () => {
				const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
				const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
				const tl = gsap.timeline({
					repeat: 1,
					yoyo: true,
					repeatDelay: 0.2,
					onComplete: () => {
						gsap.set(svgWrapper, { autoAlpha: 0 });
						resolve(); // Résout la Promise une fois l'animation terminée
					},
				});
				tl
					.set(svgWrapper, { autoAlpha: 1 })
					.to(path, { duration: 0.6, attr: { d: start }, ease: "power2.in" })
					.to(path, { duration: 0.6, attr: { d: end }, ease: "power2.out" });
			};

			animate();
		});
	}
}
