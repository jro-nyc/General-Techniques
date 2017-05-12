	optg[currentWave].DOMmutationStuff=function(nodeToFind){ 
		var win=window;
		var MutationObserver = win.MutationObserver || win.WebKitMutationObserver, 
			currentWave = "opt{{$creative.waveId}}";

		var observer = new MutationObserver(function(mutations){
			for (var i=0; i < mutations.length; i++){
				for (var j=0; j < mutations[i].addedNodes.length; j++){
					checkNode(mutations[i].addedNodes[j],nodeToFind);
				}
			}
		});

		observer.observe(document.documentElement, {
			childList: true,
			attributes: true,
			subtree: true
		});

		checkNode = function(addedNode, nodeToFind) {
			if(addedNode.nodeType === 1){
				var num=0;
				for(var n in nodeToFind){
					num+=1;
					if(typeof(addedNode[n])==="string"&&addedNode[n].indexOf(nodeToFind[n])!=-1){
						console.log("FIRING this node is optg[currentWave].modifyDataCalled, a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+
						(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):
						(!!addedNode.id?" an id of \""+addedNode.id+"\"":"")));
						//optg[currentWave].modifyDataCalled(); 	
					}
				}
				if(num===0){
					console.log("This node is a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+
						(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):
						(!!addedNode.id?" an id of \""+addedNode.id+"\"":"")));					
				}
			}
		}
	}

	optg[currentWave].DOMmutationStuff({"className":"stepTwo-partial"}); -- look kfor this class
	//optg[currentWave].DOMmutationStuff({}); -- show all changes