
<!--
// mouse-over stuff
var nav_img_ld=0;

function nav_ld_imgs() {
	if (document.images) {  
		nav_iobj = new NavMakeArray(10);

		nav_iobj[ 0].src = "images/services_off.gif";
		nav_iobj[ 1].src = "images/services_on.gif";
		nav_iobj[ 2].src = "images/partners_off.gif";
		nav_iobj[ 3].src = "images/partners_on.gif";	
		nav_iobj[ 4].src = "images/press_off.gif";
		nav_iobj[ 5].src = "images/press_on.gif";
		nav_iobj[ 6].src = "images/about_off.gif";
		nav_iobj[ 7].src = "images/about_on.gif";
		nav_iobj[ 8].src = "images/products_off.gif";
		nav_iobj[ 9].src = "images/products_on.gif";
		nav_img_ld=1;
	}
	window.self.focus();
}

function NavMakeArray(n) {
	this.length = n;
	for (var i = 0; i< n; i++) this[i] = new Image();
	return this;
}
	
function nav_chng_img(imgName,imgNum) {
	if (nav_img_ld) {
		document [imgName].src = nav_iobj[imgNum].src;
	}
}
-->
