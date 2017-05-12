optimost.isIE6=(navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1?true:false);
optimost.XH=function(u){
    if(typeof(u)!="object")return;
    var s=this.D.createElement(this.ST);
    for(var n in this.SA){
	    if(!this.isIE6)s.setAttribute(n,this.SA[n]);
	    else s[n]=this.SA[n];
    }
    for(var n in u){
	    if(!this.isIE6)s.setAttribute(n,u[n]);
	    else s[n]=u[n];
    }
    var h=this.D.getElementsByTagName("head");
    if(h[0])h[0].insertBefore(s,h[0].childNodes[h[0].childNodes.length-1]);
    else this.D.body.insertBefore(s,this.D.body.childNodes[D.body.childNodes.length-1]);
}
optimost.RXH=function(r,c,d,e){
    if(this.Enabled){
	var b=true;
	if(r<1000){
	    b=(Math.floor(Math.random()*1000)<r);
	    if(c!=null){
		if(this.C[c]!=null)b=(this.C[c]!="mvt-no");
		else this.SC(c,b?"mvt-yes":"mvt-no",e,d);	
	    }
	}
	if(b){
	    var u={"src":this.S()};
	    this.XH(u);
	}
    }
} 

optimost.addEvent=function(el,evt,func,bubble){
    if(!el || typeof(func) !="function"){return false;}
    bubble = bubble || false;
    var evtType=(window.attachEvent)?"attach":(window.addEventListener)? "add":"none";
    if(evtType == "attach"){el.attachEvent("on"+evt,func);}
    else if(evtType == "add"){el.addEventListener(evt,func,bubble);}
}	
var optSelector={};
optSelector.path="http://es.optimost.com/";
if(window.location&&window.location.protocol&&window.location.protocol.toLowerCase().indexOf("https")>-1){
    optSelector.path="https://by.essl.optimost.com/";
}
optSelector.url_live="es/2/c/917/u/onload_Live.js";
optSelector.url_qa="es/2/c/917/u/onload_Stage.js";
optSelector.url=optSelector.url_live;
if(typeof(optimost)=="object"){
    optSelector.qc=optimost.Q["opselect"]||optimost.C["opselect"]||"none";
    if(optSelector.qc.toLowerCase()=="qa"){
        optSelector.url=optSelector.url_qa;
    }
    else{
        if(optSelector.qc.toLowerCase()=="live"){
            optSelector.url=optSelector.url_live;
        }
    }
}
if(optSelector.url.toLowerCase().indexOf("http")==-1){
    optSelector.url=optSelector.path+optSelector.url;
}
optimost.onloadCode=function(){
	var _o=optimost;
	_o.U=optSelector.url;
	_o.ST="script";
	_o.SA={"type":"text/javascript"};
	_o.RXH(1000,null,null,null);
}
optimost.addEvent(window,'load',optimost.onloadCode,false);
