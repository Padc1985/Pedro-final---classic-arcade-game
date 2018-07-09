// Valor entre min  and max 
function getRandom(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
// Classe do inimigo.
var Enemy = function()
{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var x;
    var y;
    var speed;
    this.reset ();
    
    // The image/sprite for our enemies, this uses
    // a helper we've p9rovided to easily load images
    
    this.sprite = 'images/enemy-bug.png';

// Update the enemy's position, required method for game

   
    
// Parameter: dt, a time delta between ticks
    
};

Enemy.prototype.reset = function () 
{
    // Set de posicao
    this.x = -101;    
    this.y = 214 - getRandom(0, 2) * 83;
    
    // Set de velocidade
    this.speed = Math.floor(Math.random() * 300 + 1);
};

// Update do Inimigo.
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //canvas.width = 505;
    
    
    //posição do Enemy (move)
    if (this.x < ctx.canvas.width) 
    {
        this.x = (this.x + this.speed * dt);
    }
    
    
    
    //novo inimigo quando algum sair da tela
    if (this.x >= 505) 
    {
       // allEnemies.push(new Enemy());
        this.reset ();
    }
    
    //colisão
    //var collision = false;
    
    //PARTE ORIGINAL DO PROJETO
//    if ((player.x - this.x < 60) && (this.x - player.x < 60) && (this.y - player.y < 60) && (player.y - this.y < 60)) {
//        player.x = player.xo;
//        player.y = player.yo;
//        //collision = true;
//    }
    
   
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(dt) 
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function()
{
    
    this.sprite="images/teste3.png";

    //posição incial
	
    this.velocity = 120;
    
    this.xo = 202;
    this.yo = 380;

    this.x = this.xo;
	this.y = this.yo;
    this.isGirl = false;
    
    this.direction = 0;
};

//FIX: IMPLEMENTAR A FUNÇÃO CHECKCOLLISIONS DO ENGINE

Player.prototype.checkCollisions = function() {
    var enemyy = allEnemies.length;
    for (var i = 0; i < enemyy; i++) {
      if (Math.abs(this.x - allEnemies[i].x) < 60 && Math.abs(this.y - allEnemies[i].y) < 60) {
            console.log(this);
         //   this.reset();
          player.x = player.xo;
          player.y = player.yo;
        }
    }
};




Player.prototype.update = function(dt) {
  
    if (this.direction == 1) 
    {
		this.x = (this.x + this.velocity * dt);
        //alert (this.x);
	} 
    else if (this.direction == 2) 
    {
		this.x = (this.x - this.velocity * dt);
	} 
    else if (this.direction == 3) 
    {
		this.y = (this.y - this.velocity * dt);
	} 
    else if (this.direction == 4) 
    {
		this.y = (this.y + this.velocity * dt);
	}
    
};


// Draw the player on the screen, required method for game    
    
Player.prototype.render = function()
{
   // alert ("render");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
    


// Move o player analogicamente.
Player.prototype.handleInputDown = function(direction) {
    
    
	if (direction == 'up') {
		this.direction = 3;
	} else if (direction == 'down') {
		this.direction = 4;
	} else if (direction == 'left') 
    {
		this.direction = 2;
	} 
    else if (direction == 'right') 
    {
		this.direction = 1;
	}

	if (this.x < 0) {
		this.x = 0;

	} else if (this.x > 404) {
		this.x = 404;
    
	} 
    // Agua.
    else if (this.y < 0) {
        
        // Dentro da agua.
        if (this.y > -10)
        {
        
            this.sprite="images/char-boy.png";
            isGirl = true;
        }
        // Quis varar a agua.
        else
        {
            this.y = -1;
        }
        
         
	} else if (this.y > 380) {
		this.y = 380;
    }
    else if (isGirl == true && this.y > 0) 
    {
        this.sprite="images/char-boy.png";
        isGirl = false;
    }
};

Player.prototype.handleInputUp = function(direction) {
    
    
	if (direction == 'up') {
		this.direction = 0;
	} else if (direction == 'down') {
		this.direction = 0;
	} else if (direction == 'left') 
    {
		this.direction = 0;
	} 
    else if (direction == 'right') 
    {
		this.direction = 0;
	}
};
    
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var coly=[152, 253, 354, 455];
    
//var x = Math.floor((Math.random() * -1000 + 1));
//var x = 0;
//var y = 152;

for (var i = 0; i < 4; i++) {
    
    
   // var y = coly[Math.floor(Math.random() * -1000 + 1)];
    allEnemies.push(new Enemy());
}


// Place the player object in a variable called player
    
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInputDown(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInputUp(allowedKeys[e.keyCode]);
});
    

    
