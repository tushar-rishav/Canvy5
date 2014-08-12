var win = -1;
var gamepos=new Array(3);
var count=0;
var gametype;
var chance=0;
var starttime;
var p1_name="player1";
var p2_name="player2";
var p1score=0 , p2score=0;
function start(){
	document.getElementById("board").innerHTML='<input type="button" value="EASY GAME" id="easy" class="gametype" onclick="setgamemode(0)"><input type="button" value="HARD GAME" id="hard" class="gametype" onclick="setgamemode(1)"><input type="button" value="2 Player Game" id="2p" class="gametype" onclick="setgamemode(2)">';
	var str = new Array(3);
	str[0]="easy";
	str[1]="hard";
	str[2]="2p";
	for(var i=0 ;i <3 ;i++){
		var y=200+(i*110);
		document.getElementById(str[i]).style.position="absolute";
		document.getElementById(str[i]).style.top=y+"px";
		}
}

function setButton(){
for(var a = 0 ; a<3 ; a++)
	{	
	for(var b = 0 ; b<3 ; b++)
		{	
		var a1=a.toString() ;
		var b1=b.toString() ;
		var x=450+(a*137);
		var y=130+(b*137);
		document.getElementById(a1+b1).style.position="absolute";
		document.getElementById(a1+b1).style.top=y+"px";;
		document.getElementById(a1+b1).style.left=x+"px";
		}
	}
	for(var i=0;i<3;i++)
	{
		gamepos[i]=new Array(3);
		for(var j=0;j<3;j++)
		gamepos[i][j]=-1;
	}
	}
	
function  setgamemode(a)
{
gametype=a;
document.getElementById("board").innerHTML='<input type="button" value="REPLAY THE GAME" id="reset" onclick="reset()"><input type="button" class="playbutton" id="00" onclick="main(0)"><input type="button" class="playbutton" id="01" onclick="main(1)"><input type="button" class="playbutton" id="02" onclick="main(2)"><input type="button" class="playbutton" id="10" onclick="main(10)"><input type="button" class="playbutton" id="11" onclick="main(11)"><input type="button" class="playbutton" id="12" onclick="main(12)"><input type="button" class="playbutton" id="20" onclick="main(20)"><input type="button" class="playbutton" id="21" onclick="main(21)"><input type="button" class="playbutton" id="22" onclick="main(22)">';
document.getElementById("instruction").innerHTML='<input type="button" value="Instruction" onclick="instruction()" id="ins"><audio  src="background.mp3" autoplay>';
setButton();
if(gametype!=2)
p2_name="TUSHAR";
document.getElementById("name_set").innerHTML='<input type="button" value="Change Names" onclick="setname()" id="snm">';
	displayname();
if(chance==1&&gametype!=2)
playcom();
}

function setname()
{
if(gametype!=2){
 p1_name=prompt("Please enter your name","Player 1");
 p2_name="TUSHAR";
 }
else{
	p1_name=prompt("Please enter your 1st player name ","Player 1");
	p2_name=prompt("Please enter your 2ndt player name ","Player 2");
	}
displayname();
}
function displayname()
{
var p1='<font color="yellow"> SCORES : </font><br><br>'+p1_name+"  : "+p1score;
var p2=p2_name+"  : "+p2score;
document.getElementById("p1").innerHTML=p1;
document.getElementById("p2").innerHTML=p2;
}

function instruction()
{
alert("1. The Chance of playing goes alternativaly to each player .\n2. First Player 1 playes and next Player 2 (or Computer) and then the chance changes alternatively\n3. each time a player wins , Score is awarded to him/her . \n4. If you want to play continuously or skip, Just press replay\n5.If you are playing hard game then its a challenge to programmer and if you win in hard mode please drop him a mail.\n\n\tALL THE BEST\nENJOY THE GAME");
}
function playcom()
{
		var x;
		x=computer_play();
		var a1=parseInt(x/10).toString() ;
		var b1=(x%10).toString() ;
		var i=parseInt(a1);
		var j=parseInt(b1);
		if(count%2==1)
		{
			document.getElementById(a1+b1).style.backgroundImage="url('player1.png')";
			gamepos[i][j]=0;
			count++;
		}
		else 
		{
			document.getElementById(a1+b1).style.backgroundImage="url('player2.png')";
			gamepos[i][j]=1;
			count++;
		}
		win=ifwin();
		
		if(win!=-1)
		{
		if (win==(chance%2))
		{
		alert(p2_name+"  Wins");
		p2score++;
		}
		else { alert(p1_name+" Wins"); p1score++;}
		displayname();
		exit();
		}
}
function main(a)
{
	if(count==9 || win !=-1)
	{alert("Game has finished already !! Please replay game or refresh page  ");
	exit();}
	var a1=parseInt(a/10).toString() ;
	var b1=(a%10).toString() ;
	var i=parseInt(a1);
	var	j=parseInt(b1);
	if(gamepos[i][j]!=-1)
	{return;}
	else if(count%2==1)
	{
		document.getElementById(a1+b1).style.backgroundImage="url('plyer1.png')";
		gamepos[i][j]=0;
		count++;
	}
	else 
	{
		document.getElementById(a1+b1).style.backgroundImage="url('player2.png')";
		gamepos[i][j]=1;
		count++;
	}
	win=ifwin();
	if(win!=-1)
	{
		if (win==(chance%2))
		{
		alert(p2_name+"  Wins");
		p2score++;
		}
		else { alert(p1_name+" Wins"); p1score++;}
		displayname();
		exit();
	}
	if (count>=9)
	{
	if (win==-1)
	alert ("GAME TIES ");
		exit();
	}
	if(gametype!=2){
	playcom();
	}

}

function ifwin()
{
	var win=-1;

	for (var i=0; i<3; i++) {
		if (gamepos[i][0]==gamepos[i][1]&&gamepos[i][0]==gamepos[i][2]) {  // Horizontal line checked
			win=gamepos[i][0];
			if (win!=-1) {
			won(win,i+'0',i+'1',i+'2');
			return win;
			}
		}

		if (gamepos[0][i]==gamepos[1][i]&&gamepos[0][i]==gamepos[2][i]) {   // Vertical lines checked
			win=gamepos[0][i];
			if (win!=-1) {
			won(win,'0'+i,'1'+i,'2'+i);
			return win;
			}
		}
	}

	if (gamepos[0][0]==gamepos[1][1]&&gamepos[1][1]==gamepos[2][2]) {   // Main diagonal checked
		win=gamepos[0][0];
		if (win!=-1) {
		won(win,"00","11","22");
		return win;
		}
	}

	if (gamepos[0][2]==gamepos[1][1]&&gamepos[1][1]==gamepos[2][0]) {   // The other diagonal is checked
		win=gamepos[0][2];

		if (win!=-1) {
		won(win,"20","11","02");
			return win;
		}
	}

	return win;
}
function won(a,i1,i2,i3)
{
var im;
if (a==0)
im="url('zerowin.png')";
else
im="url('crosswin.png')";
document.getElementById(i1).style.backgroundImage=im;
document.getElementById(i2).style.backgroundImage=im;
document.getElementById(i3).style.backgroundImage=im;
}

function computer_play()
{
	var x;
	var y;
	
	// THE FIRST LOOP CHECKS THE INITIAL CONDITION OF OBIVIOUS
	var mycheck=1;
	if(chance%2==0)
	mycheck=0;
	for(;mycheck>=0&&mycheck<=1;){
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				if((gamepos[i][j]==gamepos[i][(j+1)%3])&&gamepos[i][(j+2)%3]==-1&&gamepos[i][j]==mycheck)
				{
					return ((i*10)+(j+2)%3);
				}
				if((gamepos[j][i]==gamepos[(j+1)%3][i])&&gamepos[j][i]==mycheck&&gamepos[(j+2)%3][i]==-1)
				{					
					return ((((j+2)%3)*10)+i);
				}
			}
			if(gamepos[i][i]==gamepos[(i+1)%3][(i+1)%3]&&gamepos[i][i]==mycheck&&gamepos[(i+2)%3][(i+2)%3]==-1)
			{
				x=(i+2)%3;
				y=(i+2)%3;
				return x*10+y;
			}
			if(gamepos[i][2-i]==gamepos[(i+1)%3][2-((i+1)%3)]&&gamepos[i][2-i]==mycheck&&gamepos[(i+2)%3][2-((i+2)%3)]==-1)
			{	
				x=(i+2)%3;
				y=2-((i+2)%3);
				return x*10+y;
			}
		}
		if(chance%2==0)
		mycheck++;
		else mycheck--;
		
	} 
	// HERE STARTS THE CODE CONTAINING THE TRICKS FOR GAME
	if(gametype==1)
	{
		var count_of_filled_pos;
		count_of_filled_pos=0;
		var fieldpos = new Array(9);
		for(var ii=0;ii<9;ii++)
		{
		fieldpos[ii] = new Array(2);
		}
		for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
		if(gamepos[i][j]!=-1)
		{
			fieldpos[count_of_filled_pos][0]=i;
			fieldpos[count_of_filled_pos][1]=j;
			count_of_filled_pos++;
		}}}
// COUNT IS NO OF BOXES IN THE ARENA FILLED
		if(count_of_filled_pos==0)
		{
			x=2;
			y=2;
			
			return x*10+y;
		}
		if(count_of_filled_pos==1)
		{
			if(gamepos[1][1]==-1)
			{
			x=1;y=1;			
			return x*10+y;
			}
			else{
			x=0;
			y=2;
			
			return x*10+y;
			}
		}		
		if(count_of_filled_pos==2)
		{
			if((fieldpos[0][0]==0&&fieldpos[0][1]==0)||(fieldpos[0][0]==0&&fieldpos[0][1]==1)||(fieldpos[0][0]==2&&fieldpos[0][1]==0)||(fieldpos[0][0]==2&&fieldpos[0][1]==1))
			{
				x=0;
				y=2;
			
				return x*10+y;
			}
			if((fieldpos[0][0]==1&&fieldpos[0][1]==0)||(fieldpos[0][0]==0&&fieldpos[0][1]==2)||(fieldpos[0][0]==1&&fieldpos[0][1]==2))
			{
				x=2;
				y=0;
				return x*10+y;
			}
			
		}
		if(count_of_filled_pos==3)
		{
			if((gamepos[0][0]==1&&gamepos[2][1]==1)||(gamepos[1][0]==1&&gamepos[2][1]==1))
			{
				return 20;
			}
			if((gamepos[0][0]==1&&gamepos[2][2]==1)||(gamepos[2][0]==1&&gamepos[0][2]==1))
			{
				return 12;
			}
			if((gamepos[1][2]==1&&gamepos[2][1]==1)||(gamepos[0][2]==1&&gamepos[2][1]==1)||(gamepos[2][0]==1&&gamepos[1][2]==1))
			{
				return 22;
			}
			if((gamepos[0][0]==1&&gamepos[1][2]==1)||(gamepos[1][2]==1&&gamepos[0][1]==1))
			{
				return 02;
			}		
		}
		if(count_of_filled_pos==4)
		{
			if(gamepos[2][2]==1&&gamepos[0][2]==1&&gamepos[0][1]==0)
			{
				return 20;
			}
			if(gamepos[2][2]==1&&gamepos[2][0]==1&&gamepos[1][0]==0)
			{
				return 02;
			}		
			if(gamepos[2][2]==1&&gamepos[0][2]==1&&gamepos[0][0]==0)
			{
				return 20;
			}		
			
		}
	}
	// END OF HARD GAME 
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(gamepos[j][i]==-1)
			{
				x=j;
				y=i;
				return x*10+y;
			}
		}
	}
			
}

function reset()
{
count=0;
win=-1;
for(var a = 0 ; a<3 ; a++)
	{	
	for(var b = 0 ; b<3 ; b++)
		{	
		var a1=a.toString() ;
		var b1=b.toString() ;
		document.getElementById(a1+b1).style.backgroundImage='url("cover_plain.jpg")';
		}
	}
	if(chance==0)
	chance=1;
	else
	chance=0;
	setButton();
	if(chance==1&&gametype!=2)
	playcom();
	displayname();
}
