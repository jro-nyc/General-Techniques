//LIVE Global Code

window.optGlobal = {};
window.opModulesArray = window.opModulesArray || [];
optGlobal.run=true;
optGlobal.location = "Citi.com >> Global";
optGlobal.hasOptimost=false;
optGlobal.stagingCookie  = {"name":"opselect", "value":"qa"};
optGlobal.strPath = "http://by.optimost.com";
optGlobal.isStage = false;
if(document.location && document.location.protocol && document.location.protocol.toLowerCase().indexOf("https") > -1){optGlobal.strPath = "https://by.essl.optimost.com/by";}

if(typeof(optimost) == "object" && optimost.C && optimost.Q)
{
	optGlobal.hasOptimost=true;
	
	//set selector staging cookie
	if(optimost.Q[optGlobal.stagingCookie.name])optimost.SC(optGlobal.stagingCookie.name, optGlobal.stagingCookie.value, null,optimost.SLD());
	if(optimost.Q[optGlobal.stagingCookie.name] || optimost.C[optGlobal.stagingCookie.name])
	{
		optGlobal.isStage=true;
	}
	if(optimost.Q["opqa"]){
		optimost.SC("opqa", "true", null, optimost.SLD());
	}
}
else
{
	optGlobal.run=false;
}



/*
class that defines each trial
parameter func is a function that returns an object [used to pass data to trial code]

-should not be modified
*/

optGlobal.classTrial = function(sTrialUrl,sModule,nThrottle,sCookie,sDomain,nExp,fAttribs,bRun)
{
	this.trialUrl = sTrialUrl;
	this.modules = (typeof(sModule) == "string") ? [sModule] : sModule;
	this.cookie = sCookie || null;
	this.throttle = nThrottle || 1000;
	this.expire = nExp || null;
	this.domain = sDomain || null;
	this.attribs = null;
	if(fAttribs)
	{
		if(typeof(fAttribs) == "function")
		{
			this.attribs = fAttribs();
		}
		else if(typeof(fAttribs) == "object")
		{
			this.attribs = fAttribs;
		}
	}
	this.run = bRun || true;	
	this.fRunBelow = (typeof(fRunBelow) == "function") ? fRunBelow : null;
}

/*
writes out trial code(s)

-should not be modified
*/
optGlobal.executeTrialCode=function(oTrial)
{
	window.optrial = window.optrial || {};
	if(oTrial.attribs)
	{
		optrial= oTrial.attribs;
	}
	if(oTrial.modules)
	{
		opModulesArray = opModulesArray.concat(oTrial.modules);
	}
	
	oTrial.trialUrl = (oTrial.trialUrl.indexOf("http") == -1) ? optGlobal.strPath  +  oTrial.trialUrl : oTrial.trialUrl;
			
	(function(){var _o=optimost;_o.U=oTrial.trialUrl;
	_o.ST="script";_o.SA={"type":"text/javascript"};_o.B();
	oTrial.isRunning = _o.RXH( oTrial.throttle,  oTrial.cookie,  oTrial.domain,  oTrial.expire);
	})();
	
	optimost.I();
}
optGlobal.runExperiment = function()
{
	for(var i=0; i<optGlobal.aPageTrial.length; i++)
	{
		var opCurrentTrial = optGlobal.aPageTrial[i];
		if(opCurrentTrial.run)
		{
			optGlobal.executeTrialCode(opCurrentTrial);
		}
	}
	return true;
}


/*
returns a string that uniquely defines the current page
used by the optGlobal.objTrials object

in this instance, client defines a variable called "page"

-modify accordingly
*/


optGlobal.getPageId = function()
{
	var pageId = "";
	var path = document.location.pathname;
	if(path == "/")
	{
		pageId="home";
	}
	else if(path == "/compare/")
	{
		pageId="compare";
	}
	else if(path.indexOf("/credit-cards/") > -1)
	{
		var b = path.indexOf("/view-all-credit-cards/") > -1 || path.indexOf("/no-annual-fee-credit-cards/") > -1 
			|| path.indexOf("/rewards-credit-cards/") > -1 || path.indexOf("/thank-you-rewards-credit-cards/")	> -1 || false;
		if(b)
		{
			pageId="cards";
		}
		else if(path.indexOf("/all-student-credit-cards/") > -1 )
		{
			pageId = "cards_stu";
		}
		else if(path.indexOf("/citi-forward-for-college-students/additional-information/") > -1)
		{
			padeId="info";
		}
		else if(path.indexOf("/citi-forward-for-college-students/") > -1)
		{
			pageId = "students";
		}
		else if(path.indexOf("/most-popular-credit-cards/") > -1 || path.indexOf("/balance-transfer-credit-cards/") > -1 || path.indexOf("/all-personal-credit-cards/") > -1)
		{
			pageId="cards_typ";
		}
		else if(path.indexOf("/citi-thankyou-preferred-card/") > -1)
		{
			pageId="details_typ";
		}
	}
	else if(path == "/find-a-credit-card-by-feature/")
	{
		pageId = "cards";
	}
	else if(path == "/reward-programs/")
	{
		pageId="reward";
	}
	else if(path.indexOf("/webtest/jim/onload") > -1)
	{
		pageId="onloadTest";	
	}	
	return pageId;
}

optGlobal.setAttributes = function(){
	window.optrial = window.optrial || {};
	if(!optimost.C["op_edu"])
	{
		optrial.op_edu="no";
		if(document.referrer && document.referrer.toLowerCase().indexOf(".edu") > -1)
		{
			optrial.op_edu = "yes";
		}
		optimost.SC("op_edu", optrial.op_edu, null, optimost.SLD());
	}
	
	if(optimost.C["citi.ecm"] == "1"){
		optrial.optype="ecm"
	}
	else{
		optrial.optype="prospect";
	}
}
	


//get the page id and path
optGlobal.strPage = optGlobal.getPageId();



/*
objTrials.PAGE can be an object of classTrial 
or an array of classTrial objects [multiple trials on a single page]

-modify accordingly
*/
optGlobal.objTrials = {};

optGlobal.setTrials = function()
{
	
	optGlobal.nThrottle = 400;
	if(optimost.Q["op_throttle"]){
		optGlobal.nThrottle = optimost.Q["op_throttle"];
	}
	if(document.location.href.indexOf("//release") > -1 || optGlobal.isStage){
		optGlobal.nThrottle = 1000;
	}
	
	//Credit Card Pages >> Student Forward Card
	//Credit Card Pages >> ThankYou Preferred
	optGlobal.setAttributes();
	
	//throttle
	//optGlobal.cThrottle = "opCitiThrottle";
	//optGlobal.cTime = 2592000
	//optGlobal.sDomain = optimost.SLD();
	
	//no throttle
	optGlobal.cThrottle = null;
	optGlobal.cTime = null;
	optGlobal.sDomain = null;
	optGlobal.nThrottle = 1000;
	
	optGlobal.objTrials.home = [
		new optGlobal.classTrial("/trial/618/p/studentforwardcard.437/12/content.js", "stu_home", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime),
		new optGlobal.classTrial("/trial/618/p/thankyoupreferred.93a/13/content.js", "typ_home", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime)
	];
	
	optGlobal.objTrials.cards = [
		new optGlobal.classTrial("/trial/618/p/studentforwardcard.437/12/content.js", "stu_cards", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime),
		new optGlobal.classTrial("/trial/618/p/thankyoupreferred.93a/13/content.js", "typ_cards", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime)
	];
	
	optGlobal.objTrials.reward = [
		new optGlobal.classTrial("/trial/618/p/studentforwardcard.437/12/content.js", "stu_reward", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime),
		new optGlobal.classTrial("/trial/618/p/thankyoupreferred.93a/13/content.js", "typ_reward", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime)
	];
	
	optGlobal.objTrials.compare = [
		new optGlobal.classTrial("/trial/618/p/studentforwardcard.437/12/content.js", "stu_compare", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime),
		new optGlobal.classTrial("/trial/618/p/thankyoupreferred.93a/13/content.js", "typ_compare", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime)
	];

	optGlobal.objTrials.onloadTest = new optGlobal.classTrial("/trial/2/p/onloaddommanipulation.793/972/content.j", "body", 1000, null,null,null);		
	
	optGlobal.objTrials.students = new optGlobal.classTrial("/trial/618/p/studentforwardcard.437/12/content.js", "stu_students", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime);	
	
	optGlobal.objTrials.cards_stu = new optGlobal.classTrial("/trial/618/p/studentforwardcard.437/12/content.js", "stu_cards", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime);
	
	optGlobal.objTrials.cards_typ = new optGlobal.classTrial("/trial/618/p/thankyoupreferred.93a/13/content.js", "typ_cards", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain,optGlobal.cTime);
	optGlobal.objTrials.details_typ = new optGlobal.classTrial("/trial/618/p/thankyoupreferred.93a/13/content.js", "typ_detail", optGlobal.nThrottle, optGlobal.cThrottle, optGlobal.sDomain, optGlobal.cTime);
}


if(optGlobal.run)
{
	optGlobal.setTrials();
	
	optGlobal.aPageTrial = [];
	if(optGlobal.objTrials[optGlobal.strPage])
	{
		if(optGlobal.objTrials[optGlobal.strPage].length)
		{
			optGlobal.aPageTrial = optGlobal.aPageTrial.concat(optGlobal.objTrials[optGlobal.strPage]);
		}
		else
		{
			optGlobal.aPageTrial.push(optGlobal.objTrials[optGlobal.strPage]);
		}
	}


	if(optGlobal.aPageTrial.length > 0)
	{
		optGlobal.runExperiment();
	}
}

optimost.onloadModuleCode=function(){
	var _o=optimost;
	_o.U="http://es.optimost.com/es/2/c/917/u/moduleCode.js";
	_o.ST="script";
	_o.SA={"type":"text/javascript"};
	_o.RXH(1000,null,null,null);
}
optimost.onloadModuleCode();
