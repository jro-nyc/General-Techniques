(function(global){
	$optF={};
	$optV={};
	$optF.FindClassDefinition=function(theClass){
		for (var S = 0; S < document.styleSheets.length; S++){
			try{
				if(document.styleSheets[S]['rules']) {
					cssRules = 'rules';
				} else if (document.styleSheets[S]['cssRules']) {
					cssRules = 'cssRules';
				} else {
					cssrules='none';//no rules found... browser unknown
					return '';
				}
				var thisCSS=document.styleSheets[S][cssRules];
				for (var R = 0; R < thisCSS.length; R++) {//alert(R);
					if (thisCSS[R].selectorText.indexOf(theClass)!=-1) {
						return thisCSS[R].selectorText+'{'+thisCSS[R].style.cssText+'}';
					}
				}
			}
				catch(err){
					return '';
			}
		}
		return '';
	}

	$optV.optimostCSS=$optF.FindClassDefinition("opDefaultContent");
	if($optV.optimostCSS!=''){
		if($optV.optimostCSS.indexOf("opmodule")==-1)$optV.optimostCSS="The following style definition was found:<br/>"+$optV.optimostCSS+"<br/>since there is no module style defined, this is probably just failover copy";
		else $optV.optimostCSS="The following style definition was found:<br/>"+$optV.optimostCSS;;
		
	}
	else $optV.optimostCSS=null;
	if(typeof(optimost)=="object"){
		$optV.optimost="The Optimost Object is Defined";
		if (typeof(opPageId)!="undefined") {
			$optV.opPageId='The value "opPageId" is set to "'+opPageId+'"';
		}	
		if(typeof(opExperiments)=="object"){
			var newGlobal=false;
			for(var n in opExperiments)if(opExperiments[n].unique && opExperiments[n].unique.indexOf("trial")!=-1)newGlobal=true;
			if(newGlobal)$optV.globalCode='Contains <span class="opBold">opExperiments</span> object  with "unique" attr (Author-style Global Code)';
			else $optV.globalCode="The opExperiments object exists, Global Code likely exist";
		}
		if(optimost.displayModule!=null){
			$optV.moduleOnPage=[];
			
			var mList='';
			//for(var n in optimost.M)if(optimost.M.hasOwnProperty(n))mList+="<br/>"+n;
			for(var n in optimost.M)if(optimost.M.hasOwnProperty(n))mList+="<br/><span class=\"opBold\">"+n+"</span>";
			if(mList!='')$optV.moduleOnPage.push('This page contains the following module(s):'+mList);
			
			if(optimost.C){
				$optV.optimostCookies=[];
				//for(var n in optimost.C)if(optimost.C.hasOwnProperty(n)&&n.substring(0,2)=="op")$optV.optimostCookies.push('The cookie "'+n+'" is in this webpage\'s domain');
			}
		}
	}
	if(typeof(opCreativeSetCookieA)=="function")$optV.optimostCookiesSet="First-party Cookies are being set by the Trial Code call";

	//if($optV.optimostCSS!=''){
	var list='',
	base36={"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,
			"a":10,"b":11,"c":12,"d":13,"e":14,"f":15,"g":16,"h":17,"i":18,"j":19,"k":20,"l":21,"m":22,"n":23,
			"o":24,"p":25,"q":26,"r":27,"s":28,"t":29,"u":30,"v":31,"w":32,"x":33,"y":34,"z":35};
	if($optV){
		var js=document.getElementsByTagName("script");
		var len = js.length, whitelist=false,blacklist=false,
		//_domains={"optimost.com":true,"asp.optimost.com":false,"findopt.js":false,"marketinghub.hp.com":true};
		_domains={"optimost.com":true,"asp.optimost.com":false,"findopt.js":false,"marketinghub.hp.com":true,"marketinghub.opentext.com":true,"pto.digitalriver.com":true};	
		$optV.scriptCallsToOptimost=[];

		for(i=0;i<len;i++){
			for(var n in _domains){
				if (_domains[n]) {//whitelist
					if (js[i].src.toLowerCase().indexOf(n)!=-1)whitelist=true;
				}
				else{//blaclist
					if (js[i].src.toLowerCase().indexOf(n)!=-1)blacklist=true;
				}
			}
			if (whitelist && !blacklist) {//If on the whitelist and NOT on the blacklist
				$optV.scriptCallsToOptimost.push(($optV.scriptCallsToOptimost.length==0?"-------------------------<br/>":"")+
								 "A script call is being made to:<div class=\"opBold\">"+js[i].src.split("?")[0]+"</div>");
			}
			whitelist=false,blacklist=false;

		}
		
		for(var m in $optV){
			if(typeof($optV[m])=="object" && $optV[m]!=null){
				len=$optV[m].length;
				for(var i=0;i<len;i++){
					if($optV[m][i]!=null)list+=$optV[m][i]+'<br/>';
				}		
			}
			else if($optV[m]!=null) list+=$optV[m]+'<br/>';
		}	
		if(list=='')list="no call to Optimost Creative servers or Optimost code on this page.";
		else if(list==($optV.optimost+"<br/><br/>"))list+=", but no call to Optimost Creative servers or Optimost code on this page";
	}
	else{
		//if($optV.optimost)list=$optV.optimost+" but no call to Optimost Creative servers or Optimost code on this page";
		//else list="no call to Optimost Creative servers or Optimost code on this page.";
		list="no call to Optimost Creative servers or Optimost code on this page.";
	}


	$optF.C={};
	$optF.GetC=function(){
		var tempList="";
		var c=document.cookie;

		if(c.length>3){
			for(var a=c.split(";"),i=0,b=a.length;i<b;i++){
				var v=a[i].split("=");
				while(v[0].substring(0,1)==" ")v[0]=v[0].substring(1,v[0].length);
				if(v.length==2)$optF.C[v[0]]=unescape(v[1]);
			}
		}
		for(n in $optF.C)if(n.substring(0,2)!="op")$optF.C[n]=null;
		for(n in $optF.C){
			if($optF.C[n]!=null && ($optF.C[n].length==25 || $optF.C[n].length==37)){
				var sg=$optF.C[n].substring(1,4).toLowerCase();
				var wv=$optF.C[n].substring(4,7).toLowerCase();
				var cr=$optF.C[n].substring(7,10).toLowerCase();
				var vi=$optF.C[n].substring(10,22).toLowerCase();
				var iid=($optF.C[n].length==37?$optF.C[n].substring(22,34).toLowerCase():'');
				tempList+="<span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span>";
				var sgNum=0;
				sgNum=parseInt(base36[sg.substring(2,3)])+parseInt(36*parseInt(base36[sg.substring(1,2)]))+parseInt(36*36*parseInt(base36[sg.substring(0,1)]));
				tempList+="<br/>Segment #"+sgNum;
				var wvNum=0;
				wvNum=parseInt(base36[wv.substring(2,3)])+parseInt(36*parseInt(base36[wv.substring(1,2)]))+parseInt(36*36*parseInt(base36[wv.substring(0,1)]));
				tempList+=", Wave #"+wvNum;
				var crNum=0;
				var crNum=parseInt(base36[cr.substring(2,3)])+parseInt(36*parseInt(base36[cr.substring(1,2)]))+parseInt(36*36*parseInt(base36[cr.substring(0,1)]));
				tempList+=", Creative #"+crNum;		
				tempList+=",<br/>Visitor ID          ="+vi;
				tempList+=($optF.C[n].length==37?",<br/>Impression ID ="+iid:",<br/>Impression ID ="+vi);
				//tempList+=",<br/>Visitor ID "+($optF.C[n].length==37?"":"(and Impression ID)")+"="+vi;
				//tempList+=($optF.C[n].length==37?", Impression ID ="+iid:"");				
				tempList+="<br/><br/>";
			}
			else if($optF.C[n]!=null && ($optF.C[n]=="mvt-no" || $optF.C[n]=="mvt-yes")){
				tempList+="<span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span> - Throttling cookie set to '"+($optF.C[n]=="mvt-no"?"off":"on")+"'<br/><br/>";			
			}
			else if($optF.C[n]!=null && $optF.C[n]!=""){
				tempList+="<span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span> - Probably attribute or value cookie set to be passed downstream<br/><br/>";			
			}
		}
		if(tempList!=""){
			tempList="---------------------------------<br/><span class=\"opBold\">[START] Cookie values<BR/>We have the following optimost first party cookies in this domain:</span><br/><br/>"+tempList;
			list+=tempList+'<div class=\"opBold\">[END] Cookie values---------------------</div><br/>';
		}
	}
	$optF.GetLS=function(){//17 April LS additions
		var _opti = localStorage.getItem("_optimost"), n, len, keyVal ={}, keyVal2 ={},  str='', 
			tm, nowMs = new Date().getTime(),timeStamp = new Date(), num=0, kv;
		_opti = JSON.parse(_opti);

		if (Object.keys(_opti).length) {
			
			for (n in _opti) {
				tm = (_opti[n].expireMs - nowMs) / (3600000);
				//str+='<tr><td>'+_opti[n].key+'</td><td>'+_opti[n].value+'</td><td>'+tm.toFixed(2)+'h</td><td>'+(tm/24).toFixed(2)+'d</td></tr>';
				
				if(_opti[n].value!=null && (_opti[n].value.length==25 || _opti[n].value.length==37)){	
					str+="<span class=\"opBold\">"+_opti[n].key+' = '+_opti[n].value+"</span>";				
					var sg=_opti[n].value.substring(1,4).toLowerCase(),
					wv=_opti[n].value.substring(4,7).toLowerCase(),
					cr=_opti[n].value.substring(7,10).toLowerCase(),
					vi=_opti[n].value.substring(10,22).toLowerCase(),
					iid=(_opti[n].value.length==37?_opti[n].value.substring(22,34).toLowerCase():'');				
					var sgNum=0;
					sgNum=parseInt(base36[sg.substring(2,3)])+parseInt(36*parseInt(base36[sg.substring(1,2)]))+parseInt(36*36*parseInt(base36[sg.substring(0,1)]));
					str+="<br/>Segment #"+sgNum;
					var wvNum=0;
					wvNum=parseInt(base36[wv.substring(2,3)])+parseInt(36*parseInt(base36[wv.substring(1,2)]))+parseInt(36*36*parseInt(base36[wv.substring(0,1)]));
					str+=", Wave #"+wvNum;
					var crNum=0;
					var crNum=parseInt(base36[cr.substring(2,3)])+parseInt(36*parseInt(base36[cr.substring(1,2)]))+parseInt(36*36*parseInt(base36[cr.substring(0,1)]));
					str+=",<br/>Visitor ID          ="+vi;
					str+=(_opti[n].value.length==37?",<br/>Impression ID ="+iid:",<br/>Impression ID ="+vi);	
					str+='<br/>Expires in <span class=\"opBold\">'+(tm/24).toFixed(2) + '</span> days or  <span class=\"opBold\">' + (tm / 1).toFixed(2) + '</span> hours';
					str+="<br/><br/>";
					num+=1;
				}
				else if(_opti[n].value!=null && (_opti[n].value=="mvt-no" || _opti[n].value=="mvt-yes")){
					str+="<span class=\"opBold\">"+_opti[n].key+" = "+_opti[n].value+"</span><br/>"+" - Throttling LS value set to  '"+(_opti[n].value=="mvt-no"?"off":"on")+"'";	
					str+='<br/>Expires in <span class=\"opBold\">'+(tm/24).toFixed(2) + '</span> days or  <span class=\"opBold\">' + (tm / 1).toFixed(2) + '</span> hours';
					str+="<br/><br/>";					
				}
				else if(_opti[n].value!=null && _opti[n].value!=""){
					str+="<span class=\"opBold\">"+_opti[n].key+" = "+_opti[n].value+"</span><br/>"+" - Probably LS attribute or value set to be passed downstream.";			
					str+='<br/>Expires in <span class=\"opBold\">'+(tm/24).toFixed(2) + '</span> days or  <span class=\"opBold\">' + (tm / 1).toFixed(2) + '</span> hours';
					str+="<br/><br/>";	
				}				
			}
			if(str.length>5)str='<div class=\"opBold\">[START] LOCAL STORAGE VALUES<BR/>We have the following optimost Local Storage values in this domain:</div><br/>'+
								str+'<div class=\"opBold\">[END] LOCAL STORAGE VALUES---------------------</div><br/>';
		}		
		list+=str;
	}
	$optF.GetC();
	$optF.GetLS();//17 April Addition
	$optF.checkOptrial=function(){
		var tList="";
		for(n in optrial){
			if(tList=="")tList="The optrial object is defined and has the following attribute:<br/>";
			tList+="<div class=\"opBold\">"+n+" = "+optrial[n]+"</div>";
		}
		if(tList!="")list+=tList+"<br/>";
	}
	if(typeof(optrial)=="object")$optF.checkOptrial();
	$optF.doOpacityList=function(lst){
		if(document.getElementsByTagName("frame").length>0){
			lst="THIS PAGE HAS FRAMES, MUST DISPLAY THE LIST IN AN ALERT<br/>"+lst;
			alert(lst);
			return;	
		}	
		//lst=lst.replace(/<br/>/g,"<br/>");
		var divX=document.createElement("div");
		divX.id="findOptimostList";
		divX.style.color="#003366";

		var closeX=document.createElement("div");
		closeX.className="opCloseX";
		closeX.innerHTML='<a href="" onclick="var ox=document.getElementById(\'findOptimostList\');var oy=document.getElementById(\'opExposeMask\');if(ox&&oy){ox.parentNode.removeChild(ox);oy.parentNode.removeChild(oy);}return false;">X</a>';
		var closeX2=document.createElement("div");
		closeX2.className="opCloseX";
		closeX2.innerHTML='<a href="" onclick="var ox=document.getElementById(\'findOptimostList\');var oy=document.getElementById(\'opExposeMask\');if(ox&&oy){ox.parentNode.removeChild(ox);oy.parentNode.removeChild(oy);}return false;">X</a>';
		var infoX=document.createElement("div");
		infoX.id="opInfoX";
		infoX.style.color="#003366";
		infoX.innerHTML=lst;

		divX.appendChild(closeX);
		divX.appendChild(infoX);
		divX.appendChild(closeX2);
		document.body.appendChild(divX);
		var divM=document.createElement("div");
		divM.id="opExposeMask";	
		document.body.appendChild(divM);
		$optF.createStyle(['',
			'#opExposeMask{background-color: #000000;display: block;height:100%;left: 0;opacity:0.85;position:absolute;top:0;width:100%;z-index: 9998;}',
			'#findOptimostList{z-index: 9999;position:absolute;top:100px;left:50%;margin-left:-320px;width:640px;background-color: #ffffff;padding:5px;border:4px solid #cc6600;color: #003366;}',
			'.opCloseX{width:100%;text-align:right}.opCloseX a{color:#CC0000 !important;font-size:20px;border:2px solid #000000;}',
			'#opInfoX{overflow:scroll;height:100%;font-size:14px;color:003366 !important;background-color:#FFFFFF !important;}.opBold{font-weight:bold;}',
			''].join(''));
		
	}
	$optF.createStyle=function(styleText){
			var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style'),
			rules = document.createTextNode(styleText);
			style.type = 'text/css';
			if(style.styleSheet)
			style.styleSheet.cssText = rules.nodeValue;
			else style.appendChild(rules);
			head.appendChild(style);
	}
	//alert(list);
	$optF.doOpacityList(list);
	//$optF.opChangeCSS('.bodyXYZ','font-size','10px');
	//$opt.opChangeCSS('.btl-bevel-top-bottom','display','block');
	//$opt.opChangeCSS('.btl-navBox-body','display','block');
	//$opt.opChangeCSS('.btl-navBox-body','display','block');
})(this);
