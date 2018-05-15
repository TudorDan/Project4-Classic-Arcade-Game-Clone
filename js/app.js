// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Bug properties
    this.x = -101; //horizontal position in pixels(outside the canvas, on the left)
    this.y = Math.floor(Math.random() * 3) + 1; //start row = int number between 1 and 3;
    /* Math.random() * generates any number (including decimals) between 0 and 3, including 0 but not 3.
    We add 1 so that the bugs start below the water.
    Math.floor() will ignore the decimals*/
    this.speed = Math.floor(Math.random() * 250) + 50; /* speed between 50 and 300 pixels per second*/
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if( this.x > 606) {
        this.x = -101;
        this.y = Math.floor(Math.random() * 3) + 1;
        this.speed =  Math.floor(Math.random() * 250) + 50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 83 - 22);/*We determine the row for
    each bug as a multiple for 83 pixels (given in engine.js) and raise it 22 px for better fit in row.*/
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //player properties
    this.x = 2; //start position = column number
    this.y = 5; //start position = row number
    this.direction = ''; /*direction for the next step of the player (since it is void, player is
    currently stationary)*/
    this.sprite = 'images/char-boy.png'; // player image
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/*We moved object instatiation in engine.js*/

// Updates the player's position and
// stops player from stepping outside the map
Player.prototype.update = function() {
    if(this.direction === 'left' && this.x > 0) {
        this.x--; //move one step to the left
        this.direction = ''; // stop in order to avoid endless moving
    }
    if(this.direction === 'right' && this.x < 4) {
        this.x++;
        this.direction = '';
    }
    if(this.direction === 'up' &&  this.y > 0) {
        this.y--;
        this.direction = '';
    }
    if(this.direction === 'down' && this.y < 5) {
        this.y++;
        this.direction = '';
    }
};

// Draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10); /*Multiply
    with 101 px for columns and 83 px for rows (raise 10 px for better fit in row)*/
};

// Change direction based on the activated key
Player.prototype.handleInput = function(direction) {
    this.direction = direction;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
