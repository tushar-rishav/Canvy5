var canvasGame = document.getElementById('game_canvas');
var ctxGame = canvasGame.getContext('2d');

var canvasScore = document.getElementById('score_canvas');
var ctxScore = canvasScore.getContext('2d');

var canvasRunner = document.getElementById('runner_canvas');
var ctxRunner = canvasScore.getContext('2d');

var canvasObstacle = document.getElementById('obstacle_canvas');
var ctxObstacle = canvasObstacle.getContext('2d');

ctxScore.fillStyle = "hsla(0, 0%, 0%, 0.5)";
ctxScore.font = "bold 20px Arial";

var obstacle=[], gameWidth=canvasGame.width,count=0,lock=true, gameHeight=canvasGame.height,bgDrawX1 = 0,bgDrawX2 = 1600,x_init,x_start,score=0;
var  isPlaying=false,sec1,sec2;

var requestAnimFrame =  window.requestAnimationFrame ||            //adding browser compatibility
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);        //in worse case of some failure or some exceptions
                        };


background = new Image();
background.src = 'lineRunner.png';


for(var i=0;i<10;i++)
	{ 
        x_init=Math.floor((Math.random()*gameWidth*2));  //creating random obstcales  // CRITICAL AREA
        
        if(x_init<200)
            x_init=200;

        obstacle.push(new createObstacles(x_init));  
    }
         //creating obstacle
//console.log(obstacle);
var runner=new createRunner();
//console.log(flappy);



function createObstacles(x_start)
{
   // console.log("created");
    this.srcX=100;
    this.srcY=650;

	this.drawX=x_start;
	this.drawY=360;
	this.width=20;
	this.height=20;

}
createObstacles.prototype.draw =function(){
ctxObstacle.drawImage(background,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
}

createObstacles.prototype.wipe=function(){
    ctxObstacle.clearRect(0,0,gameWidth,gameHeight);
}
function createRunner(){
	this.srcX=425;
	this.srcY=630;
	this.width=45;
	this.height=60;
	this.drawX=10;
	this.drawY=340;
	this.playerName="Mr X";
	this.isUp=false;
    this.rt=false;
    this.lt=false;

}
var accomp=true;
createRunner.prototype.draw=function()
{
    

	if(!(this.isUp))              //make it fall once u leave the up arrow key
	{  
		
        this.drawY+=5;
		if(this.drawY>=340)
			{  
                this.drawY=340;        //while coming down..set lower limit

			}

	}
	else
	{      
       //if(lock)
		

        if(this.drawY==350)
        {   
            
            accomp=true;
            
         }
        // else
         //this.drawY-=5;     

            if(accomp)
               { 
                    this.drawY+=5;
                 if(this.drawY==340)
                 {
                    accomp=false;
                 }

               }

               else
                this.drawY-=5;

    }   

                

	

	ctxRunner.drawImage(background,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
}

var accomp=false;
createRunner.prototype.wipe=function(){

	ctxRunner.clearRect(0,0,gameWidth,gameHeight);
}
function updateScore(){
	score+=1;
	ctxScore.clearRect(0, 0, gameWidth, gameHeight);
    ctxScore.fillText(runner.playerName+" Score: " + score, 620, 500);
}


background.addEventListener('load', start, false);

function start() {
     //runner.playerName=prompt("Your name buddy ","Mr x");
     
     //console.log(obstacle);
	//console.log(runner.playerName);
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
    ctxGame.drawImage(background, 0, 0, 1600, gameHeight, bgDrawX1, 0, 1600, gameHeight);  //backg 1
    ctxGame.drawImage(background, 0, 0, 1600, gameHeight, bgDrawX2, 0, 1600, gameHeight);   //backg 2
}

function moveBg(){
    {
    bgDrawX1 -= 2;
    bgDrawX2 -= 2;
    }                                 //changing coordinate data of obstacle
          
    if (bgDrawX1 <= -1600) {           //if backg 1 moves to extreme left shift it to extreme right
        bgDrawX1 = 1600;
    } else if (bgDrawX2 <= -1600) {
        bgDrawX2 = 1600;
    }
    drawBg();
}



function loop() 
{
    if (isPlaying)
     {
        moveBg();
        runner.wipe();
        runner.draw(); 
        wipeObstacles();
        obstacleMove();
        
        //obstacle[h].wipe();
       
       checkHit();     // check if flappy has hit obstacles
        animationControl=requestAnimFrame(loop);
    }
}

function obstacleMove(){
    var getRand=Math.floor(Math.random()*30);
    for(var h=0;h<10;h++)
        {   if(obstacle[h].drawX<-800)
              {  
                obstacle[h].drawX=800;
                if(h==getRand)
                obstacle[h].drawY-=20;

              } 
            else  
            obstacle[h].drawX-=3;



            obstacle[h].draw();

        }  
}
function wipeObstacles(){
ctxObstacle.clearRect(0,0,gameWidth,gameHeight); 
}

function startLoop() {
    isPlaying = true;
    loop();
}


function checkKeyDown(e) 
{
    var keyID = e.keyCode || e.which;
	//console.log("the key pressed is: "+keyID);
    
    if (keyID === 38)
	{   if((runner.drawY+runner.height)>=400)
          runner.isUp = true;
          e.preventDefault();
    }
   /* if(keyID === 37)
    {
        runner.lt=true;
        e.preventDefault();
    }

    if(keyID===39)
    {
        runner.rt=true;
        e.preventDefault();
    }*/
}

function checkKeyUp(e)
 {
    var keyID = e.keyCode || e.which;
    
	    if (keyID === 38)
	{ //spacebar
        runner.isUp = false;
        e.preventDefault();
    }

  
}



function checkHit()
{
    for(var i=0;i<10;i++)
    {
        if((runner.drawX+runner.width)>obstacle[i].drawX&&runner.drawX<(obstacle[i].drawX+obstacle[i].width))
        {
            if( (runner.drawY+runner.height)>(obstacle[i].drawY+obstacle[i].height))
            {
                isPlaying=false;
                runner.wipe();
                console.log("game over");
                console.log(runner.drawY+" "+obstacle[i].drawY);
                runner.srcX=300;
                runner.srcY=610;
                runner.width=40;
                runner.height=100;
                runner.drawY=320;
                ctxObstacle.clearRect(obstacle[i].drawX,obstacle[i].drawY,obstacle[i].width+10,obstacle[i].height);
                runner.draw();
                 window.cancelAnimationFrame(animationControl);
             }   


               // console.log(runner.drawX+" "+runner.drawY+" "+obstacle[i].drawX+" "+obstacle[i].drawY );
               
        }

    }   
    //updateScore();     
}