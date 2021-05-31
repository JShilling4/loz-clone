import { GameObject } from "../classes";

export class Rupee extends GameObject {
	constructor(x, y, width = 8, height = 16) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.isPickUpItem = false;
		this.isRupee = true;
	}
}
