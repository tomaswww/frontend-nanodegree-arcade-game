// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    thius.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.height = 80;
    this.width = 65;
  }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
update(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed;
  //looping the enemies
  if (this.x > 500) {
    this.x = -100;
  }
  //checking for collision
  if (this.x === player.x && this.y === player.y) {
    player.x = 202;
    player.y = 322;
    //takes life and ends game when out of lifes
    player.lifes--;
    start.displayLifes();
    if (player.lifes === 0) {
      start.modal(start.endModal);
    }
  }
};
// Draw the enemy on the screen, required method for game
render() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
};

// Now write your own player class
class Player {
  //players characteristics
  constructor(sprite){
    thius.sprite=sprite;
    this.score=score;
    this.level=1;
    this.lifes=3;
    //position
    this.x = 202;
    this.y= 405;
    //move size
    this.xSize = 101;
    this.ySize = 83;
    //characters dimentions
    this.height = 20;
    this.widht = 60;
  }
// This class requires an update(), render() and
// a handleInput() method.
update(){
  //player wins whe reaches the water
  if (this.y== -10){
    this.x= 202;
    this.y=322;
    this.score += 5;
    this.level++;
    board(this.level,this.score)
    start.difficulty();
  }
};
handleInput(key){
  // character :Start
        if (key === "up" && this.y == 405) {
            start.updatePlayer(this.x);
        }
        if (key === "down" && this.y == 322) {
            start.returnSelector();
        }
        // character: Start
        if (key === "up" && this.y > 0){
            this.y -= this.ySize;
        }
        else if (key === "down" && this.y < 404){
            this.y += this.ySize;
        }
        else if (key === "left" && this.x > 0){
            this.x -= this.xSize;
        }
        else if (key === "right" && this.x < 404){
            this.x += this.xSize;
        }
};
render(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
