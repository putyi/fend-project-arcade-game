//TODO create score table...
const div1 = document.createElement("div");
const body = document.querySelector("body");
body.appendChild(div1);
div1.style.cssText = "color: red; font-size: xx-large";

let nrLives = 3;
div1.textContent = `NR OF LIVES: ${nrLives}`;

//TODO create final message pushup
const div2 = document.createElement("div");
body.appendChild(div2);
div2.style.cssText = "position: absolute; width: 100%; background-color: #fab303; opacity: 0.6; font-size: 148px; visibility: hidden";

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rightCoord = this.x + 75;
    this.downCoord = this.y + 71;
    }

    // Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        if (this.x < 505) {
            (this.x += this.speed) * dt;
            (this.rightCoord  += this.speed) * dt;
        } else {
            this.x = -100;
            this.rightCoord = -5;
            this.y = 71 * Math.floor((Math.random() * 3) + 1);
            this.downCoord = this.y + 71;
        }
    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
class Player {
    constructor(x, y, speed) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.rightCoord = this.x + 101;
        this.downCoord = this.y + 61;
        this.speed = speed;
    }

// This class requires an update(), render() and
// a handleInput() method.
   update() {
       if (player.y === -5) {
           water();
       } else {
        this.x;
        this.y;
        this.rightCoord;
        this.downCoord;
       }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //TODO handle the keys...
    handleInput(keyInput) {
    
            if (keyInput === 'left') {
                if (this.x > -10) {
                    this.x -= this.speed;
                    this.rightCoord = this.x + 101;
                }
            } else if (keyInput === 'up') {
                    if (this.y >= 0) {
                    this.y -= this.speed;
                    this.downCoord = this.y + 61;
                    }
            } else if (keyInput === 'right') {
                if (this.x < 420) {
                    this.x += this.speed;
                    this.rightCoord = this.x + 101;
                }
            } else if (keyInput === 'down') {
                if (this.y <= 430) {
                    this.y += this.speed;
                    this.downCoord = this.y + 61;
                }
            }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    enemy1 = new Enemy(-100, 71, 2.8),
    enemy2 = new Enemy(-100, 142, 1.5),
    enemy3 = new Enemy(-100, 213, 1)
];

const player = new Player(300, 420, 5);
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//TODO check collisions: what if...
function checkCollisions() {
    if (((player.x <= enemy1.rightCoord && player.x >= enemy1.x) &&
        (player.y <= enemy1.downCoord && player.downCoord >= enemy1.y))
        || ((player.x <= enemy2.rightCoord && player.x >= enemy2.x) &&
        (player.y <= enemy2.downCoord && player.downCoord >= enemy2.y))
        || ((player.x <= enemy3.rightCoord && player.x >= enemy3.x) &&
        (player.y <= enemy3.downCoord && player.downCoord >= enemy3.y))) {
            player.x = 300;
            player.y = 420;
            nrLives -= 1;
            div1.textContent = `NR OF LIVES: ${nrLives}`;
            if (nrLives === 0) {
                div2.innerHTML = "<p>GAME OVER!</p>";
                div2.style.visibility = "visible";
                enemy1.speed = 0;
                enemy2.speed = 0;
                enemy3.speed = 0;
                player.speed = 0;
            }
    };
};

//TODO: the player reaches the water... what's next?
function water() {
    player.x = 300;
    player.y = 420;
    nrLives += 1;
    div1.textContent = `NR OF LIVES: ${nrLives}`;
    if (nrLives === 5) {
        div2.innerHTML = "<p>YOU WON!</p>";
        div2.style.visibility = "visible";
        enemy1.speed = 0;
        enemy2.speed = 0;
        enemy3.speed = 0;
        player.speed = 0;
    }
}