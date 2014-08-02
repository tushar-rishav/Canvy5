//DECLARING CANVAS AND ITS CONTEXT
 gamebg=document.getElementById('gamebg');
 gamebgCtx=gamebg.getContext('2d');
 
 bricks=document.getElementById('bricks');
 bricksCtx=bricks.getContext('2d');

 striker=document.getElementById('striker');
 strikerCtx=bricks.getContext('2d');

 platform=document.getElementById('platform');
 platformCtx=platform.getContext('2d');
 
 score=document.getElementById('score');
 scoreCtx=score.getContext('2d');

 scoreCtx.fillStyle = "white";
 scoreCtx.font = "bold 20px Arial";

 spriteImage= new Image();
 spriteImage.src='backgSpriteImg.png';
 
   var browsers = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < browsers.length && !window.requestAnimationFrame; ++x) 
      window.requestAnimationFrame = window[browsers[x]+'RequestAnimationFrame'];

   var requestAnimFrame=window.requestAnimationFrame|| function(callback) {
                            window.setTimeout(callback, 1000 / 60);};
//DECLARING VARIABLES

 gameWidth=gamebg.width;
 gameHeight=gamebg.height;
 var brickCount=[],platformObj= new createPlatform(), strikerObj= new createStriker(),player1= new player(), bricksObj=[],bricksX=0, bricksY=0,platformHit=false,keypressed=0,foul=false,isStart=false;

 function init()
 {  
    gamebgCtx.fillStyle="black";
    gamebgCtx.fillRect(0,0,gameWidth,gameHeight);
    for(i=0;i<65;i++)   
       {            //BRICK OBJECTS CREATED
         if(i==3||i==19||i==25||i==29||i==41||i==50||i==56)
            bricksObj.push(new createSpecialBricks());    
         else
            bricksObj.push(new createNormalBricks());
       }
     document.getElementById("sound").innerHTML='<audio id="hitPlay" src="sound.mp3" autoplay ></audio>';  
    myLoop();
 }

 function myLoop(){
    if(foul)
      {   //player1.nameIs+=" Game over";
          window.cancelAnimationFrame(animationControl);
          //foul=false;
      } 
     platformObj.draw();
     strikerObj.draw();
     drawBricks();
    // fallingBricks();
     
     animationControl=requestAnimFrame(myLoop);
 }
 function fallingBricks(){
  
   for(var i=0;i<brickCount.length;i++)
   {
      bricksObj[brickCount[i]].drawY+=2;
   }

 }

 function drawBricks()
 {  //console.log("bricks drawing");
   
  for(var i=0;i<65;i++)
    {     // bricksCoord.push();
           bricksObj[i].drawX=bricksX;
           bricksObj[i].drawY=bricksY;
         
           if(!bricksObj[i].hit)
             { 
                bricksObj[i].draw();
               
             }

           bricksX+=bricksObj[0].width;


           if(i==12||i==25||i==38||i==51)
           {
            bricksX=0;
            bricksY+=bricksObj[0].height+2;
           }
           //A LAYER OF 13 BRICKS CREATED
           
       
    }
    checkHit();
    bricksX=0;
    bricksY=0;
      
  }

function checkHit()
{

  for(var j=0;j<65;j++)
  {
 
    if(strikerObj.drawY<=5*bricksObj[0].height&&strikerObj.drawY>((j/13)*bricksObj[0].height)&&strikerObj.drawX>=bricksObj[j].drawX&&strikerObj.drawX<=(bricksObj[j].drawX+bricksObj[0].width) )
     { // PAIN HERE 
      
      bricksObj[j].hit=true; 
      if(j==3||j==19||j==25||j==29||j==41||j==50||j==56)
      {
        //bricksObj[j].exists=false;   //the brick has been hit so it do not exists anymore.
        
        //brickCount.push(j);  

        console.log(j); //get the id of special brick
      }
      player1.updateScore();

      //console.log(j); 

     }
  }
}

//END OF VARIABLE DECLARATION

 

 
 
  //DRAWING BACKGROUND

 spriteImage.addEventListener('load',init, false);



function createNormalBricks(){
  this.srcX=10;
  this.srcY=200;
  this.drawX=0;
  this.drawY=0;
  this.height=20;
  this.width=100;
  this.hit=false;
  this.exists=true;
}

createNormalBricks.prototype.draw=function(){
  //clearbricks();
  //console.log("drawing");
  bricksCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
 
}

  
 /*function clearbricks(){
  bricksCtx.clearRect(0,0,gameWidth,gameHeight);
  }*/


function createSpecialBricks(){
  this.srcX=10;
  this.srcY=300;
  this.drawX=0;
  this.drawY=0;
  this.height=20;
  this.width=100;
  this.hit=false;
  this.exists=true;
  //console.log("special bricks created");
}

createSpecialBricks.prototype.draw=function()
{
 // clearbricks();
 bricksCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);


}









function player(){
  this.nameIs="Mr X";
  this.score=0;
}
 player.prototype.updateScore=function() {   // updating score point
    scoreCtx.clearRect(0, 0, gameWidth, gameHeight);
    player1.score+=1;
    scoreCtx.fillText(player1.nameIs+" Score: "+ player1.score, gameWidth/2,gameHeight-30);
}


function createStriker()
{
  this.srcX=10;
	this.srcY=400;
	this.width=30;
	this.height=30;
	this.velocity_x=5;
	this.velocity_y=-5;
	this.init_angle=Math.PI*76/180;
  
	this.drawX=gameWidth/2+platformObj.width/2;
	this.drawY=gameHeight-105;

}

createStriker.prototype.draw=function()
{  clearStriker();
  if(isStart)
  {  
      checkForCollision(); // IN FUTURE MODIFY VELOCITY WITH TIME.i.e INCREASE SPEED WD TIME..SO MAKE IT TOUGHER TO PLAY
      this.drawX+=this.velocity_x*Math.cos(this.init_angle);
      this.drawY+=this.velocity_y*Math.sin(this.init_angle);
      strikerCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
  }
   
  else
    strikerCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
   
 } 

function clearStriker()
{
	strikerCtx.clearRect(0,0,gameWidth,gameHeight);
}
 function checkForCollision()
 {  
   if(strikerObj.drawX>1278||strikerObj.drawX<10||strikerObj.drawY<10||strikerObj.drawY>(gameHeight-platformObj.height-60))
    {

    	if(strikerObj.drawY<0||strikerObj.drawY>(gameHeight-platformObj.height))
    	{   
    		if(strikerObj.drawY>(gameHeight-platformObj.height-60))
    		{   //game over
    			foul=true;
          strikerObj.drawX=gameWidth/2+platformObj.width/2;
          strikerObj.drawY=gameHeight-105;
          platformObj.drawX=gameWidth/2;
          platformObj.drawY=gameHeight-60;
          player1.nameIs="Game Over"
          player1.updateScore();
          isStart=false;
    			
    		}
    		else
    		{
    			 strikerObj.velocity_y*=-1;
				   strikerObj.velocity_x*=1;
           //modify
			  }

    	}

    	if(strikerObj.drawX>1278||strikerObj.drawX<10)
    	{
    		strikerObj.velocity_y*=1;
			  strikerObj.velocity_x*=-1;
    	}


   }


    	if((strikerObj.drawX>platformObj.drawX )&& (strikerObj.drawX<(platformObj.drawX+platformObj.width))&&(strikerObj.drawY>(gameHeight-platformObj.height-40) ) )  	
   			{

   				        strikerObj.velocity_y*=-1;
         // player1.updateScore();
                   foul=false;
                  
   			}
       
   
 }
 

/* function changeReboundAngle(){
 var sX=strikerObj.drawX,pX=platformObj.drawX,angle=0,origin=pX+(platformObj.width/2);

  if(sX<origin)
  {
    angle=(90/platformObj.width)*(origin-sX)-45;
  }
  else
  {
    angle=(90/platformObj.width)*(origin-sX)+45;
  }  
  console.log(angle);
  angle=Math.PI*angle/180;  //CONVERTED TO RADIAN
  strikerObj.init_angle=angle;


}
*/
//	CREATING PLATFORM OBJECT AND ITS ASSOCIATED METHOD

  /**************************************************************/
function createPlatform() {
	this.srcX=0;
	this.srcY=0;
	this.drawX=gameWidth/2;
	this.width=170;
	this.height=60;
	this.drawY=gameHeight-this.height;
  this.isRightKey=false;
	this.isLeftKey=false;
	this.isSpacebar=false;

}
  /**************************************************************/
createPlatform.prototype.draw=function(){
     clearPlatform();
     checkForKeys();
     platformCtx.drawImage(spriteImage,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
     
}
  /**************************************************************/
function clearPlatform(){
  //console.log("clearing");
	platformCtx.clearRect(0,0,gameWidth,gameHeight);
}
  /**************************************************************/

    document.addEventListener('keydown', checkKeyDown, false);  //game controls
    document.addEventListener('keyup', checkKeyUp, false);

     /**************************************************************/

   function checkKeyUp(e){
   			 var keyID = e.keyCode || e.which;
	//console.log("the key pressed is: "+keyID);
    
    if (keyID === 39)
	{ //right arrow 
        platformObj.isRightKey = false;
        e.preventDefault();
    }
   
    if (keyID === 37 )
	{ //left arrow 
        platformObj.isLeftKey = false;
        e.preventDefault();
    }
    if (keyID === 32)
	{ //spacebar  to increase movement speed 
        platformObj.isSpacebar = false;
        e.preventDefault();
    }
   if(keyID===38||keyID==40)
   {
   	e.preventDefault();
   }

   }
     /**************************************************************/

   function checkKeyDown(e){
      
       var  keyID = e.keyCode || e.which;
       
      if (keyID === 13)
    { // ENTER to start the game 
        isStart = true;
        player1.score=-1;
        player1.nameIs="Mr X";
        e.preventDefault();
    }
	  //console.log("the key pressed is: "+keyID);
      if(isStart)
        {
          if (keyID === 39)
      	  { //right arrow 
              platformObj.isRightKey = true;
              e.preventDefault();
          }
         
          if (keyID === 37 )
      	  { //left arrow 
              platformObj.isLeftKey = true;
              e.preventDefault();
          }
          if (keyID === 32)
      	  { //spacebar  to increase movement speed 
              platformObj.isSpacebar = true;
              e.preventDefault();
          }
    
        }
 
   }
     /**************************************************************/

   function checkForKeys()
   {
	    
      if(platformObj.isRightKey&&platformObj.drawX<1146)
        platformObj.drawX+=3;
      

      if(platformObj.isLeftKey&&platformObj.drawX>0)
         platformObj.drawX-=3;
      
      
      if(platformObj.isSpacebar&&platformObj.isLeftKey&&platformObj.drawX>0)
          platformObj.drawX-=5;
       

      if(platformObj.isSpacebar&&platformObj.isRightKey&&platformObj.drawX<1146)
          platformObj.drawX+=5;
   }

   /**************************************************************/
