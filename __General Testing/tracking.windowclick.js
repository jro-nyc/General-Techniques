//[START] Adding tracking for an event on a node that DOES NOT exist on page load
//[START] We do this by adding an onclick on the document object and seeing if the node clicked is the one we are interested in
//[START] This is on the document, not window, because IE8 and below because click does not fire on the window, instead on the document
//[START] In this instance, we are looking for an email button from a form that is brought in via AJAX
$opt={};
$opt.imgArray=[];
$opt.addEvent=function(el,evt,func,bubble){
               if(!el || typeof(func) !="function"){return false;}
               bubble = bubble || false;
               var evtType=(window.attachEvent)?"attach":(window.addEventListener)? "add":"none";
               if(evtType == "attach"){el.attachEvent("on"+evt,func);}
               else if(evtType == "add"){el.addEventListener(evt,func,bubble);}
}
$opt.windowClickEmailEventFinder=function(evt){console.log("click  "+evt);
               evtX=(evt["srcElement"]?evt["srcElement"]:evt["target"]);
               console.log("This is a "+evtX.tagName);
               if(evtX.tagName.toLowerCase()=="input" && evtX.value=="EMAIL"){           console.log(" and has a value of "+evtX.value);
                              $opt.newWindowClickCounter(6);                            
               }
}
$opt.addEvent(document,"click",$opt.windowClickEmailEventFinder);