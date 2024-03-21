import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class FallingLetters {
	constructor(element) {
		this.element = element;
		this.createFallingLinks();
	}

	createFallingLinks() {
		const charMap = {
			INTSRARGM: "..STAG.A.",
			UINREUIT: "L.NK.D.N",
			ADTSUUTIOD: ".R..TA...N",
		};

		this.element.forEach((paragraphe) => {
			const text = paragraphe.innerText;
			const mappedString = charMap[text] || text;
			const letters = text.split("");
			paragraphe.innerHTML = "";

			letters.forEach((lettre, idx) => {
				const lettreDiv = this.createLetterDiv(lettre, mappedString, idx);
				paragraphe.appendChild(lettreDiv);
			});

			this.animateParagraph(paragraphe);
		});
	}

	createLetterDiv(lettre, mappedString, index) {
		const lettreDiv = document.createElement("div");
		lettreDiv.textContent = lettre;
		if (mappedString && index < mappedString.length) {
			lettreDiv.setAttribute("data-char", mappedString[index]);
		}
		return lettreDiv;
	}

	animateParagraph(paragraphe) {
		gsap.set(paragraphe.querySelectorAll("div"), { yPercent: -105 });
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: paragraphe,
				start: "top bottom",
				end: "bottom bottom",
			},
		});
		tl.to(paragraphe.querySelectorAll("div"), {
			yPercent: 0,
			duration: 0.7,
			stagger: 0.03,
		});
		tl.to(
			paragraphe.querySelectorAll("div:not([data-char='.'])"),
			{
				yPercent: 105,
				duration: 0.5,
				stagger: 0.05,
			},
			">0.5"
		);
	}

	destroy() {
		ScrollTrigger.killAll();
	}
}
