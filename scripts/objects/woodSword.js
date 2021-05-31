import { GameObject } from "../classes";

export class WoodSword extends GameObject {
	constructor(x, y, pickUpItemNum, width = 8, height = 16) {
		super();
		this.x = x;
		this.y = y;
		this.pickUpItemNum = pickUpItemNum;
		this.width = width;
		this.height = height;
		this.isPickUpItem = true;
	}
}
