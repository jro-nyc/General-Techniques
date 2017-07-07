(function(global){
	window.optimost=window.optimost||{};
	var currentWave="opt123456";
	window.optg={};
	
	optimost.avisMutationObservers={//Hook added to allow AVIS's templates to call teh Mutation Observer to call us in the beginning.  21 Feb 2017
		func:{}
	};
	var dmh = global.dmh||{}, runtime=dmh.runtime||{}, tracker=dmh.tracker||{},
	fileVersion="1.01",
	utils = {
		log:function(s){
			if(typeof(console) == "object" && console.log){
				if(global.location && global.location.href.match( /debug=/ ))console.log(s);
				else if (document.cookie.match(/(^|;)\s*opdebug\=true/))console.log(s);
			}
		},
		DOMmutationStuff:function(){ 
			utils.log("in utils.DOMmutationStuff with this.DOMmutationStuffCalled="+this.DOMmutationStuffCalled);
			if(this.DOMmutationStuffCalled)return;
			this.DOMmutationStuffCalled=true;
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
			var observer = new MutationObserver(function(mutations){ 
				var found=false,i,j,nameOfMatch,childSeats, num=0,list='';
				//29 March 2017 [START] -- Noticed that mutation observer triggering but no added nodes on Step3, so don't trigger on those
				for (i=0; i < mutations.length; i++){
					if(mutations[i].addedNodes.length)found=true;
				}
				if(!found){//console.log('There are no added nodes, exit');
					return;
				}		
				//29 March 2017 [END] -- 					
				for(var n in optimost.avisMutationObservers.func){
					if(typeof(optimost.avisMutationObservers.func[n])==="function"){
						optimost.avisMutationObservers.func[n](mutations);
						num+=1;
						list+='Calling function "optimost.avisMutationObservers.func[\''+n+'\']"\n';
					}
				}
				utils.log("+_+_+_+_+"+list);
			});
			observer.observe(document.documentElement, {
				childList: true,
				attributes: true,
				subtree: true
			});
			
		},
		DOMmutationStuffCalled:false				
	};

	runtime = (dmh.runtime = optimost);
	runtime.helperUtils = utils;	
	
	window.optg[currentWave]={};
	optg[currentWave].mutationEvents=[];
	optg[currentWave].log=function(str){
		optimost.helperUtils.log(str);			
	}
	optg[currentWave].mutationProcessor=function(mutations){ 
		var justTarget=[],justAdd=[],justRemove=[],both=[];
		for (i=0; i < mutations.length; i++){
			var tmp={},found=false;
			tmp.target={};
			if(mutations[i].addedNodes.length&&mutations[i].removedNodes.length){
				if(!!mutations[i].target.id)tmp.target.id=mutations[i].target.id;
				if(!!mutations[i].target.className)tmp.target.className=mutations[i].target.className;
				tmp.target.tagName=mutations[i].target.tagName;
				tmp.addedNodes=mutations[i].addedNodes;
				tmp.removedNodes=mutations[i].removedNodes;
				both.push(tmp);
				found=true;
			}
			else if(mutations[i].addedNodes.length){
				if(!!mutations[i].target.id)tmp.target.id=mutations[i].target.id;
				if(!!mutations[i].target.className)tmp.target.className=mutations[i].target.className;
				tmp.target.tagName=mutations[i].target.tagName;
				tmp.addedNodes=mutations[i].addedNodes;
				justAdd.push(tmp)
				found=true;
			}		
			else if(mutations[i].removedNodes.length){
				if(!!mutations[i].target.id)tmp.target.id=mutations[i].target.id;
				if(!!mutations[i].target.className)tmp.target.className=mutations[i].target.className;
				tmp.target.tagName=mutations[i].target.tagName;
				tmp.removedNodes=mutations[i].removedNodes;
				justRemove.push(tmp)
				found=true;
			}	
			else {
				if(!!mutations[i].target.id)tmp.target.id=mutations[i].target.id;
				if(!!mutations[i].target.className)tmp.target.className=mutations[i].target.className;
				tmp.target.tagName=mutations[i].target.tagName;
				justTarget.push(tmp)
				found=true;
			}				
			
		}	
		optg[currentWave].mutationEvents.push({"justTarget":justTarget,"justAdd":justAdd,"justRemove":justRemove,"both":both})
	}
	optg[currentWave].mutationSearch=function(nodesToFind){ 
		var i, j, k, l, m, n, len, len2, len3, len4, mutationList, currentWave="opt123456", found=false, nodesFound=[], nodeX, tarVal;
		mutationList=optg[currentWave].mutationEvents;
		for (i=0,len=mutationList.length;i<len; i++){
			for(m in mutationList[i]){
				for (j=0,len2=mutationList[i][m].length;j<len2;j++){
					found=false;
					debugger;
					for (k=0,len3=nodesToFind.length;k<len3; k++){
						for(n in nodesToFind[k]){
							tarVal=(mutationList[i][m][j].target&&mutationList[i][m][j].target[n]?mutationList[i][m][j].target[n]:'');
							console.log('comparing '+tarVal+' to:'+nodesToFind[k][n]);
							if(tarVal.indexOf(nodesToFind[k][n])!==-1){
								if(!found)nodesFound.push(mutationList[i][m][j]);
								found=true;
							}							
							if(!found){						
								for (l=0,len4=mutationList[i][m][j].length;l<len4; l++){
									tarVal=(mutationList[i][m][j][l][n]?mutationList[i][m][j][l][n]:'');
									console.log('Extra level, comparing '+tarVal+' to:'+nodesToFind[k][n]);
									if(tarVal.indexOf(nodesToFind[k][n])!==-1){
										if(!found)nodesFound.push(mutationList[i][m][j]);
										found=true;
									}												
								}
							}
						}
					}
				}
			}
			//optg[currentWave].mutationEvents
		}
		optg[currentWave].foundNodeList=nodesFound;
	}
	optg[currentWave].DOMmutationStuff=function(){ 
		var win=window, currentWave = "opt123456", subjectShortName="{{$creative.subjectShortName}}",
			nodeToFind=[{"className":"stepTwo-partial"}];

		optimost.avisMutationObservers.func[subjectShortName] = function(mutations) {
			var found=false,i,j,nameOfMatch,childSeats, _lh="#/vehicles|#/extras";
			//if(_lh.indexOf(location.hash)===-1){
			//	optg[currentWave].log('NOT T3 page, exit');
			//	return;
			//}
			optg[currentWave].log('In mutataion observer for:'+subjectShortName+' with '+mutations.length);
			optg[currentWave].mutationProcessor(mutations);
			console.log(mutations);
			for (i=0; i < mutations.length; i++){
				for (j=0; j < mutations[i].addedNodes.length; j++){
					nameOfMatch=checkNode(mutations[i].addedNodes[j],nodeToFind);
					found=found || !!nameOfMatch;
					if(nameOfMatch==="childSafSubCont-wrap")childSeats=true;
				}
			}
			if(found){
				optg[currentWave].log("FIRING optg[currentWave].modifyDataCalled, found node withing "+mutations.length+" node mutation event");
				optg[currentWave].modifyDataCalled(); 
			}
		}

		checkNode = function(addedNode, nodeToFind) {
			if(addedNode.nodeType === 1){
				var num=0, i, len, found=false;
				for (i=0,len=nodeToFind.length; i < len; i+=1){
					for(n in nodeToFind[i]){
						num+=1;
						//if(i===1)optg[currentWave].log('comparing '+addedNode[n]+' to '+nodeToFind[i][n]);
						if(typeof(addedNode[n])==="string"&&addedNode[n].indexOf(nodeToFind[i][n])!=-1){
							optg[currentWave].log("FOUND the node, a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+
							(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):
							(!!addedNode.id?" an id of \""+addedNode.id+"\"":"")));
							//optg[currentWave].modifyDataCalled(); 
							found=true;		
							//return found;
							return nodeToFind[i][n];						
						}
					}
					if(num===0){
						optg[currentWave].log("This node is a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+
							(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):
							(!!addedNode.id?" an id of \""+addedNode.id+"\"":"")));	
					}
				}
				return found;
			}
			else return false;
		}
	}
	optg[currentWave].modifyDataCalled=function(){
		optimost.helperUtils.log('got a match');
	}
	optimost.helperUtils.DOMmutationStuff();
	optg[currentWave].DOMmutationStuff();
			
})(this);			