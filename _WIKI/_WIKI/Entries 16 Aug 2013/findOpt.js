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
	if($optV.optimostCSS.indexOf("opmodule")==-1)$optV.optimostCSS="The following style definition was found:\n"+$optV.optimostCSS+"\nsince there is no module style defined, this is probably just failover copy";
	else $optV.optimostCSS="The following style definition was found:\n"+$optV.optimostCSS;;
	
}
else $optV.optimostCSS=null;
if(typeof(optimost)=="object"){
	$optV.optimost="The Optimost Object is Defined";
	if(typeof(opExperiments)=="object"){
		var newGlobal=false;
		for(var n in opExperiments)if(opExperiments[n].unique.indexOf("trial")!=-1)newGlobal=true;
		if(newGlobal)$optV.globalCode='Contains opExperiments object  with "unique" attr (Author-style Global Code)';
		else $optV.globalCode="The opExperiments object exists, Global Code likely exist";
	}
	if(optimost.displayModule!=null){
		$optV.moduleOnPage=[];
		
		var mList='';
		for(var n in optimost.M)if(optimost.M.hasOwnProperty(n))mList+="\n"+n;
		if(mList!='')$optV.moduleOnPage.push('This page contains the following module(s):'+mList);
		
		if(optimost.C){
			$optV.optimostCookies=[];
			for(var n in optimost.C)if(optimost.C.hasOwnProperty(n)&&n.substring(0,2)=="op")$optV.optimostCookies.push('The cookie "'+n+'" is in this webpage\'s domain');
		}
	}
}
if(typeof(opCreativeSetCookieA)=="function")$optV.optimostCookiesSet="First-party Cookies are being set by the Trial Code call";

//if($optV.optimostCSS!=''){
var list='';
if($optV){
	var js=document.getElementsByTagName("script");
	len = js.length;
	$optV.scriptCallsToOptimost=[]
	for(i=0;i<len;i++){
		if(js[i].src.toLowerCase().indexOf("optimost.com")!=-1 && js[i].src.toLowerCase().indexOf("kidwww.op")==-1 && js[i].src.toLowerCase().indexOf("asp.optimost")==-1 && js[i].src.toLowerCase().indexOf("findopt.js")==-1 )$optV.scriptCallsToOptimost.push("A script call is being made to:\n"+js[i].src.split("?")[0]);
	}	
	for(var m in $optV){
		if(typeof($optV[m])=="object" && $optV[m]!=null){
			len=$optV[m].length;
			for(var i=0;i<len;i++){
				if($optV[m][i]!=null)list+=$optV[m][i]+'\n\n';
			}		
		}
		else if($optV[m]!=null) list+=$optV[m]+'\n\n';
	}	
	if(list=='')list="no call to Optimost Creative servers or Optimost code on this page.";
	else if(list==($optV.optimost+"\n\n"))list+=", but no call to Optimost Creative servers or Optimost code on this page";
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
	var base36={"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,
		"a":10,"b":11,"c":12,"d":13,"e":14,"f":15,"g":16,"h":17,"i":18,"j":19,"k":20,"l":21,"m":22,"n":23,
		"o":24,"p":25,"q":26,"r":27,"s":28,"t":29,"u":30,"v":31,"w":32,"x":33,"y":34,"z":35};
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
			tempList+=n+" = "+$optF.C[n];
			var sgNum=0;
			sgNum=parseInt(base36[sg.substring(2,3)])+parseInt(36*parseInt(base36[sg.substring(1,2)]))+parseInt(36*36*parseInt(base36[sg.substring(0,1)]));
			tempList+="\nSegment #"+sgNum;
			var wvNum=0;
			wvNum=parseInt(base36[wv.substring(2,3)])+parseInt(36*parseInt(base36[wv.substring(1,2)]))+parseInt(36*36*parseInt(base36[wv.substring(0,1)]));
			tempList+=", Wave #"+wvNum;
			var crNum=0;
			var crNum=parseInt(base36[cr.substring(2,3)])+parseInt(36*parseInt(base36[cr.substring(1,2)]))+parseInt(36*36*parseInt(base36[cr.substring(0,1)]));
			tempList+=", Creative #"+crNum;		
			tempList+=",\nVisitor ID          ="+vi;
			tempList+=($optF.C[n].length==37?",\nImpression ID ="+iid:",\nImpression ID ="+vi);
			//tempList+=",\nVisitor ID "+($optF.C[n].length==37?"":"(and Impression ID)")+"="+vi;
			//tempList+=($optF.C[n].length==37?", Impression ID ="+iid:"");				
			tempList+="\n\n";
		}
		else if($optF.C[n]!=null && ($optF.C[n]=="mvt-no" || $optF.C[n]=="mvt-yes")){
			tempList+=n+" = "+$optF.C[n]+" - This is a throttling cookie set to '"+($optF.C[n]=="mvt-no"?"off":"on")+"'\n\n";			
		}
		else if($optF.C[n]!=null && $optF.C[n]!=""){
			tempList+=n+" = "+$optF.C[n]+" - This is most likely some attribute or value cookie set to be passed downstream\n\n";			
		}
	}
	if(tempList!=""){
		tempList="\n-------------------------\nWe have the following optimost first party cookies in this domain:\n\n"+tempList;
		list+=tempList;
	}
}
$optF.GetC();
$optF.checkOptrial=function(){
	var tList="";
	for(n in optrial){
		if(tList=="")tList="\n--------------------------\nThe optrial object is defined and has the following attribute:\n";
		tList+=n+" = "+optrial[n]+"\n";
	}
	if(tList!="")list+=tList+"\n";
}
if(typeof(optrial)=="object")$optF.checkOptrial();

alert(list);

//$optF.opChangeCSS('.bodyXYZ','font-size','10px');
//$opt.opChangeCSS('.btl-bevel-top-bottom','display','block');
//$opt.opChangeCSS('.btl-navBox-body','display','block');
//$opt.opChangeCSS('.btl-navBox-body','display','block');

