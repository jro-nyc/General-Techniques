window.optgXYZ={
	DOMmutationStuff:function(){ 
		console.log("in utils.DOMmutationStuff with this.DOMmutationStuffCalled="+this.DOMmutationStuffCalled);
		if(this.DOMmutationStuffCalled)return;
		this.DOMmutationStuffCalled=true;
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		var observer = new MutationObserver(function(mutations){ 
			var found=false,i,j,nameOfMatch,childSeats, num=0,list='';
			for (i=0; i < mutations.length; i++){
				if(mutations[i].addedNodes.length)found=true;
			}
			if(!found){
				console.log('There are no added nodes, exit');
				debugger;
				return;
			}
			for(var n in optimost.avisMutationObservers.func){
				if(typeof(optimost.avisMutationObservers.func[n])==="function"){
					optimost.avisMutationObservers.func[n](mutations);
					num+=1;
					list+='Calling function "optimost.avisMutationObservers.func[\''+n+'\']"\n';
				}
			}
			console.log("+_+_+_+_+"+list);
		});
		observer.observe(document.documentElement, {
			childList: true,
			attributes: true,
			subtree: true
		});
		
	},
	DOMmutationStuffCalled:false
	
}
optimost={
	avisMutationObservers:{
		func:{
			doTest:function(mutations){
				var list='', i, j;
				debugger;
				for (i=0; i < mutations.length; i++){
					for (j=0; j < mutations[i].addedNodes.length; j++){
						list+='cn='+mutations[i].addedNodes[j].className+', id='+mutations[i].addedNodes[j].id+'\n';
						
					}
				}				
				console.log(list);
			}
		}
	}
}
optgXYZ.DOMmutationStuff();