import { gsap } from "gsap";

export default class ExpandTitle {
	constructor() {
		this.logo = document.querySelector(".logo-expanded");
		this.scaleFactor = 0.27;
		this.expandTitle();
		this.addResizeListener();
	}

	addResizeListener() {
		//window.addEventListener("resize", this.handleResize.bind(this));
		this.handleResize(); // Appel initial pour ajuster immédiatement scaleFactor
	}

	handleResize() {
		const minFontSize = 60; // La taille minimale de la police en pixels
		const currentFontSize = parseFloat(window.getComputedStyle(this.logo).fontSize);
		const minScaleFactor = minFontSize / currentFontSize;

		if (this.scaleFactor < minScaleFactor) {
			this.scaleFactor = minScaleFactor;
		} else {
			// Réinitialiser à la valeur par défaut ou à une autre logique si nécessaire
			this.scaleFactor = 0.27; // ou une autre valeur adaptée à la situation
		}

		// Assurez-vous de réappliquer ou de mettre à jour les animations avec le nouveau scaleFactor ici si nécessaire
		this.expandTitle(); // Par exemple, réappliquer les animations pour prendre en compte le nouveau scaleFactor
	}

	expandTitle() {
		if (!this.logo) return;
		const logo = document.querySelector(".logo-expanded");
		const logoIsShrinked = document.querySelector(".logo-is-shrinked");
		const originalText = logo.innerText;
		const letters = originalText.replace(/ /g, "\u00A0").split("");

		// Supposons que `element` est votre élément cible
		const originalFontSize = parseFloat(window.getComputedStyle(logo).fontSize);
		const minFontSize = 60;
		const currentFontSize = parseFloat(window.getComputedStyle(logo).fontSize);

		const targetIndexA = letters.indexOf("A");
		const targetIndexL = letters.indexOf("L", targetIndexA + 1);

		logo.innerHTML = "";

		let totalWidthBetweenAandL = 1;
		let scaleFactor = 0.27;
		const minScaleFactor = minFontSize / currentFontSize;
		if (scaleFactor < minScaleFactor) {
			scaleFactor = minScaleFactor;
		}

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
		const extraSpace = 2;
		const aSpan = logo.querySelectorAll("span")[targetIndexA];
		const lSpan = logo.querySelectorAll("span")[targetIndexL];
		const lucienSpans = Array.from(logo.querySelectorAll("span")).slice(targetIndexL);
		const adjustedWidthToMove = totalWidthBetweenAandL + aSpan.offsetWidth * (1 - scaleFactor) - extraSpace;

		//gsap.set(logoIsShrinked, { autoAlpha: 0 });
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: logo,
				start: "+=5",
				end: "+=30%",
				scrub: true,
				onEnterBack: () => {
					gsap.fromTo(
						logo,
						{
							display: "inline-block",
							autoAlpha: 0,
						},
						{
							autoAlpha: 1,
							ease: "power2.inOut",
						}
					);
				},
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
				onComplete: () => {
					gsap.to(logo, {
						display: "none",
					});
				},
			},
			0
		);
		tl.to(logoIsShrinked, {
			autoAlpha: 1,
			duration: 0,
		});

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
				);
			}
		});
	}

	destroy() {
		// Supprimer l'écouteur d'événements 'resize'
		window.removeEventListener("resize", this.handleResize.bind(this));

		// Arrêter toutes les animations GSAP en cours sur les éléments ciblés
		gsap.killTweensOf(this.logo);
		const spans = this.logo.querySelectorAll("span");
		if (spans.length > 0) {
			spans.forEach((span) => gsap.killTweensOf(span));
		}

		// Optionnellement, nettoyer les styles en ligne ajoutés par GSAP
		this.logo.removeAttribute("style");
		spans.forEach((span) => span.removeAttribute("style"));

		// Si votre animation implique d'autres éléments que `this.logo`,
		// assurez-vous de les nettoyer également ici.

		// Supprimer le contenu de `this.logo` pour enlever les spans ajoutés
		this.logo.innerHTML = "";

		// Réinitialiser d'autres propriétés si nécessaire
		this.scaleFactor = 0.27; // Remettre la valeur par défaut ou selon la nécessité

		// Supprimer toute référence à ScrollTrigger si utilisé
		if (this.scrollTriggerInstance) {
			this.scrollTriggerInstance.kill();
			this.scrollTriggerInstance = null;
		}
	}
}
