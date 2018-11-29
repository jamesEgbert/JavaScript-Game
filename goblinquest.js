//code from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/ 

// Create the canvas
// Set variables for use with methods
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//use canvas var to set dimensions
canvas.width = 1366;
canvas.height = 768;
canvas.textAlign = "center";
//append body element with canvas var above
document.body.appendChild(canvas);

var GRAVITY = 256;
var maxBullets = 5;

// Background image
// use boolean toggle to set image ready var to false
var bgReady = false;
//creates new image object and stores it in bgImage
var bgImage = new Image(1366, 768);

//tests to see when image is loaded and sets image ready to true
bgImage.onload = function () {
	bgReady = true;
};
//sets image source
bgImage.src = "../_images/background_large.png";
bgImage.width = 1366;
bgImage.height = 768;

// Hero image
var HeroReady = false;
var HeroImage = new Image();
HeroImage.onload = function () {
	HeroReady = true;
};
HeroImage.src = "../_images/warrior.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "../_images/goblin.png";

// Bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
	bulletReady = true;
};
bulletImage.src = "../_images/arrow.png";

// Game objects
var Hero = {
	speed: 256, // movement in pixels per second
	x: canvas.width / 2,
	y: canvas.height - 128,
	gravity: GRAVITY,
	shoot: function () {
		console.log("I'm shooting!");
	},
	jump: function () {
		this.y -= 64;
	}
};

// monster object
//var Monster = {
//	speed: 256, // movement in pixels per second
//	x: canvas.width / 2,
//	y: canvas.height / 2,
//	gravity: GRAVITY,
//	shoot: function() {
//        console.log("I'm shooting!");
//    },
//	jump: function() {
//        Hero.y -= 64;
//    }
//};

function getRect(image) {
  var rect = image.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
  w = rect.width;
  h = rect.height;
  console.log("Left: " + x + ", Top: " + y + ", Width: " + w + ", Height: " + h);
}

// all monster array (empty toy box)
var allMonsters = [];

// Constructor function for Monster objects

function Monster() {
	this.x = 64 + (Math.random() * (canvas.width - 128)); 
	this.y = 64 + 64 + (Math.random() * (canvas.height/2));
	this.health = 100;
	this.speed = 256; 
	this.gravity = GRAVITY; 
	this.jump = function(){
		this.y -= Math.random()*256;
	};
	this.reset = function() {
		this.x = 128 + (Math.random() * (canvas.width - 128));
		this.y = 128 + (Math.random() * (canvas.height/2));
	};

	allMonsters.push(this);
	console.log(allMonsters);
}


function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}


for (monster in range(0,5)){
	monster = new Monster();
}

var allBullets = [];
function Bullet() {
	this.x = Hero.x;
	this.y = Hero.y;
	this.speed = 256;
	allBullets.push(this);
	console.log(allBullets);
}

var monstersCaught = 0;

// Handle keyboard controls
//.keyCode is deprecated
//use https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

var keysDown = {};

addEventListener("keypress", function (e) {
	keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.key];
}, false);

// Start the 
//var startGame = function() {
//	for (monster in allMonsters) {
//		allMonsters[monster].x = 64 + (Math.random() * (canvas.width - 128));
//		allMonsters[monster].y = 64 + (Math.random() * (canvas.height - 128));
//		
//	}
//}
// Update game objects
var delay = 500;
var ticks = 0;
var update = function (modifier) {
		var now = Date.now();
		var delta = (now - oldTimeStamp);
		ticks += delta;
		// console.log(ticks);
		if ("w" in keysDown) { // Player holding up
//			Hero.y -= Hero.speed * modifier;
			console.log("change in time is " + delta);
			if (allBullets.length < maxBullets && ticks > delay ){
				bullet = new Bullet();
				ticks = 0;
				console.log(allBullets);
			}
		}
		then = now;
		if ("s" in keysDown) { // Player holding down
			Hero.y += Hero.speed * modifier;
			console.log(Hero.x, Hero.y);
		}
		if ("a" in keysDown) { // Player holding left
			Hero.x -= Hero.speed * modifier;
			console.log(Hero.x, Hero.y);
		}
		if ("d" in keysDown) { // Player holding right
			Hero.x += Hero.speed * modifier;
			console.log(Hero.x, Hero.y);
		}
//		if (Hero.y <= canvas.height - 128) {
//			Hero.y += Hero.gravity;
//		}
		if (" " in keysDown) { // Player jumps

			if (Hero.y > canvas.height - 128) {
				console.log(Hero.y);
				Hero.jump();
			}
//			console.log(Hero.y > canvas.height);
		}
		
		for (bullet in allBullets) {
			allBullets[bullet].y -= allBullets[bullet].speed*modifier;
			console.log(allBullets[bullet].y);
			if (allBullets[bullet].y < 0) {
					allBullets.splice(bullet, 1);

			}
		}
		for (monster in allMonsters) {
//			console.log(monster.gravity + 'monster gravity');
			if (allMonsters[monster].y <= canvas.height) {
				allMonsters[monster].y += allMonsters[monster].gravity*modifier;
			
			
			}
			if (allMonsters[monster].y > canvas.height - 128) {
//				console.log(Hero.y);
				allMonsters[monster].jump();
			}
		}
	// Are they touching? This is called a collision
	for (monster in allMonsters) {
//		console.log("looking for collisions...");
//		console.log("hero collision " + Hero.x);
//		console.log("monster collision " + m.x);
		

		for (bullet in allBullets) {
			if (
				allBullets[bullet].x <= (allMonsters[monster].x + 64) &&
				allMonsters[monster].x <= (allBullets[bullet].x + 64) &&
				allBullets[bullet].y <= (allMonsters[monster].y + 64) &&
				allMonsters[monster].y <= (allBullets[bullet].y + 64)
			){
				++monstersCaught;
	//			allMonsters[monster].reset();
				allMonsters.splice(monster, 1);
				allBullets.splice(bullet, 1);
				console.log("collision");
				console.log(allMonsters)
	//			monster = new Monster();
				console.log(allMonsters);
			
			}
		}
		if (
			Hero.x <= (allMonsters[monster].x + 64) &&
			allMonsters[monster].x <= (Hero.x + 64) &&
			Hero.y <= (allMonsters[monster].y + 64) &&
			allMonsters[monster].y <= (Hero.y + 64)
		) {
			++monstersCaught;
//			allMonsters[monster].reset();
			allMonsters.splice(monster, 1);
			console.log("collision");
			console.log(allMonsters)
//			monster = new Monster();
			console.log(allMonsters);
			
			
		}
	}


	} // end of update





// Draw everything
var render = function () {

	//	https://developer.mozill	a.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	
	if (monsterReady) {
		for (monster in allMonsters) {
			ctx.drawImage(monsterImage, allMonsters[monster].x, allMonsters[monster].y);

		}
	}
	
	

	if (HeroReady) {
		ctx.drawImage(HeroImage, Hero.x, Hero.y);
	}
	if (bulletReady) {
	
	for (bullet in allBullets) {
		ctx.drawImage(bulletImage, allBullets[bullet].x, allBullets[bullet].y);

	}
	}
	
	



	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
// The Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
var main = function () {
	//	creates (and resets each call) a new timestamp when the main func is called

	var newTimeStamp = Date.now();
	//	records time difference from line before main is called and line above in miliseconds
	var delta = newTimeStamp - oldTimeStamp;
	// runs update function passing milliseconds of time passed divided by 1K

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
//startGame();

main();
