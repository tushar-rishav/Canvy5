var lower_layer=document.getElementById("l1"),upper_layer=document.getElementById("l2"),c=[],ind=0,img=[],layers=[]; 
c[1]=lower_layer.getContext("2d"),c[2]=upper_layer.getContext("2d");

for(i=1;i<3;i++)
  img[i]=new Image();

img[2].src="tigris.gif",img[1].src="backg.png";

img[1].addEventListener('load',define_layers, false);
document.addEventListener('mousemove',start_parallax,false);

function define_layers(){

for(g=1;g<3;g++)
  layers[g]=new createLayers(g); 
  console.log(layers);
  
}

function createLayers(ind)
{
	this.srcX=0;
	this.srcY=0;
	this.posX=0;
	this.posY=0;
	this.width=225;
	this.height=225;
	if(ind!=2)
   {	this.drawWidth=screen.availWidth;
	   this.drawHeight=screen.availHeight;
	   console.log(ind);
	}
	else 
		{
			this.drawWidth=225;
	      this.drawHeight=225;
	   }
	this.index=ind;
	console.log(ind);
}


createLayers.prototype.draw_img=function()
{

c[this.index].drawImage(img[this.index],this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.drawWidth,this.drawHeight);     
 //taking care of which context to use while drawing the respective layers

}

	var mY = 0,mX=0;
function start_parallax(e){
//alert("starting parallax");

		
	/*		
    // moving upward
    			if (e.pageY < mY)
        			{
        				 console.log('From Bottom');
        		   }

    // moving downward
    		   
        	 	   console.log('From Top');
   				 

            mY = e.pageY,mX=e.pageX;

            console.log(mX+" "+mY);*/
            
       
for(var j=1;j<3;j++)
 {
	layers[j].draw_img();
 }

}






