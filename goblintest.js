// JavaScript Document

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//use canvas var to set dimensions
canvas.width = 1000;
canvas.height = 800;
//append body element with canvas var above
document.body.appendChild(canvas);

// Background image
// use boolean toggle to set image ready var to false
var bgReady = false;
//creates new image object and stores it in bgImage
var bgImage = new Image();

//tests to see when image is loaded and sets image ready to true
bgImage.onload = function () {
	bgReady = true;
};
//sets image source
bgImage.src = "../_images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "../_images/warrior.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "../_images/goblin.png";
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Combat Objects
var combat = false;
// Overworld Objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};
var monstersCaught = 0;

// Reset the game when the player catches a monster
var reset = function () {
//	hero.x = canvas.width / 2;
//	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 64 + (Math.random() * (canvas.width - 128));
	monster.y = 64 + (Math.random() * (canvas.height - 128));
};

// Update game objects
var update = function (modifier) {
	if (87 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (83 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (65 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (68 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x >= (monster.x - 32)
		&& monster.x >= (hero.x - 32)
		&& hero.y >= (monster.y - 32)
		&& monster.y >= (hero.y - 32)
	) {
		combat = true;
		console.log(combat);
	}
};

// Draw everything
var render = function () {
	
//	https://developer.mozill	a.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}


	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

var main = function() {
//	creates (and resets each call) a new timestamp when the main func is called
	var newTimeStamp = Date.now();
//	records time difference from line before main is called and line above in miliseconds
	var delta = newTimeStamp - oldTimeStamp;
// runs update function passing milliseconds of time passed divided by 1K
	console.log(oldTimeStamp);
	console.log(newTimeStamp);
	console.log(delta);
	update(delta / 1000);
//	renders content
	render();
// sets oldTimeStamp to newTimeStamp
	oldTimeStamp = newTimeStamp;
	
	

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var oldTimeStamp = Date.now();
reset();
main();