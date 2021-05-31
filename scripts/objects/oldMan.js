import { GameObject } from "../classes";

export class OldMan extends GameObject {
	constructor(x, y, width = 16, height = 16) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.isOldMan = true;
	}
}
