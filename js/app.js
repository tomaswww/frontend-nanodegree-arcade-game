// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.height = 80;
    this.width = 65;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += dt * this.speed;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
      //must add what happens when you loose!
      }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now write your own player class
class Player {
  //players characteristics
  constructor(sprite) {
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.level = 1;
    this.lifes = 3;
    //position
    this.x = 200;
    this.y = 400;
    //move size
    this.xSize = 101;
    this.ySize = 83;
    //characters dimentions
    this.height = 20;
    this.width = 60;
  }
  // This class requires an update(), render() and
  // a handleInput() method.
  handleInput(key) {
    // character :Start
    if (arrowKey == 'left' && this.x > 0 ){
      this.x = this.x - 100;
    }
    if (arrowKey == 'right' && this.x < 400){
      this.x = this.x + 100;
    }
    if (arrowKey == 'up' && this.y > 0){
      this.y = this.y - 90;
    }
    if (arrowKey == 'down' && this.y < 400){
      this.y = this.y + 90;
    }
  }
  update() {
    //player wins whe reaches the water
    if (this.y == -10) {
      this.x = 202;
      this.y = 322;
      this.score += 5;
      this.level++;
      board(this.level, this.score)
      start.setDifficult();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
// Now instantiate your objects.
// Update score and level in board
function board(level,score) {
  document.querySelector(".score-value").textContent = score;
  document.querySelector(".level-value").textContent = level;
};
// Place the player object in a variable called player
let player = new Player("images/char-boy.png");

const start = {
  //for enemy
EnemyRowPosition: [55, 155, 220],
//playerRowPosition:[]
//starts all
  init: function(){
    allEnemies = [];
    nextRow = 0;
    this.create();
    this.displayLifes();
  },
  //here I give x axis value and speed.
  newVals:function(){
    let speed = Math.floor(Math.random() * 100 + 10 * player.level);
    let initX = - Math.floor(Math.random() * 500 + 100);
    return {
      speed: speed,
      initX: initX
    }
  },
  // Place all enemy objects in an array called allEnemies
  create: function() {
    for (let row of this.EnemyRowPosition) {
      let val = this.newVals();
      let enemy = new Enemy(val.initX, row, val.speed);
      allEnemies.push(enemy);
    }
  },
  //here It sets the difficult setting enemies
  setDifficult: function() {
    let value = this.newVals();
    let row = this.rowPosition[this.nextRow];
    this.nextRow++;
    if (this.nextRow == 3) {
      this.nextRow = 0;
    }
    if (this.allEnemies.length == 6) {
      this.allEnemies.splice(0, 1);
    }
    let enemy = new Enemy(values.initX, row, values.speed);
    this.allEnemies.push(enemy);
  },
  displayLifes: function() {
    let lifes = document.querySelector(".lifes");
    lifes.innerHTML = "";
    for (let i = 0; i < player.lifes; i++) {
      var newContent = document.createTextNode("❤️");
      lifes.appendChild(newContent);
    }
  }
}
start.init();
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
