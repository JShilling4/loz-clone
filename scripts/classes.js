class GameObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.newMap = 0;
        this.newLinkX = -1;
        this.newLinkY = -1;
        this.isPortal = false;
        this.counter = 0;
        this.imageNum = 0;
        this.isText = false;
        this.line1Full = "";
        this.line2Full = "";
        this.line1Current = "";
        this.line2Current = "";
        this.line1X = 0;
        this.line1Y = 0;
        this.line2X = 0;
        this.line2Y = 0;
        this.isOldMan = false;
        this.isPickUpItem = false;
        this.pickUpItemNum = 0;
        this.isFlame = false;
        this.isOldWoman = false;
        this.isRupee = false;
        this.rupeeValue = 1;
        this.isEnemy = false;
        this.enemyType = 0;
        this.nextX = 0;
        this.nextY = 0;
        this.isAttacking = false;
        this.health = 0;
        this.direction = "up";
        this.enemy = [];
        this.counter = 0;
        this.frame = 0;
        this.needsBounce = false;
        this.bounceX = 0;
        this.bounceY = 0;
    }
}

class MapBundle {
    constructor(m, o) {
        this.map = m;
        this.gameobjects = o;
    }
}

export { GameObject, MapBundle };