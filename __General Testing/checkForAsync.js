//Finding if tags are loading synchronously
var $optYZ={},i,len,loadType='', tmp, _dmn=/\.marketinghub\.(hp\.com|opentext\.com)/;
$optYZ.scrs=document.getElementsByTagName("script")
for(i=0,len=$optYZ.scrs.length;i<len;i+=1){
	if(!!_dmn.exec($optYZ.scrs[i].src)){
		tmp=$optYZ.scrs[i].src+":"+i+":"+$optYZ.scrs[i].async+"|";
		loadType+=($optYZ.scrs[i].async===null||$optYZ.scrs[i].async===false?tmp+' is false':tmp+' is true')+'\n';
	}
}
console.log(loadType)