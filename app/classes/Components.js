import EventEmitters from "events";

export default class Components extends EventEmitters {
	constructor({ selectors = {} }) {
		super();
		this.selectors = selectors;
		this.elements = {}; // Contiendra les éléments sélectionnés
	}

	selectElements() {
		// Parcourir l'objet selectors pour sélectionner les éléments
		Object.keys(this.selectors).forEach((key) => {
			const selector = this.selectors[key];
			// Utiliser querySelectorAll pour récupérer tous les éléments correspondants
			// et décider si on doit convertir le résultat en un seul élément ou garder le NodeList
			const elements = document.querySelectorAll(selector);
			this.elements[key] = elements.length === 1 ? elements[0] : elements;
		});
	}
}
