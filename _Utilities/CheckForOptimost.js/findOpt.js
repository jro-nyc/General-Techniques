(function(global){
	global.$optF={};
	global.$optV={};
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
	//if(typeof(opCreativeSetCookieA)=="function")$optV.optimostCookiesSet="First-party Cookies are being set by the Trial Code call";

	//if($optV.optimostCSS!=''){
	var list='',
	base36={"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,
			"a":10,"b":11,"c":12,"d":13,"e":14,"f":15,"g":16,"h":17,"i":18,"j":19,"k":20,"l":21,"m":22,"n":23,
			"o":24,"p":25,"q":26,"r":27,"s":28,"t":29,"u":30,"v":31,"w":32,"x":33,"y":34,"z":35};
	if($optV){
		var js=document.getElementsByTagName("script");
		var len = js.length, whitelist=false,blacklist=false, typeOfPlacement=false,
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
				if(js[i].src.split("?")[0].indexOf("customer.global.js")!==-1)typeOfPlacement="Live";
				else if(js[i].src.split("?")[0].indexOf("customer.global.test.js")!==-1)typeOfPlacement="Staging/QA";			
				$optV.scriptCallsToOptimost.push("<div class=\"opEachScript\">A script call is being made to:"+(typeOfPlacement?"<span class=\"opBoldUnder\">This is the "+typeOfPlacement+" Global Code</span>":"")+"<div class=\"opBold\">"+js[i].src.split("?")[0]+"</div></div>");
				//$optV.scriptCallsToOptimost.push(($optV.scriptCallsToOptimost.length==0?"-------------------------<br/>":"")+
					//			 "A script call is being made to:<div class=\"opBold\">"+js[i].src.split("?")[0]+"</div>");
				typeOfPlacement=false;

			}
			whitelist=false,blacklist=false;

		}
		//list+='<div id=\"opSCRlist\">';
		for(var m in $optV){
			if(typeof($optV[m])=="object" && $optV[m]!=null){
				len=$optV[m].length;
				for(var i=0;i<len;i++){
					if($optV[m][i]!=null)list+=$optV[m][i];//+'<br/>';
					//if($optV[m][i]!=null)list+=(list==='';//?'<div id=\"opSCRlist\">':'')+$optV[m][i]+'<br/>';
				}	
				//list+=(list!==''?'</div>':'')
			}
			else if($optV[m]!=null) list+=$optV[m];//+'<br/>';
		}	
		if(list!=='')list='<div id=\"opSCRlist\">'+list+'</div>';
		//list+='</div>';
		//if(list==='')list="no call to Optimost Creative servers or Optimost code on this page.";
		//else if(list==($optV.optimost+"<br/><br/>"))list+=", but no call to Optimost Creative servers or Optimost code on this page";
	}
	else{
		//if($optV.optimost)list=$optV.optimost+" but no call to Optimost Creative servers or Optimost code on this page";
		//else list="no call to Optimost Creative servers or Optimost code on this page.";
		list="no call to Optimost Creative servers or Optimost code on this page.";
	}
	//list+='<br/>';

	$optF.C={};
	var _hashKey="opnocache|opVisitorId|opdebug",
	_hashVals={opnocache:"to ensure we get latest version of Global Code",opVisitorId:"the visitor ID for Dashboard tracking",opdebug:"to ensure all debug messages go to console"}
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
				tempList+="<div class=\"opSepCK\"><span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span>";
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
				tempList+="</div>";
			}
			else if($optF.C[n]!=null && ($optF.C[n]=="mvt-no" || $optF.C[n]=="mvt-yes")){
				tempList+="<div class=\"opSepCK\"><span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span> - Throttling cookie set to '"+($optF.C[n]=="mvt-no"?"off":"on")+"'</div>";			
			}
			else if($optF.C[n]!=null && _hashKey.indexOf(n)!==-1){
				tempList+="<div class=\"opSep\"><span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span> - This is "+_hashVals[n]+"</div>";			
			}			
			else if($optF.C[n]!=null && n==="opVisitorId"){
				tempList+="<div class=\"opSep\"><span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span> - The visitorId for Dashboard tracking.</div>";			
			}			
			else if($optF.C[n]!=null && $optF.C[n]!=""){
				tempList+="<div class=\"opSep\"><span class=\"opBold\">"+n+" = "+$optF.C[n]+"</span> - Probably attribute or value cookie set to be passed downstream</div>";			
			}
		}
		if(tempList!=""){
			tempList="<div id=\"opCKlist\"><span class=\"opBold\">[START] Cookie values---------------------------------<br/>We have the following optimost first party cookies in this domain:</span><br/><br/>"+tempList;
			list+=tempList+'<div class=\"opBold\"><br/>[END] Cookie values---------------------</div></div>';
		}
	}
		
	$optF.GetLS=function(){//17 April LS additions
		var _opti = localStorage.getItem("_optimost"), n, len, keyVal ={}, keyVal2 ={},  str='', 
			tm, nowMs = new Date().getTime(),timeStamp = new Date(), num=0, kv;
		_opti = JSON.parse(_opti);
		var convertToTime = function(val,type){
			var tm=val/1000, days, hours, minutes;
			days=Math.floor(tm/(24*60*60)),
			hours=Math.floor(tm/(60*60)),
			minutes=Math.floor(tm/(60));
			if(type==='days'){
				var dys=days,hrs=hours-days*24,min=minutes-hours*60;
				return dys+'d '+hrs+'h ' +min+'m';
			}
			else if(type==='hours'){
				var hrs=hours, min=minutes-hours*60;
				return hrs+'h '+min+'m'			
			}
		}		

		if (_opti && Object.keys(_opti).length) {
			
			for (n in _opti) {
				tm = (_opti[n].expireMs - nowMs) / (3600000);
				//str+='<tr><td>'+_opti[n].key+'</td><td>'+_opti[n].value+'</td><td>'+tm.toFixed(2)+'h</td><td>'+(tm/24).toFixed(2)+'d</td></tr>';
				
				if(_opti[n].value!=null && (_opti[n].value.length==25 || _opti[n].value.length==37)){	
					str+="<div class=\"opSepCK\"><span class=\"opBold\">"+_opti[n].key+' = '+_opti[n].value+"</span>";				
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
					str+=", Creative #"+crNum;	
					str+=",<br/>Visitor ID          ="+vi;
					str+=(_opti[n].value.length==37?",<br/>Impression ID ="+iid:",<br/>Impression ID ="+vi);	
					//str+='<br/>Expires in <span class=\"opBold\">'+convertToTime((_opti[n].expireMs - nowMs),'days')  + '</span>  or  <span class=\"opBold\">' + convertToTime((_opti[n].expireMs - nowMs),'hours')  + '</span> ';
					str+='<br/>Expires in <span class=\"opBold\">'+convertToTime((_opti[n].expireMs - nowMs),'days')  + '</span>';
					str+="</div>";
					num+=1;
				}
				else if(_opti[n].value!=null && (_opti[n].value=="mvt-no" || _opti[n].value=="mvt-yes")){
					str+="<div class=\"opSepCK\"><span class=\"opBold\">"+_opti[n].key+" = "+_opti[n].value+"</span><br/>"+" - Throttling LS value set to  '"+(_opti[n].value=="mvt-no"?"off":"on")+"'";	
					str+='<br/>Expires in <span class=\"opBold\">'+convertToTime((_opti[n].expireMs - nowMs),'days')  + '</span>';
					str+="</div>";					
				}
				else if(_opti[n].value!=null && _hashKey.indexOf(_opti[n].key)!==-1){
					str+="<div class=\"opSep\"><span class=\"opBold\">"+_opti[n].key+" = "+_opti[n].value+"</span><br/>"+" - This is "+_hashVals[n];			
					str+='<br/>Expires in <span class=\"opBold\">'+convertToTime((_opti[n].expireMs - nowMs),'days')  + '</span>';
					str+="</div>";	
				}					
				else if(_opti[n].value!=null && _opti[n].key==="opVisitorId"){
					str+="<div class=\"opSep\"><span class=\"opBold\">"+_opti[n].key+" = "+_opti[n].value+"</span><br/>"+" - The visitorId for Dashboard tracking.";			
					str+='<br/>Expires in <span class=\"opBold\">'+convertToTime((_opti[n].expireMs - nowMs),'days')  + '</span>';
					str+="</div>";	
				}					
				else if(_opti[n].value!=null && _opti[n].value!=""){
					str+="<div class=\"opSep\"><span class=\"opBold\">"+_opti[n].key+" = "+_opti[n].value+"</span><br/>"+" - Probably LS attribute or value set to be passed downstream.";			
					str+='<br/>Expires in <span class=\"opBold\">'+convertToTime((_opti[n].expireMs - nowMs),'days')  + '</span>';
					str+="</div>";	
				}				
			}
			if(str.length>5)str='<div id=\"opLSlist\"><div class=\"opBold\">[START] Local Storage values---------------------------------<BR/>We have the following optimost Local Storage values in this domain:</div><br/>'+
								str+'<div class=\"opBold\"><br/>[END] Local Storage values---------------------</div></div>';
								
		}		
		list+=str;
	}
	$optF.GetC();
	$optF.GetLS();//17 April Addition
	$optF.checkOptrial=function(){
		var tList="";
		for(n in optrial){
			if(tList=="")tList="<div id=\"opOTlist\">The optrial object is defined and has the following attribute:<br/>";
			tList+="<div class=\"opBold\">"+n+" = "+optrial[n]+"</div>";
		}
		if(tList!="")list+=tList+"</div><br/>";
	}
	if(typeof(optrial)=="object")$optF.checkOptrial();
	
	$optF.clearLS=function(){
		localStorage.removeItem("_optimost"); 
		return '';
	}
	$optF.clearCKS=function(){
		var domain=optimost.SLD(), c=document.cookie, opt={};
		opt.C={};
        if (c.length > 3) {
            for (var a = c.split(";"), i = 0, b = a.length; i < b; i++) {
                var v = a[i].split("=");
                while (v[0].substring(0,
                        1) == " ") v[0] = v[0].substring(1, v[0].length);
                if (v.length == 2) opt.C[v[0]] = unescape(v[1]);
            }
        }		
		for(var n in opt.C){
			if(!!(n.match(/^op\d{2,4}/))){
				document.cookie= n + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"+ ((domain)?";domain="+domain:"") ;
			}			
		}
	}	
	
	$optF.popUp=function(){
		var generator=window.open('','LocalStorageViewPopUp','height=400,width=800,status=0,menubar=0,titlebar=0,toolbar=0,scrollbars=0,channelmode=0'),
		ox = document.getElementById('findOptimostList'), oy = document.getElementById('opExposeMask');
		if (ox)ox.parentNode.removeChild(ox);
		if (oy)oy.parentNode.removeChild(oy);
		ox = document.getElementById('findOptimostList'), oy = document.getElementById('opExposeMask');
		if (ox)ox.parentNode.removeChild(ox);
		if (oy)oy.parentNode.removeChild(oy);
		
		if(generator.document.all.length>5){
			generator.close();
			generator=window.open('','LocalStorageView','height=400,width=800,status=0,menubar=0,titlebar=0,toolbar=0,scrollbars=0,channelmode=0');
		}
		generator.document.write(['',
		'<html><head><title>Local Storage Values</title><style>'+$optV.myStyle+'</style>',
		'<script>_clearLS=function(){localStorage.removeItem("_optimost");return false;}</script></head>',
		'<body><div>'+$optV.contents.replace('$optF.clearLS','generator.clearLS')+'</div></body></html>',
		''].join(''));
		$optF.doCollapseList(generator.document,true);
		//generator.clearLS=$optF.clearLS;
		
		return false;	
	}
	
	$optF.doOpacityList=function(lst){
		if(document.getElementsByTagName("frame").length>0){
			lst="THIS PAGE HAS FRAMES, MUST DISPLAY THE LIST IN AN ALERT<br/>"+lst;
			alert(lst);
			return;	
		}	
		//lst=lst.replace(/<br/>/g,"<br/>");
		var divX=document.createElement("div");
		divX.id="findOptimostList";
		//divX.style.color="#003366";

		var closeX=document.createElement("div");
		closeX.className="opCloseX";
		closeX.innerHTML='<div class="opInside"><a border="0" href="" onclick="$optF.popUp();return false;">Open in Popup</a><span class="opClSpan">Looking for Optimost related data on this page</span></div><a href="" class="myX" onclick="var ox=document.getElementById(\'findOptimostList\');var oy=document.getElementById(\'opExposeMask\');if(ox&&oy){ox.parentNode.removeChild(ox);oy.parentNode.removeChild(oy);}return false;">X</a>';
		var closeX2=document.createElement("div");
		closeX2.className="opCloseX";
		closeX2.innerHTML='<a href="" class="myX" onclick="var ox=document.getElementById(\'findOptimostList\');var oy=document.getElementById(\'opExposeMask\');if(ox&&oy){ox.parentNode.removeChild(ox);oy.parentNode.removeChild(oy);}return false;">X</a>';
		var infoX=document.createElement("div");
		infoX.id="opInfoX";
		//infoX.style.color="#003366";
		$optV.contents=lst;
		if(lst!=='')infoX.innerHTML=lst;
		else {
			infoX.innerHTML='<span class=\"opBold\">There appears to be no Optimost data on this page</span>';
			//infoX.style.textAlign="center";
			infoX.className="opRed"
		}
		divX.appendChild(closeX);
		divX.appendChild(infoX);
		divX.appendChild(closeX2);
		document.body.appendChild(divX);
		var divM=document.createElement("div");
		divM.id="opExposeMask";	
		document.body.appendChild(divM);
		$optV.myStyle=['',
			'#opExposeMask{background-color: #000000;display: block;height:100%;left: 0;opacity:0.85;position:absolute;top:0;width:100%;z-index: 9998;}',
			'#findOptimostList{z-index: 9999;position:absolute;top:100px;left:50%;margin-left:-320px;width:640px;background-color: #ffffff;padding:5px;border:4px solid #cc6600;color: #003366;}',
			'.opCloseX{width:100%;text-align:right;white-space:nowrap;}.opCloseX a.myX{color:#CC0000 !important;font-size:20px;border:2px solid #000000;}',
			'.opClSpan{display: inline-block;margin: 0 13% 0 13%;font-weight: bold;}',
			'#opInfoX{overflow:scroll;height:100%;font-size:14px;color:003366 !important;background-color:#FFFFFF !important;}.opBold{font-weight:bold;}',
			'.opSepCK{padding:4px 2px;border:1px solid #777777;white-space:nowrap}.opEachScript{padding:4px 2px;border:1px solid #eecccc;white-space:nowrap}',
			'#opLSlist{color:#009933 !important;border-top:2px solid;border-bottom:2px solid;padding-top: 4px;margin-bottom:8px;}',
			'#opCKlist{color:#003366 !important;border-top:2px solid;border-bottom:2px solid;padding-top: 4px;margin-bottom:8px;}',
			'#opOTlist{color:#8B4513 !important;border-top:2px solid;border-bottom:2px solid;padding-top: 4px;margin-bottom:8px;}',
			'#opSCRlist{color:#CC0000 !important;border-top:2px solid;border-bottom:2px solid;padding-top: 4px;margin-bottom:8px;}',
			'.opLSlist{color:#009933 !important;font-weight:bold;_display:block;}',
			'.opCKlist{color:#003366 !important;font-weight:bold;_display:block;}',
			'.opOTlist{color:#8B4513 !important;font-weight:bold;_display:block;}',
			'.opSCRlist{color:#CC0000 !important;font-weight:bold;_display:block;}',
			'.opRed{color:#CC0000;text-align:center;}',			
			'.opInside{display: inline-block;text-align: left;width: 97%;}',
			'.opBoldUnder{font-weight:bold;text-decoration:underline;font-size:20px;display:inline-block;margin-left:10px;background:#99ffff;}',
			'.opRemoveLS{display:inline-block;text-align:right;width:66%;color:#009933 !important;}.opRemoveLS a{color:#009933 !important;text-decoration:underline;}',
			'.opRemoveCKS{display:inline-block;text-align:right;width:60%;color:#003366 !important;}.opRemoveCKS a{color:#003366 !important;text-decoration:underline;}',
			''].join('');
			
			$optF.createStyle($optV.myStyle);
		
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
	$optF.doCollapseList=function(doc, isPopUp){
		var areas=["opLSlist","opCKlist","opOTlist","opSCRlist"], i, len, obj,
		areaNames=["Local Storage","First-party Cookies","optrial object attributes","Script calls et al"];
		for(i=0,len=areas.length;i<len;i+=1){
			obj=doc.getElementById(areas[i]);
			if(obj){
				var anc=doc.createElement("a"),spn=doc.createElement("span"),div=doc.createElement("div");
				anc.innerHTML="Collapse&#x25BC";
				anc.href="javascript:void(0);";
				anc.className=div.className=areas[i];
				anc.onclick=function(){
					console.log(this.className);
					var obx=doc.getElementById(this.className);
					if(obx){
						console.log(obx.style.display);
						if(obx.style.display==="none"){console.log('none');obx.style.display="block";this.innerHTML="Collapse&#x25BC";}
						else if(obx.style.display==="block"){console.log('block');obx.style.display="none";this.innerHTML="Expand&#x25B2";}
						else{ obx.style.display="none";this.innerHTML="Expand&#x25B2";}
					}
				}
				spn.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+areaNames[i]+')';
				if(areaNames[i]==="Local Storage" && isPopUp)spn.innerHTML+='<span class="opRemoveLS"><a href="javascript:void(0);" onclick="_clearLS();return false;"> Clear the Local Storage</a> BE VERY CAREFUL</span>';
				else if(areaNames[i]==="Local Storage" && !isPopUp)spn.innerHTML+='<span class="opRemoveLS"><a href="javascript:void(0);" onclick="$optF.clearLS();return false;"> Clear the Local Storage</a> BE VERY CAREFUL</span>';
				if(areaNames[i]==="First-party Cookies" && isPopUp)spn.innerHTML+='<span class="opRemoveCKS"><a href="javascript:void(0);" onclick="_clearCKS();return false;"> Clear the Optimost Cookies</a> BE VERY CAREFUL</span>';
				else if(areaNames[i]==="First-party Cookies" && !isPopUp)spn.innerHTML+='<span class="opRemoveCKS"><a href="javascript:void(0);" onclick="$optF.clearCKS();return false;"> Clear the Optimost Cookies</a> BE VERY CAREFUL</span>';
				div.appendChild(anc);
				div.appendChild(spn);
				obj.parentNode.insertBefore(div,obj);
			}

		}
		
	}
	//alert(list);
	$optF.doOpacityList(list);
	$optF.doCollapseList(document);
	//$optF.opChangeCSS('.bodyXYZ','font-size','10px');
	//$opt.opChangeCSS('.btl-bevel-top-bottom','display','block');
	//$opt.opChangeCSS('.btl-navBox-body','display','block');
	//$opt.opChangeCSS('.btl-navBox-body','display','block');
})(this);
