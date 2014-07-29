var canvasGame = document.getElementById('game_canvas');
var ctxGame = canvasGame.getContext('2d');

var canvasPipes = document.getElementById('pipes_canvas');
var ctxPipes = canvasPipes.getContext('2d');

var canvasFlappy = document.getElementById('flappy_canvas');
var ctxFlappy = canvasFlappy.getContext('2d');



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
background.src = 'flappy2.png';

flappy=new createFlappy();

function createFlappy(){
  //this.srcX=180;
  //this.srcY=635;
  this.width=80;
  this.height=50;
  this.drawX=50;
  this.drawY=300;
  this.drawWidth=50;
  this.drawHeight=25;
  this.radius=10;
  this.score=0;
  this.playerName="Mr X";
  this.isSpacebar=false;

}

createFlappy.prototype.draw=function(){
  if(!(this.isSpacebar))
  {
    this.drawY+=5;
    if(this.drawY>=410)         //flappy falls down
      {  isPlaying=false;
        flappy.playerName+="Game Over";
                alert(flappy.playerName);

      }

  }
  else
  {  
    if(this.drawY<0)
      this.drawY= 0;              //for upper limit of motion of flappy
    else   
    this.drawY-=5;
  }
  

    ctxFlappy.fillStyle="orange";
    ctxFlappy.beginPath(); 
    ctxFlappy.arc (this.drawX,this.drawY,this.radius, 0, 2 * Math.PI, false); 
    ctxFlappy.fill();
  //ctxFlappy.drawImage(background,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.drawWidth,this.drawHeight);
}
createFlappy.prototype.wipe=function(){

  ctxFlappy.clearRect(0,0,gameWidth,gameHeight);
}



background.addEventListener('load', start, false);

function start() 
{
     flappy.playerName=prompt("Your name buddy ","Mr x");
     definePipes();
     playGame();
      
}

function playGame() 
{
    drawBg();                    //creating a backg
    startLoop();
                  
    document.addEventListener('keydown', checkKeyDown, false);  //game controls
    document.addEventListener('keyup', checkKeyUp, false);
}

function startLoop() 
{
    isPlaying = true;
    loop();
}


function loop() 
{
    if (isPlaying)
     {
        moveBg();
        drawBg();
        animatePipes();
        flappy.wipe();
        flappy.draw(); 
         
         checkHit();     // check if flappy has hit obstacles
        
        animationControl=requestAnimFrame(loop);
    }
}


function drawBg() {
  
    ctxGame.clearRect(0, 0, gameWidth, gameHeight);
    ctxGame.drawImage(background, 0, 0, 2400, gameHeight, bgDrawX1, 0, 2400, gameHeight);  //backg 1
    ctxGame.drawImage(background, 0, 0, 2400, gameHeight, bgDrawX2, 0, 2400, gameHeight);   //backg 2*/
}

function moveBg() {
    bgDrawX1 -= 3;
    bgDrawX2 -= 3;
                                //changing coordinate data of obstacle
            
    if (bgDrawX1 <= -2400) {           //if backg 1 moves to extreme left shift it to extreme right
        bgDrawX1 = 2400;
    } else if (bgDrawX2 <= -2400) {
        bgDrawX2 = 2400;
    }
    drawBg();
}





var obstacle=[];

function createObstacle(X,H){

 this.x_init=X;
 this.height=H;
 this.width=80;
 this.hole=100;          //hole in between them
 this.gap=250;           //gap between two obstacles
 this.totalHeight=465;
}

function animatePipes()
{

  if(obstacle[49].x_init>0)
  {

        for(i=0;i<50;i++)
        {  
          obstacle[i].x_init-=3;        //all pipes shifted to left by 3px;
        }

        movePipes();


  }

  else
  {
    definePipes();   //or give message that game is over
  }

}

  function movePipes(){
      
      wipePipes();
      drawPipes();

  }
 
function drawPipes(){

  for(i=0;i<50;i++)
  {   ctxPipes.fillStyle="olive";
      
      ctxPipes.fillRect(obstacle[i].x_init,0,obstacle[i].width,obstacle[i].height);  
       //^upper pipe created
      var as=365-obstacle[i].height;
       
      if(flappy.drawX+flappy.width<obstacle[i].x_init&&flappy.drawX>obstacle[i]+obstacle[i].width)
         {
          ctxPipes.fillStyle="#80ffff";
          ctxPipes.fillRect(obstacle[i].x_init,obstacle[i].height,obstacle[i].width,100);
         }
       else
       {
        ctxPipes.clearRect(obstacle[i].x_init,obstacle[i].height,obstacle[i].width,100);
       }


      ctxPipes.fillStyle="olive";
      ctxPipes.fillRect(obstacle[i].x_init,(obstacle[i].height+100),obstacle[i].width,as);
      //^lower pipe created
      ctxPipes.fill();
  }


 }
 function wipePipes(){

  ctxPipes.clearRect(0,0,gameWidth,gameHeight);
 }




function definePipes()
{
  var x1=320,h1,h2;
  for(i=0;i<50;i+=2)
        {
                      h1=Math.floor(Math.random()*365);           // 465 is total height of Pipe area
                      h2=Math.floor(Math.random()*365);                
                        
                      while( !((Math.abs(h1-h2)<250)&&(h1<365)&&(h2<365)) )  // for making it playable
                      {
                         h1=Math.floor(Math.random()*365);
                         h2=Math.floor(Math.random()*365);

                      }
                     // console.log(h1+" "+h2);   // all fine here
                    


                    obstacle[i]= new createObstacle(x1,h1);
                    
                     if(i==49)
                           break;

                    obstacle[i+1]= new createObstacle(x1+350,h2);  
                    x1+=350;   //separation btwnn adjacent pipes is 350
       }

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



function checkHit()
{        // MODIFY IT
    for(var i=0;i<50;i++)
    {
        //if(((flappy.drawX+flappy.drawWidth)>obstacle[i].x_init) && (flappy.drawX<(obstacle[i].x_init+obstacle[i].width)) )
           if(((flappy.drawX+flappy.radius)>obstacle[i].x_init)&&( (flappy.drawX-flappy.radius) <(obstacle[i].x_init+obstacle[i].width)) )
        {     // i.e if flappy is inside the pipe width
            if ((( flappy.drawY-flappy.radius )<obstacle[i].height||(flappy.drawY+flappy.radius)>(obstacle[i].height+100)))
              { 
                 isPlaying=false;
                 flappy.playerName="Game Over"+flappy.playerName+"!";
                 window.cancelAnimationFrame(animationControl);
                 //console.log("flappyNose "+(flappy.drawX+flappy.drawWidth)+"flappy Y and  obstacle Y and obstacle x:"+flappy.drawY+" "+ obstacle[i].height+" "+obstacle[i].x_init )
               
              }
              
            

        }
    }        
}

