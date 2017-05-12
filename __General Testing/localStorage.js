if(window && window.localStorage){
    var list='';
    //for(var i=0,len=window.localStorage.length;i<len;i++){
    for(var i=window.localStorage.length-1;i>-1;i--){
        list+=i+"="+window.localStorage.getItem(i);
        window.localStorage.removeItem(i);  
    }
    alert(list);
    if(optimost && optimost.C){
        for(var n  in optimost.C){
            if(n.substring(0,2)=="op"){
                //window.localStorage.setItem(n)=optimost.C[n];        
                window.localStorage[n]=optimost.C[n];
            }
        }
    }
}

if(window && window.localStorage){
    var list='';    
    for(var n in window.localStorage){
        list+=n+"="+window.localStorage[n]+"\n";
    }
    alert(list);
}
else alert("window.localStorage is "+window.localStorage)


if(window && window.localStorage){
    var list='';    
    for(var n in window.localStorage){
        list+=n+"="+window.localStorage[n]+"\n";
        //window.localStorage[n]=null;  
        //window.localStorage.removeItem(n);  
    }
    alert(list);
    if(optimost && optimost.C){
        for(var n  in optimost.C){
            if(n.substring(0,2)=="op"){
                //window.localStorage.setItem(n)=optimost.C[n];        
                if(window.localStorage[n]==null)window.localStorage[n]=optimost.C[n];
            }
        }
    }
}
