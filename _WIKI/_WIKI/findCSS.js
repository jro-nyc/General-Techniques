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
				return;
			}
			var thisCSS=document.styleSheets[S][cssRules];
			for (var R = 0; R < thisCSS.length; R++) {//alert(R);
				if (thisCSS[R].selectorText.indexOf(theClass)!=-1) {
					return thisCSS[R].selectorText+'{'+thisCSS[R].style.cssText+'}';
				}
			}
		}
			catch(err){
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
if($optV){
	list='';
	var js=document.getElementsByTagName("script");
	len = js.length;
	$optV.scriptCallsToOptimost=[]
	for(i=0;i<len;i++){
		if(js[i].src.toLowerCase().indexOf("optimost.com")!=-1 && js[i].src.toLowerCase().indexOf("kidwww.op")==-1)$optV.scriptCallsToOptimost.push("A script call is being made to:\n"+js[i].src.split("?")[0]);
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
	if(list!='')alert(list);
	else alert("no Optimost call or code on this page");
}
else alert("no Optimost call or code on this page");

//$optF.opChangeCSS('.bodyXYZ','font-size','10px');
//$opt.opChangeCSS('.btl-bevel-top-bottom','display','block');
//$opt.opChangeCSS('.btl-navBox-body','display','block');
//$opt.opChangeCSS('.btl-navBox-body','display','block');

