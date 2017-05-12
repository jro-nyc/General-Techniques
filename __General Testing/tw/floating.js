// floating mechanism for ToTop

var queryPlatform = navigator.userAgent;
var platform;
if (queryPlatform.indexOf('Mac') !=-1)  {
	platform = 'mac';
} else {
	platform = 'win';
}
			
function popup( src )
{
	var name = "Popup";
	var options = "toolbar=yes, status=yes, location=yes, menubar=yes, scrollbars=yes, resizable=yes";
	var oWindow = window.open("", name, options );
	oWindow.focus();
	oWindow.location = src;
	
	return false;
}

function back2Top()
{
	if (document.getElementById)
	{ scrollTo (0,0) ; }
}

function floating () {
	if (document.all) {
		
		if (platform == 'mac')
		{	
		}
		else
		{
			document.all.ToTop.style.pixelTop = document.body.clientHeight - 150 + document.body.scrollTop;
		}
	}
	else if (document.layers) {
		document.ToTop.top = window.innerHeight - 150 + window.pageYOffset;
	}
	else if (document.getElementById) {
		document.getElementById('ToTop').style.top = window.innerHeight - 150 - 5 + window.pageYOffset + 'px';
		}
}

if (document.all)
	window.onscroll = floating;
else
	setInterval ('floating()', 60);

function initfloatingimage () {
	
	if (document.all) {
		document.all.ToTop.style.pixelLeft = 616;
		if (platform == 'mac')
		{
			document.all.ToTop.style.visibility = 'hidden';
		}
		else
		{
			document.all.ToTop.style.visibility = 'visible';
		}
	}
	else if (document.layers) {
		document.ToTop.left = 616;
		document.ToTop.visibility = 'show';
	}
	else if (document.getElementById) {
		document.getElementById('ToTop').style.left = 616;
		document.getElementById('ToTop').style.visibility = 'visible';
		}
	}
