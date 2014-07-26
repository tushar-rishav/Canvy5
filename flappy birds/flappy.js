var canvasGame = document.getElementById('game_canvas');
var ctxGame = canvasGame.getContext('2d');

var canvasScore = document.getElementById('score_canvas');
var ctxScore = canvasScore.getContext('2d');

var canvasFlappy = document.getElementById('flappy_canvas');
var ctxFlappy = canvasScore.getContext('2d');

ctxScore.fillStyle = "hsla(0, 0%, 0%, 0.5)";
ctxScore.font = "bold 20px Arial";

var obstacle=[], gameWidth=canvasGame.width, gameHeight=canvasGame.height,bgDrawX1 = 0,bgDrawX2 = 2400;
var  isPlaying=false;

var requestAnimFrame =  window.requestAnimationFrame ||            //adding browser compatibility
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);        //in worse case of some failure or some exceptions
                        };


background = new Image();
background.src = 'flappy.png';
var x_init=300;
for(var i=0;i<8;i++)
	{ 

    obstacle.push(new createObstacles(x_init));  
    x_init+=250;

    }     //creating obstacle
//console.log(obstacle);
var flappy=new createFlappy();
//console.log(flappy);



function createObstacles(x_start)
{
   // console.log("created");
	this.x=x_start;
	this.y=0;
	this.width=80;
	this.gap=100;

}

function createFlappy(){
	this.srcX=170;
	this.srcY=630;
	this.width=90;
	this.height=55;
	this.drawX=10;
	this.drawY=300;
	this.score=0;
	this.playerName="Mr X";
	this.isSpacebar=false;

}

createFlappy.prototype.draw=function(){
	if(!(this.isSpacebar))
	{
		this.drawY+=5;
		if(this.drawY>=450)
			{  isPlaying=false;
				flappy.playerName+="Game Over";
                alert(flappy.playerName);

			}

	}
	else
	{
		this.drawY-=5;
	}

	ctxFlappy.drawImage(background,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width-10,this.height-30);
}
createFlappy.prototype.wipe=function(){

	ctxFlappy.clearRect(0,0,gameWidth,gameHeight);
}

createFlappy.prototype.updateScore=function(){
	this.score+=1;
	ctxScore.clearRect(0, 0, gameWidth, gameHeight);
    ctxScore.fillText(this.playerName+" Score: " + this.score, 620, 500);
}


background.addEventListener('load', start, false);

function start() {
     flappy.playerName=prompt("Your name buddy ","Mr x");
      defineObstacles();
     //console.log(obstacle);
	//console.log(flappy.playerName);
	playGame();
      
    
}

function playGame() {
    drawBg();              //creating a backg
    startLoop();
   // flappy.updateScore();                 //updating the score
    document.addEventListener('keydown', checkKeyDown, false);  //game controls
    document.addEventListener('keyup', checkKeyUp, false);
}

function drawBg() {
    ctxGame.clearRect(0, 0, gameWidth, gameHeight);
    ctxGame.drawImage(background, 0, 0, 2400, gameHeight, bgDrawX1, 0, 2400, gameHeight);  //backg 1
    ctxGame.drawImage(background, 0, 0, 2400, gameHeight, bgDrawX2, 0, 2400, gameHeight);   //backg 2
}

function moveBg() {
    bgDrawX1 -= 3;
    bgDrawX2 -= 3;

    for(k=0;k<8;k++)
    {

        if(obstacle[k].x>=-obstacle[k].width)
            obstacle[k].x-=3; 

         else
         obstacle[k].x=2400+obstacle[k].gap;  
    }                                 //changing coordinate data of obstacle
            
    if (bgDrawX1 <= -2400) {           //if backg 1 moves to extreme left shift it to extreme right
        bgDrawX1 = 2400;
    } else if (bgDrawX2 <= -2400) {
        bgDrawX2 = 2400;
    }
    drawBg();
}



function loop() 
{
    if (isPlaying)
     {
        moveBg();
        flappy.wipe();
        flappy.draw();  
        checkHit();     // check if flappy has hit obstacles
        animationControl=requestAnimFrame(loop);
    }
}


function startLoop() {
    isPlaying = true;
    loop();
}


function checkKeyDown(e) 
{
    var keyID = e.keyCode || e.which;
	//console.log("the key pressed is: "+keyID);
    
    if (keyID === 32)
	{ //spacebar         to fire the bullets
        flappy.isSpacebar = true;
        e.preventDefault();
    }
}

function checkKeyUp(e)
 {
    var keyID = e.keyCode || e.which;
    
	    if (keyID === 32)
	{ //spacebar
        flappy.isSpacebar = false;
        e.preventDefault();
    }
}

function defineObstacles(){
    for(var obs=0;obs<8;obs++)
    {
        switch(obs)
        {
            case 0:{obstacle[obs].y=150;break;}

            case 1:{obstacle[obs].y=200;break;}

            case 2:{obstacle[obs].y=100;break;}

            case 3:{obstacle[obs].y=300;break;}

            case 4:{obstacle[obs].y=150;break;}

            case 5:{obstacle[obs].y=230;break;}

            case 6:{obstacle[obs].y=260;break;}

            case 7:{obstacle[obs].y=110;break;}

        }
    }
}

function checkHit()
{
    for(var i=0;i<8;i++)
    {
        if((flappy.drawX+flappy.width)>obstacle[i].x&&flappy.drawX<(obstacle[i].x+obstacle[i].width))
        {
            if((flappy.drawY+15)<obstacle[i].y||(flappy.drawY-4)>(obstacle[i].y+obstacle[i].gap))
                isPlaying=false;
                //alert("game over");
                console.log(flappy.drawX+" "+flappy.drawY+" "+obstacle[i].x+" "+obstacle[i].y );
                window.cancelAnimationFrame(animationControl);
        }
    }        
}