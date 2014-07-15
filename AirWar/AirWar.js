var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

var canvasJet = document.getElementById('canvasJet');
var ctxJet = canvasJet.getContext('2d');

var canvasEnemy = document.getElementById('canvasEnemy');
var ctxEnemy = canvasEnemy.getContext('2d');

var canvasHUD = document.getElementById('canvasHUD');
var ctxHUD = canvasHUD.getContext('2d');
ctxHUD.fillStyle = "hsla(0, 0%, 0%, 0.5)";
ctxHUD.font = "bold 20px Arial";

var saviourJet = new Jet();
var btnPlay = new Button(265, 535, 220, 335);   //creating play button
var gameWidth = canvasBg.width;                 //get the figure of Papa canvas  :P 
var gameHeight = canvasBg.height;
var bgDrawX1 = 0;                                  //background one
var bgDrawX2 = 1600;                                ////background two will come just after background one
var mouseX = 0;
var mouseY = 0;
var isPlaying = false;
var requestAnimFrame =  window.requestAnimationFrame ||            //adding browser compatibility
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);        //in worse case of some failure or some exceptions
                        };
var enemies = [];
var mainSpriteImage = new Image();
mainSpriteImage.src = 'images/sprite.png';
mainSpriteImage.addEventListener('load', start, false);











// main functions

function start() {
     playerName=prompt("Your name buddy ","Mr x");
	//console.log(playerName);
    makeEnemy(7);       //creating 7 enemies
    drawMenu();           //drawing a welcome interface for player
    document.addEventListener('click', seeIfMouseClicked, false);
}

function playGame() {
    drawBg();              //creating a backg
    startLoop();
    updateHUD();                 //updating the score
    document.addEventListener('keydown', checkKeyDown, false);  //game controls
    document.addEventListener('keyup', checkKeyUp, false);
}

function makeEnemy(number) {
    for (var n = 0; n < number; n++) {
        enemies[enemies.length] = new Enemy();
		//console.log("enemy "+n+" created");  working fine till here..pain somewhere else
    }
}

function drawAllEnemies() {
    clearCtxEnemy();             //clearing to redraw the enemy canvas
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function loop() {
    if (isPlaying) {
        moveBg();
        saviourJet.draw();       //drawing our jet
        drawAllEnemies();
        animationControl=requestAnimFrame(loop);
    }
}

function startLoop() {
    isPlaying = true;
    loop();
}

function stopLoop() {
    isPlaying = false;
}

function drawMenu() {    
    ctxBg.drawImage(mainSpriteImage, 0, 580, gameWidth, gameHeight, 0, 0,gameWidth,gameHeight);
}

function drawBg() {
    ctxBg.clearRect(0, 0, gameWidth, gameHeight);
    ctxBg.drawImage(mainSpriteImage, 0, 0, 1600, gameHeight, bgDrawX1, 0, 1600, gameHeight);  //backg 1
    ctxBg.drawImage(mainSpriteImage, 0, 0, 1600, gameHeight, bgDrawX2, 0, 1600, gameHeight);   //backg 2
}

function moveBg() {
    bgDrawX1 -= 5;
    bgDrawX2 -= 5;
    if (bgDrawX1 <= -1600) {           //if backg 1 moves to extreme left shift it to extreme right
        bgDrawX1 = 1600;
    } else if (bgDrawX2 <= -1600) {
        bgDrawX2 = 1600;
    }
    drawBg();
}

function updateHUD() {   // updating score point
    ctxHUD.clearRect(0, 0, gameWidth, gameHeight);
    ctxHUD.fillText(playerName+" Score: " +  saviourJet.score, 620, 30);
}
// end of main functions


















// jet functions

function Jet() {
    this.srcX = 0;
    this.srcY = 500;
    this.width = 100;
    this.height = 40;
    this.speed = 2;
    this.drawX = 220;
    this.drawY = 200;
    this.noseX = this.drawX + 100;
    this.noseY = this.drawY + 30;
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isShooting = false;
	this.explosion = new Explosion();
    this.bullets = [];
    this.currentBullet = 0;
    for (var i = 0; i < 25; i++) {
        this.bullets[this.bullets.length] = new Bullet(this);
    }
    this.score = 0;
}

Jet.prototype.draw = function() {   //method for drawing jet object
    clearCtxJet();
    this.updateCoors();
    this.checkDirection();
    this.checkShooting();
    this.drawAllBullets();
	this.checkCrashWithEnemy();
    ctxJet.drawImage(mainSpriteImage, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Jet.prototype.updateCoors = function() {
    this.noseX = this.drawX + 100;
    this.noseY = this.drawY + 30;
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
};


Jet.prototype.checkDirection = function() {
    if (this.isUpKey && this.topY > 0) {
        this.drawY -= this.speed;   //jet moving upwards with care that jet do not get disappear upside
    }
    if (this.isRightKey && this.rightX < gameWidth) {
        this.drawX += this.speed;   //jet moving rightside with care that jet do not get disappear rightside        
    }
	if (!this.isDownKey && this.bottomY < gameHeight) {
        if(this.isUpKey)
		this.drawY -= this.speed;             //BEWARE!! if u loose flight control u crash!! :D
		else
		this.drawY += this.speed+4;
		}
	
    if (this.isLeftKey && this.leftX > 0) {
        this.drawX -= this.speed-2;
    }
};

Jet.prototype.drawAllBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].drawX >= 0) this.bullets[i].draw();
        if (this.bullets[i].explosion.hasHit) this.bullets[i].explosion.draw();
    }
};

Jet.prototype.checkShooting = function() {
    if (this.isSpacebar && !this.isShooting) {
        this.isShooting = true;
        this.bullets[this.currentBullet].fire(this.noseX, this.noseY);
        this.currentBullet++;
        if (this.currentBullet >= this.bullets.length) this.currentBullet = 0;
    } else if (!this.isSpacebar) {
        this.isShooting = false;
    }
};

Jet.prototype.updateScore = function(points) {
    this.score += points;
    updateHUD();
};

Jet.prototype.checkCrashWithEnemy = function()
{
    for (var i = 0; i < enemies.length; i++) 
	{            //checking conditions for bullet hit
        if ((this.noseX >= enemies[i].drawX &&
            this.drawX <= enemies[i].drawX + enemies[i].width &&
            this.drawY >= enemies[i].drawY &&
            this.drawY <= enemies[i].drawY + enemies[i].height)||(this.drawY>=450)) {
                if(this.drawY>=450){alert("Oops too low!! the game is over! Your Score : " +  saviourJet.score)}
                else
				alert(playerName+" the game is over! Your Score : " +  saviourJet.score);
				
				cancelRequestAnimationFrame(animationControl);
				//enemies[i].recycleEnemy();
                //this.jet.updateScore(enemies[i].rewardPoints);
        }
    }
};

function clearCtxJet() {
    ctxJet.clearRect(0, 0, gameWidth, gameHeight);
}

// end of jet functions




// bullet functions

function Bullet(j) {
    this.jet = j;
    this.srcX = 100;
    this.srcY = 500;
    this.drawX = -20;
    this.drawY = 0;
    this.width = 5;
    this.height = 5;
    this.explosion = new Explosion();
}

Bullet.prototype.draw = function() {
    this.drawX += 3;
    ctxJet.drawImage(mainSpriteImage, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    this.checkHitEnemy();
    if (this.drawX > gameWidth) this.recycle();
};

Bullet.prototype.fire = function(startX, startY) {
    this.drawX = startX;
    this.drawY = startY;
};

Bullet.prototype.checkHitEnemy = function() 
{
    for (var i = 0; i < enemies.length; i++) 
	{            //checking conditions for bullet hit
        if (this.drawX >= enemies[i].drawX &&
            this.drawX <= enemies[i].drawX + enemies[i].width &&
            this.drawY >= enemies[i].drawY &&
            this.drawY <= enemies[i].drawY + enemies[i].height) {
                this.explosion.drawX = enemies[i].drawX - (this.explosion.width / 2);    //drawing explosion
                this.explosion.drawY = enemies[i].drawY;
                this.explosion.hasHit = true;
                this.recycle();
                enemies[i].recycleEnemy();
                this.jet.updateScore(enemies[i].rewardPoints);
        }
    }
};

Bullet.prototype.recycle = function() {
    this.drawX = -20;
};


// end of bullet functions



// explosion functions

function Explosion() {
    this.srcX = 750;
    this.srcY = 500;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 50;
    this.height = 50;
    this.hasHit = false;
    this.currentFrame = 0;
    this.totalFrames = 10;
}

Explosion.prototype.draw = function() {
    if (this.currentFrame <= this.totalFrames) {
        ctxJet.drawImage(mainSpriteImage, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
        this.currentFrame++;
    } else {
        this.hasHit = false;
        this.currentFrame = 0;
    }
};


// end of explosion functions












// enemy functions

function Enemy() {
    this.srcX = 0;
    this.srcY = 540;
    this.width = 100;
    this.height = 40;
    this.speed = 2;
    this.drawX = Math.floor(Math.random() * 1000) + gameWidth;
    this.drawY = Math.floor(Math.random() * 360);
    this.rewardPoints = 10;
}

Enemy.prototype.draw = function() {
    this.drawX -= this.speed;         //moving enemies toward our jet
    ctxEnemy.drawImage(mainSpriteImage, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    this.checkEscaped();   
};

Enemy.prototype.checkEscaped = function() {      //check if enemy has escaped..if yes make them reappear from left
    if (this.drawX + this.width <= 0) {
        this.recycleEnemy();
    }
};

Enemy.prototype.recycleEnemy = function() {
    this.drawX = Math.floor(Math.random() * 1000) + gameWidth;
    this.drawY = Math.floor(Math.random() * 360);
};

function clearCtxEnemy() {
    ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

// end enemy functions here






// button functions

function Button(xL, xR, yT, yB) {            // creating our button object
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom)
	{	//console.log("clicked perfectly inside");
		return true;
		
	}
};

// end of button functions








// event functions
function seeIfMouseClicked(e)                 //making our canvas button clickable
 {
    mouseX = e.pageX - canvasBg.offsetLeft;          //get the position of mouse pointer wrt canvas area
    mouseY = e.pageY - canvasBg.offsetTop;
    if (!isPlaying) 
	{
        if (btnPlay.checkClicked()) 
			playGame();
    }
}

function checkKeyDown(e) 
{
    var keyID = e.keyCode || e.which;
	//console.log("the key pressed is: "+keyID);
    if (keyID === 38) 
	{ //up arrow 
	saviourJet.isUpKey = true;
        e.preventDefault();      // to disable any by default function of arrow keys in our browsr.so that our game wrks smoothly..
    }
    if (keyID === 39)
	{ //right arrow 
        saviourJet.isRightKey = true;
        e.preventDefault();
    }
    if (keyID === 40) 
	{ //down arrow 
        saviourJet.isDownKey = true;
        e.preventDefault();
    }
    if (keyID === 37 || keyID === 65)
	{ //left arrow 
        saviourJet.isLeftKey = true;
        e.preventDefault();
    }
    if (keyID === 32)
	{ //spacebar         to fire the bullets
        saviourJet.isSpacebar = true;
        e.preventDefault();
    }
}

function checkKeyUp(e)
 {
    var keyID = e.keyCode || e.which;
    if (keyID === 38 || keyID === 87)
	{ //up arrow or W key
        saviourJet.isUpKey = false;
        e.preventDefault();
    }
    if (keyID === 39 || keyID === 68)
	{ //right arrow or D key
        saviourJet.isRightKey = false;
        e.preventDefault();
    }
    if (keyID === 40 || keyID === 83) 
	{ //down arrow or S key
        saviourJet.isDownKey = false;
        e.preventDefault();
    }
    if (keyID === 37 || keyID === 65)
	{ //left arrow or A key
        saviourJet.isLeftKey = false;
        e.preventDefault();
    }
    if (keyID === 32)
	{ //spacebar
        saviourJet.isSpacebar = false;
        e.preventDefault();
    }
}

// end of event functions