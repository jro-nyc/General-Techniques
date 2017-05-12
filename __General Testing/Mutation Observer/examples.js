//Simple
(function(win) {
	var MutationObserver = win.MutationObserver || win.WebKitMutationObserver, token="modify-link";

	var observer = new MutationObserver(function(mutations){
		for (var i=0; i < mutations.length; i++){
			for (var j=0; j < mutations[i].addedNodes.length; j++){
				checkNode(mutations[i].addedNodes[j]);
			}
		}
	});

	observer.observe(document.documentElement, {
		childList: true,
		attributes: true,
		subtree: true
	});

	checkNode = function(addedNode) {
	  if (addedNode.nodeType === 1){
		//console.log("this node is a "+addedNode.tagName+" with class of "+addedNode.className);
		if(addedNode.className.indexOf(token)!=-1){
			//console.log("this node is a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):""));
			console.log("this node is a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+
			(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):
			(!!addedNode.id?" an id of \""+addedNode.id+"\"":"")));
		}
	  }
	}

    //win.waitForElement = waitForElement;
    //win.activateOnDOMMutation = activateOnDOMMutation;

})(this);

//Simple PLUS
(function(win) {
	optg[currentWave].DOMmutationStuff=function(nodeToFind){ 
		var win=window;
		var MutationObserver = win.MutationObserver || win.WebKitMutationObserver, 
			currentWave = "opt{{$creative.waveId}}";

		var observer = new MutationObserver(function(mutations){
			for (var i=0; i < mutations.length; i++){
				for (var j=0; j < mutations[i].addedNodes.length; j++){
					checkNode(mutations[i].addedNodes[j]);
				}
			}
		});

		observer.observe(document.documentElement, {
			childList: true,
			attributes: true,
			subtree: true
		});

		checkNode = function(addedNode, nodeToFind) {
			if (addedNode.nodeType === 1){
				//console.log("this node is a "+addedNode.tagName+" with class of "+addedNode.className);
				for(var n in nodeToFind){
					if(addedNode[n].indexOf(nodeToFind[n])!=-1){
						//if(addedNode.className.indexOf(token)!=-1){
						console.log("this node is a "+addedNode.tagName+(!!addedNode.className?" with class of \""+addedNode.className+"\""+
						(!!addedNode.id?(!!addedNode.className?" and ":" with ")+" an id of \""+addedNode.id+"\"":""):
						(!!addedNode.id?" an id of \""+addedNode.id+"\"":"")));

					}
				}

			}
		}
    }
})(this);




function waitForAddedNode(params) {
    new MutationObserver(function(mutations) {
		var el;
		if(!!params.className){
			el = document.getElementsByClassName (params.className);
		}
		
        else if(params.id) el = document.getElementById(params.id);
        if (el) {
            this.disconnect();
            params.done(el);
        }
    }).observe(params.parent || document, {
        subtree: !!params.recursive,
        childList: true,
    });
}
waitForAddedNode({
    id: 'message',
	className: '',
	contains:true,
    parent: document,
    recursive: false,
    done: function(el) {
		console.log("this node is a "+el.tagName+(!!el.className?" with class of \""+el.className+"\""+(!!el.id?(!!el.className?" and ":" with ")+" an id of \""+el.id+"\"":""):""));
    }
});