<script>
	import { onMount } from "svelte";
    import { GameObject } from "../scripts/classes";
    import maps from "../scripts/maps";

	let canvas;
	let ctx;
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.body.style.zoom = "345%";
	let fps = 60;
	let rightPressed = false;
	let leftPressed = false;
	let upPressed = false;
	let downPressed = false;
    let worldTiles = new Image();
	worldTiles.src = "images/tiles-overworld.png";
	let link1 = new Image();
	link1.src = "images/link.png";
	let hud = new Image();
	hud.src = "images/pausescreen.png";
	let chars1 = new Image();
	chars1.src = "/images/chars.png";
	let chars2 = new Image();
	chars2.src = "/images/chars2.png";
	let enemies = new Image();
	enemies.src = "/images/enemies.png";
	let animationCounter = 0;
	let currentAnimation = 0;
	let animationSpeed = 10;
	let lastButtonPressed = "up";
	let linkY = 135;
	let linkX = 116;
	let gameObjects = [];
	let gameMap = null;
	let lastPickUpItem = 0;
	let playPickUpItemAnimation = false;
	let rupeeAmount = 0;
	let linkHearts = 3;
	let currentLinkHearts = 3;
	let keyAmount = 0;
	let bombAmount = 0;
	let swordEquipped = 0;
	let hasSword = false;
	let isAttacking = false;
	let canAttackAgain = true;

	onMount(async () => {
		canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
	});

    // game functions
	function playSound(source) {
		let sound = new Audio();
		sound.src = source;
		sound.play();
	}

	function keyDownHandler(e) {
		if (e.keyCode == 37) {
			leftPressed = true;
			lastButtonPressed = "left";
		} else if (e.keyCode == 39) {
			rightPressed = true;
			lastButtonPressed = "right";
		} else if (e.keyCode == 38) {
			upPressed = true;
			lastButtonPressed = "up";
		} else if (e.keyCode == 40) {
			downPressed = true;
			lastButtonPressed = "down";
		}
		if (e.keyCode == 70 && canAttackAgain && hasSword) {
			isAttacking = true;
			currentAnimation = 0;
			canAttackAgain = false;
			playSound("./sounds/LOZ_sword_slash.wav");
		}
	}

	function keyUpHandler(e) {
		if (e.keyCode == 37) {
			leftPressed = false;
		} else if (e.keyCode == 39) {
			rightPressed = false;
		} else if (e.keyCode == 38) {
			upPressed = false;
		} else if (e.keyCode == 40) {
			downPressed = false;
		}
	}

	function drawLink() {
		let speed = 2;
		animationCounter++;
		if (playPickUpItemAnimation) {
			animationCounter++;
			if (animationCounter < 300) {
				ctx.drawImage(link1, 1, 150, 16, 16, linkX, linkY, 16, 16);
			} else {
				playPickUpItemAnimation = false;
			}
			//0 - boomerang
			//1 - bomb
			//2 - bow and arrow
			//3 - candle
			//4 - flute
			//5 - meat
			//6 - potion(red or blue)
			//7 - magic rod
			//8 - raft
			//9 - book of magic
			//10 - ring
			//11 - ladder
			//12 - key
			//13 - bracelet
			//14 - wood sword
			switch (lastPickUpItem) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				case 7:
					break;
				case 8:
					break;
				case 9:
					break;
				case 10:
					break;
				case 11:
					break;
				case 12:
					break;
				case 13:
					break;
				case 14:
					ctx.drawImage(hud, 555, 137, 8, 16, linkX - 2, linkY - 14, 8, 16);
					break;
			}
		} else {
			if (isAttacking && hasSword) {
				if (currentAnimation == 0) {
					if (lastButtonPressed == "down") {
						ctx.drawImage(link1, 0, 60, 16, 16, linkX, linkY, 16, 16);
					}
					if (lastButtonPressed == "up") {
						ctx.drawImage(link1, 62, 60, 16, 16, linkX, linkY, 16, 16);
					}
					if (lastButtonPressed == "left") {
						ctx.drawImage(link1, 30, 60, 16, 16, linkX, linkY, 16, 16);
					}
					if (lastButtonPressed == "right") {
						ctx.drawImage(link1, 91, 60, 16, 16, linkX, linkY, 16, 16);
					}
				}
				if (currentAnimation == 1) {
					if (lastButtonPressed == "down") {
						ctx.drawImage(link1, 0, 84, 16, 27, linkX, linkY, 16, 27);
						gameObjectCollision(linkX + 7, linkY + 16, gameObjects, false, true);
					}
					if (lastButtonPressed == "up") {
						ctx.drawImage(link1, 62, 84, 16, 26, linkX, linkY - 14, 16, 26);
						gameObjectCollision(linkX + 3, linkY - 14, gameObjects, false, true);
					}
					if (lastButtonPressed == "left") {
						ctx.drawImage(link1, 22, 84, 26, 27, linkX - 10, linkY - 8, 27, 27);
						gameObjectCollision(linkX - 8, linkY + 5, gameObjects, false, true);
					}
					if (lastButtonPressed == "right") {
						ctx.drawImage(link1, 84, 84, 30, 26, linkX, linkY - 8, 30, 26);
						gameObjectCollision(linkX + 14, linkY + 5, gameObjects, false, true);
					}
				}
				if (animationCounter >= 6) {
					currentAnimation++;
					animationCounter = 0;
					if (currentAnimation > 1) {
						currentAnimation = 0;
						isAttacking = false;
						canAttackAgain = true;
					}
				}
			} else if (leftPressed && !collision(linkX - speed, linkY, gameMap)) {
				linkX -= speed;
				if (currentAnimation == 0) {
					ctx.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
				} else if (currentAnimation == 1) {
					ctx.drawImage(link1, 30, 30, 16, 16, linkX, linkY, 16, 16);
				}
				if (animationCounter >= 6) {
					currentAnimation++;
					animationCounter = 0;
					if (currentAnimation > 1) {
						currentAnimation = 0;
					}
				}
			} else if (rightPressed & !collision(linkX + speed, linkY, gameMap)) {
				linkX += speed;
				if (currentAnimation == 0) {
					ctx.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
				} else if (currentAnimation == 1) {
					ctx.drawImage(link1, 91, 30, 16, 16, linkX, linkY, 16, 16);
				}
				if (animationCounter >= 6) {
					currentAnimation++;
					animationCounter = 0;
					if (currentAnimation > 1) {
						currentAnimation = 0;
					}
				}
			} else if (upPressed & !collision(linkX, linkY - speed, gameMap)) {
				linkY -= speed;
				if (currentAnimation == 0) {
					ctx.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
				} else if (currentAnimation == 1) {
					ctx.drawImage(link1, 62, 30, 16, 16, linkX, linkY, 16, 16);
				}
				if (animationCounter >= 6) {
					currentAnimation++;
					animationCounter = 0;
					if (currentAnimation > 1) {
						currentAnimation = 0;
					}
				}
			} else if (downPressed & !collision(linkX, linkY + speed, gameMap)) {
				linkY += speed;
				if (currentAnimation == 0) {
					ctx.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
				} else if (currentAnimation == 1) {
					ctx.drawImage(link1, 0, 30, 16, 16, linkX, linkY, 16, 16);
				}
				if (animationCounter >= 6) {
					currentAnimation++;
					animationCounter = 0;
					if (currentAnimation > 1) {
						currentAnimation = 0;
					}
				}
			} else {
				if (lastButtonPressed == "down") {
					ctx.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
				}
				if (lastButtonPressed == "up") {
					ctx.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
				}
				if (lastButtonPressed == "left") {
					ctx.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
				}
				if (lastButtonPressed == "right") {
					ctx.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
				}
			}
		}
	}

	function drawMap(level) {
		for (let i = 0; i < level.length; i++) {
			for (let j = 0; j < level[i].length; j++) {
				ctx.drawImage(worldTiles, (level[i][j] % 18) * 17 + 1, Math.floor(level[i][j] / 18) * 17 + 1, 16, 16, j * 16, i * 16, 16, 16);
			}
		}
	}

	function collision(x, y, map) {
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (map[i][j] != 2 && map[i][j] != 28) {
					if (x <= j * 16 + 16 && x + 12 >= j * 16 && y + 10 <= i * 16 + 16 && y + 16 >= i * 16) {
						return true;
					}
				}
			}
		}
		return false;
	}

	function gameObjectCollision(x, y, objects, isLink, isSword, direction) {
		if (isLink) {
			for (let i = 0; i < objects.length; i++) {
				if (x <= objects[i].x + objects[i].width && x + 16 >= objects[i].x && y <= objects[i].y + objects[i].height && y + 16 >= objects[i].y) {
					if (objects[i].isPortal) {
						gameMap = maps[objects[i].newMap].map;
						gameObjects = maps[objects[i].newMap].gameobjects;
						linkX = objects[i].newLinkX;
						linkY = objects[i].newLinkY;
					}

					if (objects[i].isPickUpItem) {
						playPickUpItemAnimation = true;
						///There are a number of pick up items. The first 8 are selctable within
						/// the inventory screen. The following 6 sit on top of the selectable inventory
						/// and are automatically equipped and used by link.
						//0 - boomerang
						//1 - bomb
						//2 - bow and arrow
						//3 - candle
						//4 - flute
						//5 - meat
						//6 - potion(red or blue)
						//7 - magic rod
						//8 - raft
						//9 - book of magic
						//10 - ring
						//11 - ladder
						//12 - key
						//13 - bracelet
						//14 - wood sword
						switch (gameObjects[i].pickUpItemNum) {
							case 0:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 1:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 2:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 3:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 4:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 5:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 6:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 7:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 8:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 9:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 10:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 11:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 12:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 13:
								gO = new GameObject();
								gO.pickUpItemNum = gameObjects[i].pickUpItemNum;
								inventoryItems[gameObjects[i].pickUpItemNum] = gO;
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								break;
							case 14:
								lastPickUpItem = gameObjects[i].pickUpItemNum;
								swordEquipped = 1;
								hasSword = true;
								animationCounter = 0;
								playSound("./sounds/item.mp3");
						}

						objects.splice(i, 1);
						animationCounter = 0;
					}
				}
			}
		} else {
			let swordW = 11;
			let swordH = 3;
			if (lastButtonPressed == "up" || lastButtonPressed == "down") {
				swordW = 3;
				swordH = 11;
			}

			for (let i = 0; i < objects.length; i++) {
				if (lastButtonPressed == "left") {
					if (x <= objects[i].x + objects[i].width && x + swordW >= objects[i].x && y <= objects[i].y + objects[i].height && y + swordH >= objects[i].y) {
						//ctx.fillRect(x + 2, (y+6), swordW, swordH);
						if (objects[i].isEnemy) {
							objects[i].needsBounce = true;
							getBounceLoc(objects[i], false, lastButtonPressed);
							objects[i].health -= 1;
							if (objects[i].health == 0) {
								playSound("./sounds/LOZ_enemy_die.wav");
							} else {
								playSound("./sounds/LOZ_enemy_hit.wav");
							}
						}
					}
				} else if (lastButtonPressed == "right") {
					if (x <= objects[i].x + objects[i].width && x + swordW >= objects[i].x && y <= objects[i].y + objects[i].height && y + swordH >= objects[i].y) {
						//ctx.fillRect(x - 2, (y+6), swordW, swordH);
						if (objects[i].isEnemy) {
							objects[i].needsBounce = true;
							getBounceLoc(objects[i], false, lastButtonPressed);
							objects[i].health -= 1;
							if (objects[i].health == 0) {
								playSound("./sounds/LOZ_enemy_die.wav");
							} else {
								playSound("./sounds/LOZ_enemy_hit.wav");
							}
						}
					}
				} else if (lastButtonPressed == "up") {
					if (x <= objects[i].x + objects[i].width && x + swordW >= objects[i].x && y <= objects[i].y + objects[i].height && y + swordH >= objects[i].y) {
						//ctx.fillRect(x - 2, y, swordW, swordH);
						if (objects[i].isEnemy) {
							objects[i].needsBounce = true;
							getBounceLoc(objects[i], false, lastButtonPressed);
							objects[i].health -= 1;
							if (objects[i].health == 0) {
								playSound("./sounds/LOZ_enemy_die.wav");
							} else {
								playSound("./sounds/LOZ_enemy_hit.wav");
							}
						}
					}
				} else {
					if (x <= objects[i].x + objects[i].width && x + swordW >= objects[i].x && y <= objects[i].y + objects[i].height && y + swordH >= objects[i].y) {
						//ctx.fillRect(x, y, swordW, swordH);
						if (objects[i].isEnemy) {
							objects[i].needsBounce = true;
							getBounceLoc(objects[i], false, lastButtonPressed);
							objects[i].health -= 1;
							if (objects[i].health == 0) {
								playSound("./sounds/LOZ_enemy_die.wav");
							} else {
								playSound("./sounds/LOZ_enemy_hit.wav");
							}
						}
					}
				}
			}
		}
	}

	function getBounceLoc(gObject, ignoresObjects, direction) {
		let currRow = Math.floor(gObject.y / 16);
		let currCol = Math.floor(gObject.x / 16);
		if (direction == "up") {
			if (gameMap[currRow - 1][currCol] == 2) {
				gObject.bounceY = gObject.y - 16;
				gObject.bounceX = gObject.x;
			} else {
				gObject.bounceY = gObject.y;
				gObject.bounceX = gObject.x;
			}
		}
		if (direction == "down") {
			if (gameMap[currRow + 1][currCol] == 2) {
				gObject.bounceY = gObject.y + 16;
				gObject.bounceX = gObject.x;
			} else {
				gObject.bounceY = gObject.y;
				gObject.bounceX = gObject.x;
			}
		}
		if (direction == "left") {
			if (gameMap[currRow][currCol - 1] == 2) {
				gObject.bounceX = gObject.x - 16;
				gObject.bounceY = gObject.y;
			} else {
				gObject.bounceY = gObject.y;
				gObject.bounceX = gObject.x;
			}
		}
		if (direction == "right") {
			if (gameMap[currRow][currCol + 1] == 2) {
				gObject.bounceX = gObject.x + 16;
				gObject.bounceY = gObject.y;
			} else {
				gObject.bounceY = gObject.y;
				gObject.bounceX = gObject.x;
			}
		}
	}

	function drawGameObjects() {
		for (let i = 0; i < gameObjects.length; i++) {
			if (gameObjects[i].isPickUpItem) {
				///There are a number of pick up items. The first 8 are selectable within
				/// the inventory screen. The following 6 sit on top of the selectable inventory
				/// and are automatically equipped and used by link.
				//0 - boomerang
				//1 - bomb
				//2 - bow and arrow
				//3 - candle
				//4 - flute
				//5 - meat
				//6 - potion(red or blue)
				//7 - magic rod
				//8 - raft
				//9 - book of magic
				//10 - ring
				//11 - ladder
				//12 - key
				//13 - bracelet
				//14 - wood sword
				switch (gameObjects[i].pickUpItemNum) {
					case 0:
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
						break;
					case 5:
						break;
					case 6:
						break;
					case 7:
						break;
					case 8:
						break;
					case 9:
						break;
					case 10:
						break;
					case 11:
						break;
					case 12:
						break;
					case 13:
						break;
					case 14:
						ctx.drawImage(hud, 555, 137, 8, 16, gameObjects[i].x, gameObjects[i].y, 8, 16);
						break;
				}
			}
			if (gameObjects[i].isText) {
				gameObjects[i].counter += 1;
				if (gameObjects[i].counter % 5 == 0) {
					if (gameObjects[i].line1Full.length != gameObjects[i].line1Current.length) {
						gameObjects[i].line1Current = gameObjects[i].line1Full.substring(0, gameObjects[i].line1Current.length + 1);
						playSound("./sounds/LOZ_text_slow.wav");
					} else if (gameObjects[i].line2Full.length != gameObjects[i].line2Current.length) {
						gameObjects[i].line2Current = gameObjects[i].line2Full.substring(0, gameObjects[i].line2Current.length + 1);
						playSound("./sounds/LOZ_text_slow.wav");
					}
				}

				ctx.fillStyle = "white";
				ctx.font = "12px Arial";
				ctx.fillText(gameObjects[i].line1Current, gameObjects[i].line1X, gameObjects[i].line1Y);
				ctx.fillText(gameObjects[i].line2Current, gameObjects[i].line2X, gameObjects[i].line2Y);
			}
			if (gameObjects[i].isFlame) {
				gameObjects[i].counter += 1;
				if (gameObjects[i].counter % 5 == 0) {
					gameObjects[i].imageNum += 1;
				}
				if (gameObjects[i].imageNum > 1) {
					gameObjects[i].imageNum = 0;
				}
				if (gameObjects[i].imageNum == 0) {
					ctx.drawImage(chars2, 158, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
				} else {
					ctx.drawImage(chars1, 52, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
				}
			}
			if (gameObjects[i].isOldMan) {
				ctx.drawImage(chars1, 1, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
			}
			if (gameObjects[i].isOldWoman) {
				ctx.drawImage(chars1, 35, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
			}
			if (gameObjects[i].isEnemy) {
				if (gameObjects[i].enemyType == 1) {
					gameObjects[i].counter++;
					if (gameObjects[i].counter >= 10) {
						gameObjects[i].frame++;
						gameObjects[i].counter = 0;
						if (gameObjects[i].frame > 1) {
							gameObjects[i].frame = 0;
						}
					}
					if (gameObjects[i].direction == "down") {
						if (gameObjects[i].frame == 0) {
							ctx.drawImage(enemies, 0, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
						if (gameObjects[i].frame == 1) {
							ctx.drawImage(enemies, 0, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
					} else if (gameObjects[i].direction == "up") {
						if (gameObjects[i].frame == 0) {
							ctx.drawImage(enemies, 60, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
						if (gameObjects[i].frame == 1) {
							ctx.drawImage(enemies, 60, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
					} else if (gameObjects[i].direction == "left") {
						if (gameObjects[i].frame == 0) {
							ctx.drawImage(enemies, 30, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
						if (gameObjects[i].frame == 1) {
							ctx.drawImage(enemies, 30, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
					} else {
						if (gameObjects[i].frame == 0) {
							ctx.drawImage(enemies, 90, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
						if (gameObjects[i].frame == 1) {
							ctx.drawImage(enemies, 90, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
						}
					}
                    if (gameObjects[i].needsBounce) {
                        if (gameObjects[i].x != gameObjects[i].bounceX) {
                            if (gameObjects[i].bounceX > gameObjects[i].x) {
                                gameObjects[i].x += 4;
                            } else {
                                gameObjects[i].x -= 4;
                            }
                        }
                        if (gameObjects[i].y != gameObjects[i].bounceY) {
                            if (gameObjects[i].bounceY > gameObjects[i].y) {
                                gameObjects[i].y += 4;
                            } else {
                                gameObjects[i].y -= 4;
                            }
                        }
                    }
				}
			}
		}
	}

	function draw() {
		setTimeout(function () {
			requestAnimationFrame(draw);
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(0, 0, 256, 240);
			///all code goes here
			drawMap(gameMap);
			drawLink();
			gameObjectCollision(linkX, linkY, gameObjects, true);
			drawGameObjects();
		}, 1000 / fps);
	}

    // computed properties
	function heartFill(index) {
		if (currentLinkHearts == index + 0.5) {
			return "url(#repeat)";
		} else if (currentLinkHearts >= index + 1) {
			return "red";
		} else {
			return "white";
		}
	}

    // set starting game map
    gameMap = maps[0].map;
	gameObjects = maps[0].gameobjects;

	draw();
</script>

<main>
	<div class="hud">
		<div class="map" />

		<div class="item-column">
			<div class="item">
				<div class="img-container">
					<img src="/images/hud_rupee.png" height="12" alt="" />
				</div>
				<span class="value"><span>X</span>{rupeeAmount}</span>
			</div>
			<div class="item">
				<div class="img-container">
					<img src="/images/hud_smallKey.png" height="10" alt="" />
				</div>
				<span class="value"><span>X</span>{keyAmount}</span>
			</div>
			<div class="item">
				<div class="img-container">
					<img src="/images/hud_bomb.png" height="9" alt="" />
				</div>
				<span class="value"><span>X</span>{bombAmount}</span>
			</div>
		</div>

		<div class="alt-hand">
			<span class="buttonMap">D</span>
		</div>
		<div class="main-hand">
			<span class="buttonMap">F</span>
			{#if swordEquipped}
				<img src="images/hud_woodSword.png" alt="" />
			{/if}
		</div>

		<div class="life-container">
			<p class="label">-LIFE-</p>
			<div class="heart-container">
				{#each Array(linkHearts) as _, i}
					<svg xmlns="http://www.w3.org/2000/svg" class="heart" width="7" viewBox="0 0 24 24">
						<defs>
							<linearGradient id="half" x1="0%" y1="50%" x2="100%" y2="50%">
								<stop offset="50%" stop-color="red" />
								<stop offset="51%" stop-color="white" />
							</linearGradient>
							<linearGradient id="repeat" xlink:href="#half" spreadMethod="repeat" />
						</defs>
						<path fill={heartFill(i)} d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
					</svg>
				{/each}
			</div>
		</div>
	</div>

	<canvas id="myCanvas" width="256" height="240" />
</main>

<style lang="scss">
	.hud {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		background-color: #000;
		height: 64px;
		width: 256px;

		.map {
			height: 48px;
			width: 72px;
			background-color: green;
			margin-left: 8px;
		}

		.item-column {
			margin-left: 8px;
			.item {
				display: flex;
				align-items: center;
				width: 32px;
				.img-container {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 16px;
					width: 12px;
					margin-right: 1px;
					img {
						max-width: 100%;
						max-height: 100%;
					}
				}
				.value {
					color: #fff;
					font-size: 8px;
					span {
						display: inline-block;
						font-size: 5px;
						margin-right: 2px;
					}
				}
			}
		}

		.alt-hand,
		.main-hand {
			position: relative;
			height: 32px;
			width: 16px;
			border: 2px solid blue;
			border-radius: 3px;
			.buttonMap {
				position: absolute;
				top: -8px;
				left: 50%;
				transform: translateX(-50%);
				color: #fff;
				font-size: 12px;
			}
		}

		.alt-hand {
			margin: 0 8px 0 6px;
		}

		.main-hand {
			img {
				width: 6px;
				position: absolute;
				top: 5px;
				left: 3.5px;
			}
		}

		.life-container {
			height: 32px;
			// background-color: gray;
			width: 72px;
			margin-left: 12px;
			.label {
				color: #d10505;
				text-align: center;
				font-size: 12px;
				font-weight: 600;
			}

			.heart-container {
				display: flex;
				flex-wrap: wrap;
				// margin-top: 2px;
				.heart {
					position: relative;
					color: red;
					font-size: 8px;
					margin: 2px 2px 0 0;
				}
			}
		}
	}
</style>
