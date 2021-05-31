import { GameObject } from "../classes";

export class Octorok extends GameObject {
	constructor(x, y, enemyType, direction, width = 16, height = 16) {
		super();
		this.x = x;
		this.y = y;
		this.enemyType = enemyType;
		this.direction = direction;
		this.width = width;
		this.height = height;
		this.isEnemy = true;
	}
}
