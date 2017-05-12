$v={};
$opt={};
$v.CREATIVE_KEY={}
anchors=document.getElementsByTagName("a");
len=anchors.length;
$v.numCreatives=0;
for(var j=0;j<len;j++){
	if((s=anchors[j].href.split("?")[1])!=null){  //here we look for the wave id and account id
		if(s.length>3){//alert(s);
			$v.Q={};
			for(var a=s.split("&"),i=0,l=a.length;i<l;i++){
				var p=a[i].indexOf("=");//alert(a[i]);
				if(p>0) $v.Q[a[i].substring(0,p)]=unescape(a[i].substring(p+1));
			}
			for(var n in $v.Q){//alert(n);
				if(n=="tcva" && !$v.accountId)$v.accountId=$v.Q[n];
				else if(n=="wvd" && !$v.waveId)$v.waveId=$v.Q[n];			
			}
			$v.Q=null;
		}
	}
	/*
	else if(s=anchors[j].href.toLowerCase().indexOf("javascript:")!=-1){ //Here we look for the creatives
		var rX=/\d{1,}/;
		var m=rX.exec(anchors[j].href);
		if(m){
			$v.numCreatives++;
			$v['c'+$v.numCreatives]=m;			
		}
	}
	*/
}
var form = document.getElementById('mainform');
if(form){
	var children=form.childNodes;
	var len=children.length;
	var _Ts=[];
	var len=children.length;
	for(var i=0;i<len;i++){
		if(children[i].className!=null && children[i].className=="matrixTable")_Ts.push(children[i]);				
	}			
	if((len=_Ts.length)>0){
		//alert(len);
		for(var i=0;i<len;i++){
			var trs=_Ts[i].getElementsByTagName("tr");
			lenTR=trs.length;
			//alert(lenTR);
			for(var j=0;j<lenTR;j++){
				var tds=trs[j].getElementsByTagName("td");
				lenTD=tds.length;
				//alert(lenTD);
				var newIndex=null;
				for(var k=0;k<lenTD;k++){
					if(tds[k].getElementsByTagName("a").length>0){
						if(newIndex==null){
							var rX=/\d{1,}/;
							var m=rX.exec(tds[k].getElementsByTagName("a")[0].href);
							//alert(m+"-"+tds[k].getElementsByTagName("a")[0].href);
							if(m){
								newIndex="Creative_"+m;
								$v.CREATIVE_KEY[newIndex]=[];	
								//alert("newIndex is "+newIndex);
							}					
						}
						else {
							$v.CREATIVE_KEY[newIndex].push(tds[k].innerHTML);						
						}
					}
					else if(tds[k].className=="valueName"){
						if(newIndex==null){
							newIndex=tds[k].innerHTML;
							$v.CREATIVE_KEY[newIndex]=[];	
							//alert("newIndex is "+newIndex);						
						}
						else {
							$v.CREATIVE_KEY[newIndex].push(tds[k].innerHTML);
						}					
					}		
					else if(tds[k].className=="variableName"){
						if(newIndex==null){
							newIndex=tds[k].innerHTML;
							$v.CREATIVE_KEY[newIndex]=[];	
							//alert("newIndex is "+newIndex);						
						}
						else {
							$v.CREATIVE_KEY[newIndex].push(tds[k].innerHTML);
						}					
					}		
				}						
			}						
		}
	}		
}		
$v.numCreatives=null;
spans=document.getElementsByTagName("span");
if(spans[0]!=null){	
	$v.accNm=spans[0].innerHTML;
}
obj=document.getElementById("crumbMenu");
if(obj){
	anchors=obj.getElementsByTagName("a");
	len=anchors.length;
	list='';
	for(var j=0;j<len;j++){
		if(list!='')list+=">>"+anchors[j].innerHTML;
		else list+=anchors[j].innerHTML;	
	}
	$v.brdCrmb=list;
}

list='';
var q='';
for(var n in $v){
	if(typeof($v[n])=="object"){
		for(var m in $v[n]){
			list+="\n"+n+":"+m+" has the value "+$v[n][m];
			if($v[n][m]!=null && $v[n][m]!=""){
				q+=(q.length>0?"&":"?")+n+":"+m+"="+escape($v[n][m]);
				q=q.replace("CREATIVE_KEY:Creative_","_");
				q=q.replace("CREATIVE_KEY:Creative","key");
			}
		}
	}
	else {
		list+="\n"+n+" has the value "+$v[n];
		if($v[n]!=null && $v[n]!="")q+=(q.length>0?"&":"?")+n+"="+escape($v[n]);	
	}
}
//alert(list);
//alert(q);

if(q!=""){
	var dl=document.location.toString().toLowerCase();
	//console.log(dl);
	if(dl.indexOf("optimost.com")!=-1)window.open("https://by.essl.optimost.com/by/trial/2/p/qatool.31e/1052/content.html"+q);
	else if(dl.indexOf("marketinghub.hp.com")!=-1) window.open("https://secure.marketinghub.hp.com/by/trial/1633/p/qatool/4/content.html"+q);
	else if(dl.indexOf("dmh.autonomycloud.com")!=-1) window.open("https://secure.dmh.autonomycloud.com/by/trial/1633/p/qatool/4/content.html"+q);
}
