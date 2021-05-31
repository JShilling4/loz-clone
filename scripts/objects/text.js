import { GameObject } from "../classes";

export class Text extends GameObject {
	constructor(line1Full, line2Full, line1X, line1Y, line2X, line2Y) {
		super();
		this.line1Full = line1Full;
		this.line2Full = line2Full;
		this.line1X = line1X;
		this.line1Y = line1Y;
		this.line2X = line2X;
		this.line2Y = line2Y;
		this.isText = true;
	}
}
