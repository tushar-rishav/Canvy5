
var defaulthtml=""; 
function resetlist(){  
    padref.innerHTML=defaulthtml  
    domstorage.paddata=defaulthtml  
}  
var padref=document.getElementById("pad")  
var domstorage=window.localStorage|| (window.globalStorage? globalStorage[location.hostname] : null)  
if (domstorage){  
    if (domstorage.paddata){ 
        padref.innerHTML=domstorage.paddata 
    }  
    padref.onkeyup=function(e){  
        domstorage.paddata=this.innerHTML  
    }  
}  
