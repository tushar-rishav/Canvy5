   (function(){
     canvasGame = document.getElementById('game_canvas');
     ctxGame = canvasGame.getContext('2d');
     
     canvasPipes = document.getElementById('pipes_canvas');
     ctxPipes = canvasPipes.getContext('2d');
     
     canvasFlappy = document.getElementById('flappy_canvas');
     ctxFlappy = canvasFlappy.getContext('2d');

   
    ctxGame.fillStyle = "hsla(0, 0%, 0%, 0.5)";
    ctxGame.font = "bold 20px Arial";

     bigS=new Image();
    bigS.src='images/birdie.png';
   

    birdChoosen=false;
     obstacle=[], gameWidth=canvasPipes.width, gameHeight=canvasPipes.height,bgDrawX1 = 0,bgDrawX2 = 2400,colorCode=[],pipe_speed=3,bg_speed=5;
      isPlaying=true;

    })();

    window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       ||        //adding browser compatibility
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
    function birdType(choice){

      switch(choice){
        case 1:{
           bird=new Image();
           bird.src="images/phoenix.png";                                                   
          flappy=new createFlappy(10,190,95,90,1);
          
          break;
        }
       
        case 2:{
           bird=new Image();
          bird.src="images/bird.png";
          flappy=new createFlappy(0,70,63,50,2);      //blue berry

          break;
        }
        
         case 3:{
          
          bird=bigS;
          flappy=new createFlappy(3,490,17,12.5,3);        //normal flappy
          break;
        }

        default:alert("no bird chosen");
      }
      birdChoosen=true;

      start();
     

    }
     createFlappy.prototype.animateFlappy=function(){

       switch(this.indx)
       {
        case 1:
        {
          this.radius=20;
          if(this.srcX<375&&this.srcX>9)
                this.srcX+=90;

            else
              this.srcX=10;
          break;
        }

        case 2:
           {
              this.radius=17;
            if(this.srcX<255&&this.srcX>=0)
                this.srcX+=64;
            if(this.srcX>255)
              this.srcX=0;
            
            break;
           }
       
        case 3:
              { if(this.srcX<76&&this.srcX>=3)
                  this.srcX+=28;
             
                if(this.srcX>=76)
                  this.srcX=3;
               // console.log(this.srcX);
                break;
              }
       
       }
    
  }

    
    function start()
    {
          if(birdChoosen)
        {
         
          document.getElementById("top").style.display="none";
          flappy.playerName=prompt("Your name buddy ","Mr x");
          alert("use spacebar to control the birdie!");
          definePipes();
          welcomeMsg();
        }
    }

    function welcomeMsg(){

        if(isPlaying)
        {
          ctxGame.drawImage(bigS,292,57,97,25,gameWidth/3,gameHeight/3,gameWidth/4,gameHeight/4);
          setTimeout(playGame,3000);
        }
        
        else
           {
            ctxPipes.clearRect(0,0,gameWidth,gameHeight);
                    
            ctxGame.drawImage(bigS,394,57,97,25,gameWidth/3,gameHeight/3,gameWidth/4,gameHeight/4);
            ctxGame.fillText(flappy.playerName+" Score: " + score, gameWidth/3,gameHeight-50);  // for adding score at the end
          }
           

    }
     
     
     
     
     
    function playGame()
    {
       // drawBg();                    //creating a backg
        startLoop();
                     
        document.addEventListener('keydown', checkKeyDown);  //game controls
        document.addEventListener('keyup', checkKeyUp);
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
     
     
    function drawBg() {
     
        ctxGame.clearRect(0, 0, gameWidth, gameHeight);
        //ctxGame.drawImage(background, 0, 465, 2400, gameHeight, bgDrawX1, 466, 2400, gameHeight);  //backg 1
        //ctxGame.drawImage(background, 0, 465, 2400, gameHeight, bgDrawX2, 466, 2400, gameHeight);   //backg 2*/
        
        ctxGame.drawImage(bigS, 292.5, 0, 107.5, 55, bgDrawX1, 466, 2400, 250);  //backg 1
        ctxGame.drawImage(bigS, 292.5, 0, 107.5, 55, bgDrawX2, 466, 2400, 250);   //backg 2*/
        
        ctxGame.fillText(flappy.playerName+" Score: " + score, gameWidth/3,gameHeight-50);

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
            flappy.animateFlappy();
        }
    }
     
    function animatePipes()
    {
     
      if(obstacle[249].x_init>0)
      {
     
            for(i=0;i<250;i++)
            {  
              obstacle[i].x_init-=pipe_speed;        //all pipes shifted to left by 3px;
            }
     
            movePipes();
     
     
      }
     
      else
      {
        definePipes();   //or give message that game is over
      }
     
    }
     
     
     
    function moveBg() {
        bgDrawX1 -= bg_speed;
        bgDrawX2 -= bg_speed;
                                    //changing coordinate data of obstacle
               
        if (bgDrawX1 <=-2400) {           //if backg 1 moves to extreme left shift it to extreme right
            bgDrawX1 = 2400;
        } else if (bgDrawX2 < -2400) {
            bgDrawX2 = 2400;
        }
        drawBg();
        bg_speed+=0.02;
        pipe_speed+=0.001

        if(pipe_speed>4)
          pipe_speed=3;
        if(bg_speed>25)
          bg_speed=5;
    }
     
     
     
     
     
    var obstacle=[];
    var c=0;
    function createObstacle(X,H,clr){
     this.index=c++;
     this.x_init=X;
     this.height=H;           //height of top pipe
     this.width=80;
     this.hole=100;          //hole in between them
     this.gap=250;           //gap between two obstacles
     this.totalHeight=465; 
     this.fStyle=clr;
     //console.log(arguments);      //height of toppipe+bottompipe+hole
    }
     
     
     
      function movePipes(){
         
          wipePipes();
          drawPipes();
     
      }
     
      function definePipes()
    {
      var x1=800,h1,h2;
      for(i=0;i<250;i+=2)
            {
                      h1=Math.floor(Math.random()*365);           // 465 is total height of Pipe area
                      h2=Math.floor(Math.random()*365);                
                        
                      while( !((Math.abs(h1-h2)<250)&&(h1<365)&&(h2<365)&&h1>40) )  // for making it playable
                      {
                         h1=Math.floor(Math.random()*365);
                         h2=Math.floor(Math.random()*365);

                      }

                        for(var c=0;c<3;c++)
                        colorCode[c]=Math.floor(Math.random()*255);        
                           
                         x1+=200;
                         obstacle[i]= new createObstacle(x1,h1,colorCode);
                         x1+=200;  
                         obstacle[i+1]= new createObstacle(x1,h2,colorCode);
     
                        if(i==249)
                               break;
                        
           }

            
           
     
    }
     
    function drawPipes(){
           
     
      for(i=0;i<250;i+=2)
      {   
          var pattern=Math.floor(i%20);
          
          if(pattern<10)
          {
            ctxPipes.fillStyle= "rgb("+obstacle[i].fStyle[0]+","+obstacle[i].fStyle[1]+","+obstacle[i].fStyle[2]+")";
            ctxPipes.fillRect(obstacle[i].x_init,0,obstacle[i].width,obstacle[i].height);
            ctxPipes.fill();
            
            ctxPipes.fillStyle= "rgb("+obstacle[i].fStyle[0]+","+obstacle[i].fStyle[2]+","+obstacle[i].fStyle[1]+")";                              
            ctxPipes.fillRect(obstacle[i].x_init,(100+obstacle[i].height),obstacle[i].width,367-obstacle[i].height);
            ctxPipes.fill();

          }
          
         else
         {

            ctxPipes.fillStyle="rgb("+obstacle[i].fStyle[2]+","+obstacle[i].fStyle[1]+","+obstacle[i].fStyle[0]+")";
            ctxPipes.fillRect(obstacle[i].x_init,0,obstacle[i].width,obstacle[i].height);
            ctxPipes.fill();
            
            ctxPipes.fillStyle="rgb("+obstacle[i].fStyle[1]+","+obstacle[i].fStyle[0]+","+obstacle[i].fStyle[2]+")";                              
            ctxPipes.fillRect(obstacle[i].x_init,(100+obstacle[i].height),obstacle[i].width,367-obstacle[i].height);
            ctxPipes.fill();

         }

      }

      
     
     }
    
     function wipePipes(){
     
      ctxPipes.clearRect(0,0,gameWidth,gameHeight);
     }
     
     function createFlappy(sX,sY,sW,sH,index){
     

      this.srcX=sX;
      this.srcY= sY;
      this.width=sW;
      this.height=sH;
      this.indx=index;
      this.drawX=50;
      this.drawY=100;
       
      this.radius=15;           // inittial value of radius was 10
      this.score=0;
      this.playerName="Mr X";
      this.isSpacebar=false;
     
    }
 var fCounter=0;
   

    createFlappy.prototype.draw=function(){
      if(!(this.isSpacebar))
      {
        this.drawY+=4;
        if( (this.drawY+this.radius)>=415)         //flappy falls down
          {  
            isPlaying=false;
            welcomeMsg();
     
          }

          
     
      }
      else
      {  
        if(this.drawY<0)
          this.drawY=0;              //for upper limit of motion of flappy
        else  
        this.drawY-=3.5;
      }
     
     
        ctxFlappy.drawImage(bird,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.radius*2,this.radius*2);
     
    }
    createFlappy.prototype.wipe=function(){
     
     ctxFlappy.clearRect(0,0,gameWidth,gameHeight);
    }
     
     
    function checkHit()
    {      
        for(var i=0;i<250;i+=2)
        {
           
               
           
              if( flappy.drawX+flappy.radius>obstacle[i].x_init && flappy.drawX-flappy.radius<obstacle[i].x_init+obstacle[i].width-10)
             {    
                if(flappy.drawY+flappy.radius+25<=obstacle[i].height||flappy.drawY>=obstacle[i].height+35)  
                  {
                    
                    flappy.playerName="Game Over "+flappy.playerName+". Your ";
                    moveBg();
                    drawBg();  //adding game over message before exiting
                    isPlaying=false;
                    
                    window.cancelAnimationFrame(animationControl);
                    welcomeMsg();

                  }

                  else
                  { 

                    score=obstacle[i].index/2+1;

                  }

               }
     
             
        }        
    }

    var score=0;

   

    
