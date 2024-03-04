import { gsap } from "gsap";

export default class ExpandTitle {
	constructor() {
		this.expandTitle();
	}

	expandTitle() {
		const logo = document.querySelector(".logo-expanded");
		const originalText = logo.innerText;
		const letters = originalText.replace(/ /g, "\u00A0").split("");

		const targetIndexA = letters.indexOf("A");
		const targetIndexL = letters.indexOf("L", targetIndexA + 1);
		logo.innerHTML = "";

		let totalWidthBetweenAandL = 1;
		const scaleFactor = 0.25; // Facteur de mise à l'échelle pour A et L

		letters.forEach((letter, idx) => {
			const letterSpan = document.createElement("span");
			letterSpan.textContent = letter;
			letterSpan.style.display = "inline-block";
			letterSpan.style.position = "relative";
			letterSpan.style.transformOrigin = "top left";

			logo.appendChild(letterSpan);

			if (idx > targetIndexA && idx < targetIndexL) {
				totalWidthBetweenAandL += letterSpan.offsetWidth;
			}
		});
		const extraSpace = 3;
		const aSpan = logo.querySelectorAll("span")[targetIndexA];
		const lSpan = logo.querySelectorAll("span")[targetIndexL];
		const lucienSpans = Array.from(logo.querySelectorAll("span")).slice(targetIndexL);
		const adjustedWidthToMove = totalWidthBetweenAandL + aSpan.offsetWidth * (1 - scaleFactor) - extraSpace;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: logo,
				start: "+=10",
				end: "+=30%",
				scrub: true,
			},
		});
		tl.to([aSpan, lSpan], {
			scale: scaleFactor,
			ease: "power4.inOut",
		});
		tl.to(
			lucienSpans,
			{
				x: -adjustedWidthToMove,
				ease: "power4.inOut",
			},
			0
		);

		letters.forEach((letter, index) => {
			if (index !== targetIndexA && index !== targetIndexL) {
				const letterSpan = logo.querySelectorAll("span")[index];
				tl.to(
					letterSpan,
					{
						autoAlpha: 0,
						scale: scaleFactor,
						transformOrigin: "left top",
						ease: "power4.inOut",
					},
					0
				); // Démarre en même temps que la mise à l'échelle
			}
		});
	}
}
