    var canvasGame = document.getElementById('game_canvas');
    var ctxGame = canvasGame.getContext('2d');
     
    var canvasPipes = document.getElementById('pipes_canvas');
    var ctxPipes = canvasPipes.getContext('2d');
     
    var canvasFlappy = document.getElementById('flappy_canvas');
    var ctxFlappy = canvasFlappy.getContext('2d');
     
    var obstacle=[], gameWidth=canvasPipes.width, gameHeight=canvasPipes.height,bgDrawX1 = 0,bgDrawX2 = 2400;
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


     
    flappy=new createFlappy();                                 //creating the flappy bird object
     
     
     
     
    background.addEventListener('load', start, false);
     
    function start()
    {
         flappy.playerName=prompt("Your name buddy ","Mr x");
         definePipes();
         playGame();
         
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
        ctxGame.drawImage(background, 0, 465, 2400, gameHeight, bgDrawX1, 466, 2400, gameHeight);  //backg 1
        ctxGame.drawImage(background, 0, 465, 2400, gameHeight, bgDrawX2, 466, 2400, gameHeight);   //backg 2*/
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
     
    function animatePipes()
    {
     
      if(obstacle[249].x_init>0)
      {
     
            for(i=0;i<250;i++)
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
     
     
     
    function moveBg() {
        bgDrawX1 -= 5;
        bgDrawX2 -= 5;
                                    //changing coordinate data of obstacle
               
        if (bgDrawX1 <= -2400) {           //if backg 1 moves to extreme left shift it to extreme right
            bgDrawX1 = 2400;
        } else if (bgDrawX2 <= -2400) {
            bgDrawX2 = 2400;
        }
        drawBg();
    }
     
     
     
     
     
    var obstacle=[];
    var c=0;
    function createObstacle(X,H){
     this.index=c++;
     this.x_init=X;
     this.height=H;           //height of top pipe
     this.width=80;
     this.hole=100;          //hole in between them
     this.gap=250;           //gap between two obstacles
     this.totalHeight=465; 
     //console.log(arguments);      //height of toppipe+bottompipe+hole
    }
     
     
     
      function movePipes(){
         
          wipePipes();
       
     
          drawPipes();
     
      }
     
      function definePipes()
    {
      var x1=0,h1,h2;
      for(i=0;i<250;i+=2)
            {
                      h1=Math.floor(Math.random()*365);           // 465 is total height of Pipe area
                      h2=Math.floor(Math.random()*365);                
                        
                      while( !((Math.abs(h1-h2)<250)&&(h1<365)&&(h2<365)) )  // for making it playable
                      {
                         h1=Math.floor(Math.random()*365);
                         h2=Math.floor(Math.random()*365);

                      }
                          //if(!i)
                          //console.log(h1+" "+h2);          
                           
                         x1+=200;
                         obstacle[i]= new createObstacle(x1,h1);
                         x1+=200;  
                         obstacle[i+1]= new createObstacle(x1,h2);
     
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
            ctxPipes.fillStyle="skyblue";
            ctxPipes.fillRect(obstacle[i].x_init,0,obstacle[i].width,obstacle[i].height);
            ctxPipes.fill();
            
            ctxPipes.fillStyle="blue";                              
            ctxPipes.fillRect(obstacle[i].x_init,(100+obstacle[i].height),obstacle[i].width,367-obstacle[i].height);
            ctxPipes.fill();

          }
          
         else
         {

            ctxPipes.fillStyle="lightgreen";
            ctxPipes.fillRect(obstacle[i].x_init,0,obstacle[i].width,obstacle[i].height);
            ctxPipes.fill();
            
            ctxPipes.fillStyle="green";                              
            ctxPipes.fillRect(obstacle[i].x_init,(100+obstacle[i].height),obstacle[i].width,367-obstacle[i].height);
            ctxPipes.fill();

         }

      }

      
     
     }
     function wipePipes(){
     
      ctxPipes.clearRect(0,0,gameWidth,gameHeight);
     }
     
     function createFlappy(){
     
      this.srcX=170;
      this.srcY=630;
      this.width=90;
      this.height=55;
      this.drawX=50;
      this.drawY=300;
       
      this.radius=15;           // inittial value of radius was 10
      this.score=0;
      this.playerName="Mr X";
      this.isSpacebar=false;
     
    }
     
    createFlappy.prototype.draw=function(){
      if(!(this.isSpacebar))
      {
        this.drawY+=4;
        if( (this.drawY+this.radius)>=415)         //flappy falls down
          {  isPlaying=false;
             flappy.playerName+=" Game Over";
                    alert(flappy.playerName);
     
          }
     
      }
      else
      {  
        if(this.drawY<0)
          this.drawY= 0;              //for upper limit of motion of flappy
        else  
        this.drawY-=4;
      }
     
     
        ctxFlappy.drawImage(background,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.radius*2,this.radius*2);
     
    }
    createFlappy.prototype.wipe=function(){
     
     ctxFlappy.clearRect(0,0,gameWidth,gameHeight);
    }
     
     
    function checkHit()
    {      
        for(var i=0;i<250;i+=2)
        {
           
               
           
              if( flappy.drawX+flappy.radius>obstacle[i].x_init && flappy.drawX-flappy.radius<obstacle[i].x_init+obstacle[i].width)
             {    
                if(flappy.drawY+flappy.radius+20<=obstacle[i].height||flappy.drawY+flappy.radius>=obstacle[i].height+obstacle[i].hole+40)
                  {
                   
                   // console.info(flappy);
                   // console.info(obstacle[i]);
                    
                    isPlaying=false;
                    flappy.playerName="Game Over "+flappy.playerName+".Your score is"+score;
                    window.cancelAnimationFrame(animationControl);
                    alert(flappy.playerName);  
                   
                  }

                  else
                  { 

                    score=obstacle[i].index/2+1;
                   // console.log(score);

                  }

               }
     
             
        }        
    }

    var score=0;

    
