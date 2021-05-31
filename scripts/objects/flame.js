import { GameObject } from "../classes";

export class Flame extends GameObject {
	constructor(x, y, width = 16, height = 16, newMap = 0) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.newMap = newMap;
		this.isFlame = true;
	}
}
