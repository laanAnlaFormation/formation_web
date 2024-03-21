import { gsap } from "gsap";

export default class Cursor {
	constructor() {
		this.cursorMove();
	}

	cursorMove() {
		gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

		const cursor = document.querySelector(".cursor");
		const allLinks = document.querySelectorAll("a");

		let pos = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		};

		let mouse = {
			x: pos.x,
			y: pos.y,
		};

		let speed = {
			sp: 0.1,
			sp2: 0.15,
		};

		let fpms = 60 / 1000;

		let xSet = gsap.quickSetter(cursor, "x", "px");
		let ySet = gsap.quickSetter(cursor, "y", "px");

		window.addEventListener("mousemove", (e) => {
			mouse.x = e.x;
			mouse.y = e.y;
		});

		gsap.ticker.add((time, deltaTime) => {
			let delta = deltaTime * fpms;
			let dt = 1.0 - Math.pow(1.0 - speed.sp, delta);

			pos.x += (mouse.x - pos.x) * dt;
			pos.y += (mouse.y - pos.y) * dt;

			xSet(pos.x);
			ySet(pos.y);
		});

		allLinks.forEach((link) => {
			link.addEventListener("mouseover", () => {
				gsap.to(cursor, {
					scale: 1.5,
					autoAlpha: 0,
					duration: 0.5,
					cursor: "grab",
				});
			});

			link.addEventListener("mouseout", () => {
				gsap.to(cursor, {
					scale: 1,
					autoAlpha: 1,
				});
			});
		});

		// special thanks to Blake Bowen & Zack Saucier for most of the code.
	}
}
