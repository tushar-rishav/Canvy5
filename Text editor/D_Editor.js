/*-----------------functioon for clearing texr-----------------------------------*/
    var opno,cmd,str;  
    function wipe()
    { 
      if(confirm('you sure about it?'))
       { 
       document.getElementById('text').innerHTML='';
       document.getElementById("text").style.textDecoration="none";
       document.getElementById("text").style.fontFamily="'Lucida Console', Monaco, monospace";
       document.getElementById("text").style.fontWeight="400";
       
       } 
          
    }
	
/*----------------------------------hiding and showing------------------------------------------*/
/*function hideToolbar()
{
document.getElementById("toolbar").style.display="none";
}
function showToolbar()
{
document.getElementById("toolbar").style.display="block";
}
	
*/
 /*----------------------function for changing font-family ----------------------------------*/    
  
    
	function editDoc(cmd)
	{
	 document.execCommand(cmd);
	}
	
	
	
	
/*-------------------------------------------------------------------------------------------*/	
	//function for some special font-style
	
	function deltaStyle(opno)
	{ 
	   if(document.getSelection()!='')
	   {
	   	switch(opno)
		{
			case 1:document.execCommand('bold');
			        break;
			case 2:document.execCommand('italic');
			        break; 
			default:alert("unknown error encountered");              
		}
	
	    var selectedTxt=document.getSelection() ;
		var str=selectedTxt.toString();
		
		var inTxt=document.getElementById("text").innerHTML;
		var re= new RegExp(str,'g');
		inTxt=inTxt.replace(re,"#");
		
		inTxt=inTxt.replace("#",zigzag(str));
		
		document.getElementById("text").innerHTML=inTxt;
    }
    
    else {alert("please select some text first");}	
	}
	 
	function zigzag(str)
	{
		var i;
	    var y=" ";
		
         for(i=0;i<(str.length);i++)
		  {   
			if((i%2)==0)
			{ 
			  y+=str[i].toUpperCase();
			}	
			else                                  //even places
			  y+=str[i].toLowerCase();
		   	  
		  }
	    
	    //alert("str:"+str+"y:"+y);
	       str=y;
		   return str;

	}  
	 		 
/*---------------------------------------------------------------------*/	

function changeFontSize()
{ 
  var size=document.getElementById("fontsize").value;	
  document.getElementById("text").style.fontSize=size+"px";	
}

/*---------------------------- Changing colors ------------------------------*/
function changeFontColor()
{
	 var txtcolor=document.getElementById("fontcolor").value;	
     document.getElementById("text").style.color=txtcolor;	
}

function changeBackgroundColor()
{
	var bakcolor=document.getElementById("backgcolor").value;	
    document.getElementById("text").style.backgroundColor=bakcolor;
}
/*-------------------------------------------------------------------------*/

/*----------------- printing texts------------------------------------------*/
function print()
{
	var toPrint=document.getElementById('text').innerHTML;
	var windowob=window.open('','Print Preview','width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=yes,resizable=yes');
	windowob.document.write(toPrint);
	windowob.document.close();
	windowob.focus();
	windowob.print();
	windowob.close();
}
/*------------------------------------------------------------------------------*/
function searchTheWord(inputText)
{
var insideOfText=document.getElementById("text").innerHTML;
var pos=insideOfText.search(inputText);
if(pos>=0)
{
alert(inputText+" first occurs at "+pos+" position ");
}
else
alert("word not found");

}
/*------------------------------------------------------------------------------------*/
function replaceWord()
{
var oldWord = prompt("Input the word to be replaced","old word");
var newWord = prompt("Input the new word","new word");
var oldText=document.getElementById("text").innerHTML;
var pos=oldText.search(oldWord);
if(pos>=0)
{ var re = new RegExp(oldWord, 'g'); 
  var newText= oldText.replace(re,newWord);
    document.getElementById("text").innerHTML=newText;
}

else{alert("sorry the word does not exist! please try again");}


}

/*------------------------------------CODE FOR HUFFMAN's COMPRESSION FOR TEXT FOLLOWS---------------------------------------------------*/
function compress() {
	var input = document.getElementById("text").innerHTML;
	document.getElementById("inputlength").innerHTML =input.length*8;
	var probabilities = getProbabilities(input);
	var codes = getCodes(probabilities);
	var output = compressHuffman(input, codes);
	
	var temp = "";
	for (var elem in probabilities) {
	  temp += elem + " = " + probabilities[elem] + "<br/>";
	}
	document.getElementById("probabilities").innerHTML = temp;
	
	temp = "";
	for (var elem in codes) {
	  temp += elem + " = " + codes[elem] + "<br/>";
	}
	document.getElementById("codes").innerHTML = temp;
	document.getElementById("output").innerHTML = output;
	document.getElementById("outputlength").innerHTML =output.length;
}

function sortNumberAsc(a, b) {
	return a[1] - b[1];
}

function getCodes(prob) {
	var tree = new Array();
	var secondTree = new Array();
	
	this.getNext = function() {
	if (tree.length > 0 && secondTree.length > 0 
               && tree[0].prob < secondTree[0].prob)
	  return tree.shift();
	
	if (tree.length > 0 && secondTree.length > 0 
                && tree[0].prob > secondTree[0].prob)
	  return secondTree.shift();
	
	if (tree.length > 0)
	  return tree.shift();
	
	return secondTree.shift();
	}
	var sortedProb = new Array();
	var codes = new Array();
	
	var x = 0;
	for (var elem in prob) {
	  sortedProb[x] = new Array(elem, prob[elem]);
	  x = x + 1;
	}
	
	sortedProb = sortedProb.sort(sortNumberAsc);
	x = 0;
	
	for (var elem in sortedProb) {
	  tree[x] = new node();
	  tree[x].prob = sortedProb[elem][1];
	  tree[x].value = sortedProb[elem][0];
	  x = x + 1;
	}
	while (tree.length + secondTree.length > 1) {
		var left = getNext();
		var right = getNext();
		var newnode = new node();
		newnode.left = left;
		newnode.right = right;
		newnode.prob = left.prob + right.prob;
		newnode.left.parent = newnode;
		newnode.right.parent = newnode;
		secondTree.push(newnode);
	}

	var currentnode = secondTree[0];
	var code = "";
	while (currentnode) {
		if (currentnode.value) {
			codes[currentnode.value] = code;
			code = code.substr(0, code.length - 1);
			currentnode.visited = true;
			currentnode = currentnode.parent;
		}
		else if (!currentnode.left.visited) {
			currentnode = currentnode.left;
			code += "0";
		}
		else if (!currentnode.right.visited) {
			currentnode = currentnode.right;
			code += "1";
		}
		else {
			currentnode.visited = true;
			currentnode = currentnode.parent;
			code = code.substr(0, code.length - 1);
		}
	}
	return codes;
}

function node() {
  this.left = null;
  this.right = null;
  this.prob = null;
  this.value = null;
  this.code = "";
  this.parent = null;
  this.visited = false;
}

function compressHuffman(input, codes) {
  var output = input.split("");
  for (var elem in output) {
	  output[elem] = codes[output[elem]];
  }
  return output.join("");
}

function getProbabilities(input) {
  var prob = new Array();
  var x = 0;
  var len = input.length;
  while (x < len) {
	  var chr = input.charAt(x);
	  if (prob[chr]) {
		  prob[chr] = prob[chr] + 1;
	  }
	  else {
		  prob[chr] = 1;
	  }
	  x++;
  }

  for (var elem in prob) {
	  prob[elem] = prob[elem] / len;
  }
  return prob;
}

/*-------------------------------------------------------------------------------------------------*/
