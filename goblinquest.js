//code from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/ 

// Create the canvas
// Set variables for use with methods
//James made the function below me
var continu;
var monsterFlee;
var userFlee;
// user input function
function action() {
    var turn = "";
    var turn = prompt("Its your turn buddy!").toLowerCase;
    return turn;
}
//james also made this one wow he's so good
// the monsters turn
function monsterAction() {
    var monsterTurn =  "";
    var monsterTurn = cpu("attack", "defend", "flee").toLowerCase;
}
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//use canvas var to set dimensions
canvas.width = 512;
canvas.height = 480;
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

// Monster2 image
var monster2Ready = false;
var monster2Image = new Image();
monster2Image.onload = function () {
	monster2Ready = true;
};
monster2Image.src = "../_images/bokoblin.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: canvas.width / 2,
    y: canvas.height / 2
};
var monster = {};
var monster2 = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
//	hero.x = canvas.width / 2;
//	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 64 + (Math.random() * (canvas.width - 128));
	monster.y = 64 + (Math.random() * (canvas.height - 128));
	console.log(monster.x);
	console.log(monster.y);
	monster2.x = 64 + (Math.random() * (canvas.width - 128));
	monster2.y = 64 + (Math.random() * (canvas.height - 128));
	console.log(monster2.x);
	console.log(monster2.y);
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
	
	if (monster2Ready) {
		ctx.drawImage(monster2Image, monster2.x, monster2.y);
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
//James made the combat system wowowowow
var main = function () {
	var userHealth = 20;
    var monsterHealth = 20;
    var playerVictory = false;
    var battling = true;
    while (battling == true) {
    //The loop of life is above me :O
        action();
	//Ask the user what they want to do
        monsterAction(); 
	//Random number of what the monster wants to do
        if (turn == "attack") {
            if (monsterTurn == "defend") {
                console.log("The user used attack, but the monster defended, so no damage taken!");
				heatlh
            }
            if (monsterTurn == "attack") {
                console.log("The user used attack, and the monster takes 5 damage!");
            }
        }
	//Case scenarios in which the user uses attack
        if (turn == "defend") {
            if (monsterTurn == "attack") {
                console.log("The user defends, and the monster attacks. No damage is taken!");
            }
            if (monsterTurn == "defend") {
                console.log("The user and monster defend, you both look stupid.");
            }
            if (monsterTurn == "flee") {
                if (userFlee < monsterFlee) {
                    console.log("The monster flees and does so successfully!");
                    battling = false;
                }
                if (speed >= monsterFlee) {
                    console.log("The monster tries to flee, but it does so unsecesfully!");
                }
            }
        }
	//Another case scenario in which the user uses defend
        if (turn == "flee") {
            if (speed >= monsterFlee) {
                console.log("The user sucessfully escpaes!");
                battling = false;
            }
            if (speed < monsterFlee) {
                console.log("The user isn't fast enough to escape!");
                if (monsterTurn == "attack") {
                    console.log("The user tries to flee, but isn't fast enought, and the monster attacks. -5 health");
                }
                if (monsterTurn == "defend") {
                    console.log("The user tries to flee, but isn't fast enough, the monster uses flee");
                }
                if (monsterTurn == "flee") {
                    console.log("The user tries to flee, but isn't fast enought, luckily the monster flees and escapes successfully. So uh good job?");
                    battling = false;
                }
            }
        }
	//You might have been guessing it here it is the final case scenario in which the user uses flee :O
    }
    continu = "d";
    continu = prompt("Type any button to continue.");
    //So the user can seperate turns
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
