var msg="A game of carrom CONTROLS are RIGHT ARROW KEY to move the striker to right side LEFT ARROW KEY to move the striker to left side ENTER KEY to fire the striker LEFT CLICK on area where you want to aim at or want ur striker to strike at WORK UNDER PROGRESS";
document.body.onload= alert(msg);

g_area=document.getElementById('game_area');
speed=document.getElementById("speed_control");
game=g_area.getContext('2d');
//step=0;
init_pox_x=0,init_pox_y=0,radi=0,r=0,move_horizontal=0,start_time=0,time_over=false,stop=true;
whichkeys=[];
aim_exists=false,strike_successful=false,foul=false,angle_for_striker_move=0,angle_for_target_move=0,aim_x=0,aim_y=0;
W = g_area.width; H=g_area.height;
coins=[];
		for(i = 0; i < 2; i++)
		{
		coins.push(new make_coins());                //2 coin objects being created
		}

function make_coins(){
	if(i)
		{
			this.x=250;             //target coin
			this.y=250;
			this.r=9;
			this.velocity_x=7;
			this.velocity_y=7;
			//console.log("C1 created");
		}
		
	else
	{
		this.x=250;
        this.y=430;                    //striker
		this.r=15;
		this.velocity_x=4;
		this.velocity_y=4;
		//console.log("C2 created");
	}	

}
 striker= coins[0];
 target=coins[1];

function move()
{   
   if(whichkeys[37])
   {    if((striker.x)>70)                 // to move striker left
		striker.x-=1;
		//console.log(striker.x);
   }
   
   if(whichkeys[39])
   {    if((striker.x)<425)					 // to move striker right
	    striker.x+=1;
		//console.log(striker.x);
   }
   
   if(whichkeys[13]&&aim_exists&&!time_over)
   {   stop=false;    // motion started so now disabling aim selection using mouseclick
	     if(!foul)
		 {	     // console.log(foul+" initial");
			//	  if(striker.y>30&&striker.y<330&&striker.x>30&&striker.x<470)
						 striker.x+=striker.velocity_x*Math.cos(angle_for_striker_move);
						 striker.y+=striker.velocity_y*Math.sin(angle_for_striker_move);
					/*if(striker.x<30||striker.x>470)
							striker.x-=striker.velocity_x*Math.cos(angle_for_striker_move); striker.y+=striker.velocity_y*Math.sin(angle_for_striker_move);
						if(striker.y<30||striker.y>330)
							striker.x+=striker.velocity_x*Math.cos(angle_for_striker_move); striker.y-=striker.velocity_y*Math.sin(angle_for_striker_move);
				   
				 */
				 
				 if(striker.x<=target.x+target.r+striker.r-3 && striker.x>=target.x-target.r-striker.r+3 && striker.y >=target.y-target.r-striker.r+3 && striker.y<=target.y+target.r+striker.r-3 )
					{
						striker.velocity_x*=-1;							
											// striker rebounds after hiting the target coin
						striker.velocity_y*=-1;
								
					 //now time to move the target in direction of Rtarget-Rstriker. first finding the direction for target motion			    
					
					 angle_for_target_move=Math.atan2((target.y-striker.y),(target.x-striker.x)); //console.log(angle_for_target_move);
					 strike_successful=true;
						
					}
					
					if(strike_successful)
					{          //making target fuck off! :P
							target.x+=target.velocity_x*Math.cos(angle_for_target_move);
							target.y+=target.velocity_y*Math.sin(angle_for_target_move);
							if(striker.x==15||striker.x==485)
							  {
							     if(striker.y==15||striker.y==485)
									  strike_successful=false;
							  }
					
					        if(target.x>470||target.x<30||target.y>470||target.y<30)    
							  {
							  
							      if(target.y>470||target.y<30)
								   {
										target.velocity_y*=-1;
										target.velocity_x*=1;
								   }
								  if(target.x>470||target.x<30)
								   {
										target.velocity_y*=1;
										target.velocity_x*=-1;
								   }					
							   
							  
							  
								//target.velocity_x*=-1;         //rebound for hitting board sides
								//target.velocity_y*=-1;
								//console.log(striker.x);
							  }
					
					}
				 
				 if(striker.x>470||striker.x<30||striker.y>470||striker.y<30)    
				  {
				   if(striker.y>470||striker.y<30)                    //rebound for hitting board sides
				       {
							striker.velocity_y*=-1;
							striker.velocity_x*=1;
					   }
					if(striker.x>470||striker.x<30)
                       {
							striker.velocity_y*=1;
							striker.velocity_x*=-1;
					   }					
				   
					//striker.velocity_x*=-1;         
					//striker.velocity_y*=-1;
					//console.log(striker.x);
				  }
		
				
		 if((striker.x<40&&striker.x>10)||(striker.x<490&&striker.x>460))                  // PAIN HERE
		  {
		    if((striker.y<40&&striker.y>10)||(striker.y<490&&striker.y>460))
				{
					striker.x=250; striker.y=430; //console.log("pain removed");
					aim_exists=false;
					aim_x=0,aim_y=0;
					stop=true;        //  motion stopped so now enabling aim selection using mouseclick
					alert("FOUL!!! :/")
					//console.log(foul);
				}
				//console.log(striker.x+" "+striker.y);
				
		  }
		  
		  if((target.x<40&&target.x>10)||(target.x<490&&target.x>460))                  // PAIN HERE
		  {
		    if((target.y<40&&target.y>10)||(target.y<490&&target.y>460))
				{
					target.x=250; target.y=250; //console.log("pain removed");
					aim_exists=false;
					aim_x=0,aim_y=0;
					stop=true;                   //  motion stopped so now enabling aim selection using mouseclick
					striker.x=250; striker.y=430;
					//console.log(foul);
					alert("GOAL!! :D ");
				}
				//console.log(striker.x+" "+striker.y);
				
		  }
		  
		}
		
		  
		  
		  
		  
		  
		  
		 
   }     
     
    
      		
   
	drawRect(0,0,500,500,"#bb0000");           // DRAWING RECTangle_for_striker_moveS
	drawRect(15,15,470,470,"#ffffbb");
	drawRect(70,70,360,360,"#8080c0");
	drawRect(73,73,354,354,"#ffffbb");

	drawArc(0,0,50,"#804040");                   //DRAWING CURVES
	drawArc(500,0,50,"#804040");
	drawArc(500,500,50,"#804040");
	drawArc(0,500,50,"#804040");

	drawArc(250,250,60,"#ff8080");
	drawArc(250,250,57,"#ffffbb");
	drawArc(250,250,30,"#00ff80");
	drawArc(250,250,27,"#ffffbb");
	drawArc(250,250,10,"#a448ff");

	drawArc(striker.x,striker.y,striker.r,"#ff8040");
	drawArc(target.x,target.y,target.r,"#ff46a3");
	 requestId = window.requestAnimationFrame(move);
	

}

	move();

		document.addEventListener("keydown",function(k){
			whichkeys[k.keyCode]=true;
		});
		
		document.addEventListener("keyup",function(k){
		if(k.keyCode==13)
		  //{  
		  whichkeys[k.keyCode]=true; //console.log("enter pressed");}
		 
		 else
			whichkeys[k.keyCode]=false;
		});

if(stop)
{
  document.getElementById("game_area").addEventListener("click",function(k){aim_x=k.clientX-424; aim_y=k.clientY-40; console.log(aim_x+" "+aim_y);
                                  angle_for_striker_move=Math.atan2((aim_y-striker.y),(aim_x-striker.x)); //console.log(angle_for_striker_move*360/(2*Math.PI));
								  aim_exists=true; //console.log('aim_exists');
								  });  //get the coordinates of point where 
																					//user is aiming at
}		
resistance();		


function drawRect(x,y,width,height,fillcolor)
{
  game.fillStyle=fillcolor;
  game.fillRect(x,y,width,height);
  
}


function drawArc(x,y,radius,fillcolor)
{
game.fillStyle=fillcolor;
game.beginPath(); 
game.arc ( x, y, radius, 0, 2 * Math.PI, false); 
game.fill();

}


function new_speed()
{							
							striker.velocity_x=4;
							striker.velocity_y=4;
							striker.velocity_x*=speed.value;
							striker.velocity_y*=speed.value;
							console.log(speed.value+" "+striker.velocity_x);

}



/*speed.value=0;                       
vary_speed();
setInterval(vary_speed,500);
function vary_speed()
{                                               //for better UI taking user speed control input with progress bar..  
  
 if(speed.value<3)
   speed.style.backgroundColor="yellow";
if(speed.value<7)
   speed.style.backgroundColor="orange";
if(speed.value<3)
   speed.style.backgroundColor="red";

   
 if(speed.value>=10)
	{speed.value-=10;//console.log(speed.value);
	}
  	
	speed.value+=1;
	//console.log(speed.value);
  
}*/

/*speed.addEventListener("click",function(k){
							//console.log(k.clientX-k.offsetX);
							speed_factor=k.clientX-k.offsetX;
							striker.velocity_x=4;
							striker.velocity_y=4;
							striker.velocity_x*=speed_factor;
							striker.velocity_y*=speed_factor;
							console.log(speed_factor+" "+striker.velocity_x);
							
							
		});*/
/*
function resistance(){

start_time+=100;

	if(start_time>speed.value*300)
	{
		start_time=0;
		time_over=true;
		striker.velocity_x=4;
		striker.velocity_y=4;
		target.velocity_x=7;
		target.velocity_x=7;
		clearInterval(resistance_time);
		console.log("stopped");
		
	}

	else
	{
		striker.velocity_x-=(4/speed.value);
		striker.velocity_y-=(4/speed.value);
		target.velocity_x-=(7/speed.value);
		target.velocity_y-=(7/speed.value);
		console.log("speed decreasing");

	}


	
}	
var resistance_time=setInterval(resistance,100);	*/
