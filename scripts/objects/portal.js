import { GameObject } from "../classes";

export class Portal extends GameObject {
	constructor(x, y, newLinkX, newLinkY, width = 8, height = 16, newMap = 1) {
        super();
		this.x = x;
		this.y = y;
        this.newLinkX = newLinkX;
		this.newLinkY = newLinkY;
		this.width = width;
		this.height = height;
		this.newMap = newMap;
		this.isPortal = true;
	}
}
