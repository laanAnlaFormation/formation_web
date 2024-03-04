export default class SplitTextToSpans {
	constructor(element) {
		this.element = element;
		this.splitTextToSpans();
	}

	splitTextToSpans(element) {
		const words = this.element.innerText.split(" ");
		this.element.innerHTML = "";
		words.forEach((word, idx) => {
			this.element.appendChild(this.createWordSpan(word));
			if (idx < words.length - 1) {
				this.element.appendChild(document.createTextNode(" "));
			}
		});
	}

	createWordSpan(word) {
		const div = document.createElement("div");
		div.classList.add("word");
		const wordSpan = document.createElement("span");
		wordSpan.textContent = word;
		wordSpan.style.display = "inline-block";
		div.appendChild(wordSpan);
		return div;
	}
}
