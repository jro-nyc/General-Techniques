
//Look in object for name of an inside object
var finalList=[], iterations=0;
_lookForNameInObject=function(startObj,value,prevTree){
	for(var n in startObj){
		iterations+=1;
		var newTree=[];
		newTree=prevTree.concat([n]); 
		if(n.indexOf(value)!=-1){
			finalList.push(newTree)
			//finalList.push(n)
		}
		if(typeof(startObj[n])==="object"){
			_lookForNameInObject(startObj[n],value,newTree);
		}
	}
}
//_lookForNameInObject(optg.GMS,'log',[])
_lookForNameInObject(optg.GMS,'reservation',[])
for(var i=0,len=finalList.length;i<len;i+=1){
finalList[i]=finalList[i].join('.');