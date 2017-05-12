obj=document.getElementById("clickthrus");
if(obj){
    trs=obj.getElementsByTagName("tr");
    for(var i=0;i<trs.length;i++){
        if((lsv=trs[i].getAttribute("listctrlvalue"))!=null){
            newTD=document.createElement("td");
            newTD.innerHTML=lsv;
            newTD.style.color="#CC0000";
            trs[i].insertBefore(newTD,trs[i].firstChild);            
        }
        else if(trs[i].parentNode.tagName.toLowerCase()=="thead"){
            newTD=document.createElement("td");
            newTD.innerHTML="cVal";
            newTD.style.paddingRight="0";
            newTD.className="tdbtngn";
            //newTD.style.color="#CC0000";
            trs[i].insertBefore(newTD,trs[i].firstChild);             
        }
    }
}