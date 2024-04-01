import PageWebgl from "../pageWebgl";

export default class CreateHomeWebgl extends PageWebgl {
	constructor(width, height, scene) {
		super(scene);
		this.width = width;
		this.height = height;
		this.scene = scene;
		this.createObject();
		this.setPosition(this.width, this.height);
	}
}
