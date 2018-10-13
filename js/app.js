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
    if (player.x < this.x + 60 && this.x < player.x + 60 && player.y < this.y + 60 && this.y < player.y + 60) {
      player.x = 200;
      player.y = 320;
      //takes life and ends game when out of lifes
      player.lifes--;
      start.displayLifes();
      //this is what happens when you loose!
      if(player.lifes===0){
        var openLink = window.open(["https://me.me/i/yourea-loser-the-youre-a-loser-trump-poster-from-the-20425849"]);
      player.lifes=3;
      player.score=0;
      start.displayLifes();
      }
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
    if (key == 'left' && this.x > 0 ){
      this.x = this.x - 100;
    }
    if (key == 'right' && this.x < 400){
      this.x = this.x + 100;
    }
    if (key == 'up' && this.y > 0){
      this.y = this.y - 90;
    }
    if (key == 'down' && this.y < 400){
      this.y = this.y + 90;
    }
  }
  update() {
    //player wins whe reaches the water
    if (this.y < 10) {
      this.x = 200;
      this.y = 400;
      this.score += 5;
      this.level++;
      board(this.level, this.score)
      start.setDifficult();
      alert("that's a win!");
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
    let row = this.EnemyRowPosition[this.nextRow];
    this.nextRow++;
    if (this.nextRow === 3) {
      this.nextRow = 0;
    }
    if (allEnemies.length === 6) {
      allEnemies.splice(0,1);
    }
    let enemy = new Enemy(value.initX, row, value.speed);
    allEnemies.push(enemy);
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
