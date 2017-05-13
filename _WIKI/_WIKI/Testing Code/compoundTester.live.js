//QA
if(optimost.Q["opselect"]=="qa")optimost.SC("opselect","qa",null,optimost.SLD());

var opPro=(("https:"==document.location.protocol)?"https://by.essl.optimost.com/by":"http://by.optimost.com");

var opDocLocation = document.location.toString();

var opExperiments={};

var opPageId=(typeof(opPageId)=="string"?opPageId:"");

// add trial global code here
opExperiments["BettyCrocker test page"] = {
    "method": "regexp",
    "entity": opDocLocation,
    "criteria": /(bettycrocker\.com\/recipes\/)+([a-zA-Z0-9_-]{5,}\/)+([0-9abcdef-]{36})/,
    "condition": "contains",
    "match": false,
    "unique": "/trial/1646/p/bettycrockertestpage.d50/2/content.js",
    "throttle": 1000,
    "gum": null,
    "domain": null,
    "expire": null,
    "modules": ["body"]
};

opExperiments["BettyCrocker Publication Feed"] = {
    "method": "var",
    "entity": opDocLocation,
    "criteria": ".bettycrocker.com/testing/mhpnew",
    "condition": "contains",
    "match": false,
    "unique": "/trial/1646/p/publicationfeedgvl.25b/4/content.js",
    "throttle": 1000,
    "gum": null,
    "domain": null,
    "expire": null,
    "modules": ["body"]
};

opExperiments["Compound tester - BC recipes"] = {
	"method": "compound",
	"entity": [opDocLocation,opPageId],
	"criteria": [["summarypasge.aspx","blah.php","genericglobalcodetesterwholepage/1065/content.html"],["betty crocker recipes2","confirmation_sub"]],
	"condition": ["contains","equals"],
	"enabled": true,
	"match": false,
        "unique": "/trial/1646/p/bettycrockertestpage.d50/2/content.js",
	"throttle": 1000,
	"gum": null,
	"domain": null,
	"expire": null,
        "modules": ["body"]
};

// add counter global code here
opExperiments["search button"] = {
    "method": "var",
    "entity": opPageId,
    "criteria": "2",
    "condition": "equals",
    "match": false,
    "unique": "/counter/1646/-/2/event.js",
    "throttle": 1000,
    "gum": null,
    "domain": null,
    "expire": null,
    "modules": ["counterx"]
};

optimost.identify=function(){
	for (var n in opExperiments){
		switch(opExperiments[n].method) {
			case 'var':
				//optimost.conditionEvaluator(opExperiments[n]);
				if(typeof(opExperiments[n].entity)!="undefined"){
					if(opExperiments[n].condition=="equals"){
						if(opExperiments[n].entity.toString()==opExperiments[n].criteria)opExperiments[n].match=true;
					}
					else if(opExperiments[n].condition=="contains"){//alert(opExperiments[n].entity);
						if(opExperiments[n].entity.toString().indexOf(opExperiments[n].criteria)!=-1)opExperiments[n].match=true;
					}
				}
				break;

			case 'array':
				if(typeof(opExperiments[n].entity)=="object") {
					var len=opExperiments[n].entity.length;
					var len2=opExperiments[n].criteria.length;
					for(var i=0;i<len;i++){
						for(var j=0;j<len;j++){
							//if(opExperiments[n].entity[i]==opExperiments[n].criteria[j])opExperiments[n].match=true;
							if(opExperiments[n].condition=="equals"){
								if(opExperiments[n].entity[i].toString()==opExperiments[n].criteria[j])opExperiments[n].match=true;
							}
							else if(opExperiments[n].condition=="contains"){
								if(opExperiments[n].entity[i].toString().indexOf(opExperiments[n].criteria[j])!=-1)opExperiments[n].match=true;
							}
						}
					}
				}
				break;
                            
                case 'compound'://The criteria is a based on multiple variables that cna have multiple matching values
                        if (typeof (opExperiments[n].entity) == "object") {
                                var len = opExperiments[n].entity.length;
                                for (var i = 0; i < len; i++) {					
                                        for (var j = 0; j < opExperiments[n].criteria[i].length; j++) {						
                                                if (opExperiments[n].condition[i] == "equals") {var tmp="opExperiments object'"+n+"'>>EQUALS\n\n"+opExperiments[n].entity[i].toString() +"="+ opExperiments[n].criteria[i][j];
                                                        if (opExperiments[n].entity[i].toString() == opExperiments[n].criteria[i][j]) {                                        
                                                                opExperiments[n].match = true;  tmp+="\n\nBOOM!!!";                                                                       
                                                        }
                                                        alert(tmp);
                                                }
                                                else if (opExperiments[n].condition[i] == "contains") {var tmp="opExperiments object'"+n+"'>>CONTAINS\n\n"+opExperiments[n].entity[i].toString() +"~"+ opExperiments[n].criteria[i][j];
                                                        if (opExperiments[n].entity[i].toString().indexOf(opExperiments[n].criteria[i][j])!= -1){                                        
                                                                opExperiments[n].match = true; tmp+="\n\nBOOM!!!";
                                                        }
                                                        alert(tmp);
                                                }
                                        }
                                }
                        }
                        break;
                            
                        case 'compound_OLD'://The criteria is a based on multiple variables that cna have multiple matching values
                                if (typeof (opExperiments[n].entity) == "object") {
                                        var len = opExperiments[n].entity.length;
                                        for (var i = 0; i < len; i++) {
                                                for (var j = 0; j < opExperiments[n].criteria.length; j++) {						
                                                        if (opExperiments[n].condition[i] == "equals") {//alert(n+">>EQUALS "+opExperiments[n].entity[i].toString() +"-"+ opExperiments[n].criteria[j]);
                                                                if (opExperiments[n].entity[i].toString() == opExperiments[n].criteria[j]) {                                        
                                                                        opExperiments[n].match = true;
                                                                }
                                                        }
                                                        else if (opExperiments[n].condition[i] == "contains") {//alert(n+">>CONTAINS "+opExperiments[n].entity[i].toString() +"-"+ opExperiments[n].criteria[j]);				
                                                                if (opExperiments[n].entity[i].toString().indexOf(opExperiments[n].criteria[j])!= -1){                                        
                                                                        opExperiments[n].match = true;
                                                                }
                                                        }
                                                }
                                        }
                                }
                                break;                            
                case 'regexp':
                        if(typeof(opExperiments[n].entity)!="undefined" && opExperiments[n].criteria!="undefined"){
                                if(opExperiments[n].entity.match(opExperiments[n].criteria)!=null)opExperiments[n].match=true;
                        }
                        break;

		}
	}
}
optimost.identify();

optimost.createStyle=function (styleText){
    var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(styleText);
    style.type = 'text/css';
    if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
    else style.appendChild(rules);
    head.appendChild(style);
}

optimost.TH=function(r,c,d,e){
    var b=true;
    if(r<1000){
        b=(Math.floor(Math.random()*1000)<r);
        if(c!=null){
            if(this.C[c]!=null)b=(this.C[c]!="mvt-no");
            else this.SC(c,b?"mvt-yes":"mvt-no",e,d);
        }
        return b;
    }
    else return true;
}
optimost.TX=function(){
    var t='<'+this.ST+' src="'+this.S()+'"';
    for(n in this.SA)t+=(" "+n+'="'+this.SA[n]+'"');t+='><\/'+this.ST+'>';
    this.D.write(t);
}

var opModulesArray=new Array();

for (var n in opExperiments) {
    if (opExperiments[n].match == true){
        for(var m in opExperiments[n]){
            if(typeof(opExperiments[n][m]) =="function" && opExperiments[n].throttle==1000)opExperiments[n][m]();
        }                              
        if (opExperiments[n].unique.indexOf("event.js") != -1) {
            for (var j = 0; j < opExperiments[n].modules.length; j++) opModulesArray.push(opExperiments[n].modules[j]);
            optimost.addModule(opExperiments[n].modules[0],
            function (num) {
                return function(){//alert("num is "+num+" with a unique of "+opExperiments[num].unique);
                    var _o = optimost;_o.U = opPro + opExperiments[num].unique;_o.ST = "script";_o.SA = {"type": "text/javascript"};_o.B();_o.R(opExperiments[num].throttle, opExperiments[num].gum, opExperiments[num].domain, opExperiments[num].expire);
                }
            }(n));;
        }
        else if (opExperiments[n].unique.indexOf("content.js") != -1) {
            for (var j = 0; j < opExperiments[n].modules.length; j++) opModulesArray.push(opExperiments[n].modules[j]);
            (function () {
                var _o = optimost;_o.U = opPro + opExperiments[n].unique;_o.ST = "script";
                _o.SA = {"type": "text/javascript"};_o.B();
                if(opExperiments[n].throttle<1000){//If I have a function and Throttle<1000, first see if we are in, then do it
                    isIn=_o.TH(opExperiments[n].throttle, opExperiments[n].gum, opExperiments[n].domain, opExperiments[n].expire);
                    if(isIn){//isIn determined if you are in or not, and dropped cookie to freeze you in that state
                        for(var m in opExperiments[n]){
                            if(typeof(opExperiments[n][m])=="function")opExperiments[n][m]();
                        }
                        _o.TX();
                    }
                }
                else _o.R(opExperiments[n].throttle, opExperiments[n].gum, opExperiments[n].domain, opExperiments[n].expire);
            })();
        }
        else {
            for (var j = 0; j < opExperiments[n].modules.length; j++) opModulesArray.push(opExperiments[n].modules[j]);
        }
    }
}

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
