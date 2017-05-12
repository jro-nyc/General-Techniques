(function() {
    var _opti = localStorage.getItem("_optimost"),
        n, len, keyVal ={}, keyVal2 ={},  str='', generator=window.open('','LocalStorageView','height=400,width=800,status=0,menubar=0,titlebar=0,toolbar=0,scrollbars=0,channelmode=0'),
        tm, nowMs = new Date().getTime(),timeStamp = new Date(), num=0, kv;
	_opti = JSON.parse(_opti);
	if(generator.document.all.length>5){
		//generator.close();
		//generator=window.open('','LocalStorageView','height=400,width=800,status=0,menubar=0,titlebar=0,toolbar=0,scrollbars=0,channelmode=0');
	}
	var convertToTime = function(val,type){
		var tm=val/1000, days, hours, minutes;
		days=Math.floor(tm/(24*60*60)),
		hours=Math.floor(tm/(60*60)),
		minutes=Math.floor(tm/(60));
		if(type==='days'){
			var dys=days,hrs=hours-days*24;
			return dys+'d '+hrs+'h'
		}
		else if(type==='hours'){
			var hrs=hours, min=minutes-hours*60;
			return hrs+'h '+min+'m'			
		}
	}
    if (Object.keys(_opti).length) {
		if(generator.document.all.length<6){
			generator.document.write('<html><head><title>Local Storage Values</title><style>td{border:1px solid;white-space:nowrap;padding:2 5px;}</style></head>');
		}
	//_opti = JSON.parse(_opti);
        for (n in _opti) {
            tm = (_opti[n].expireMs - nowMs) / (3600000);
			//str+='<tr><td>'+_opti[n].key+'</td><td>'+_opti[n].value+'</td><td>'+tm.toFixed(2)+'h</td><td>'+(tm/24).toFixed(2)+'d</td></tr>';
            //keyVal[_opti[n].key] = _opti[n].value + '| ' + (tm/24).toFixed(2) + ' | ' + (tm / 1).toFixed(2) + '';
            keyVal[_opti[n].key] = _opti[n].value + '| ' + convertToTime((_opti[n].expireMs - nowMs),'days') + ' | ' + convertToTime((_opti[n].expireMs - nowMs),'hours') + '';
			num+=1;
        }
		var resortTables = function(obj){
			var tables=generator.document.getElementsByTagName("table"), i, len, arrs=[];
			for(i=tables.length-1;i>-1;i-=1){
				if(tables[i].id&&(!!tables[i].id.match(/\d/))){
					arrs.push(tables[i].id);
				}
			}
			arrs.sort();
			for(i=arrs.length-1;i>-1;i-=1){
				var tb=generator.document.getElementById(arrs[i]);
				if(tb)generator.document.body.appendChild(tb)
			}
			console.log('Execute, number of tables is '+arrs.length);
		}
		var sortObjectByKey = function(obj){
			var keys = [];
			var sorted_obj = {};
			for(var key in obj){
				if(obj.hasOwnProperty(key)){
					keys.push(key);
				}
			}
			keys.sort();
			jQuery.each(keys, function(i, key){
				sorted_obj[key] = obj[key];
			});
			return sorted_obj;
		};

		var keyVal2 = sortObjectByKey(keyVal)
        for (n in keyVal2) {
			kv=keyVal2[n].split('|');
			str+='<tr><td>'+n+'</td><td>'+kv[0]+'</td><td>'+kv[1]+'</td><td>'+kv[2]+'</td></tr>';
			//str+='<tr><td>'+n+'</td><td>'+kv[0]+'</td><td>'+convertToTime(kv[1],'days')+'</td><td>'+convertToTime(kv[2],'hours')+'</td></tr>';
		}
		generator.clearLS=function(){
			localStorage.removeItem("_optimost"); 
			return '';
		}
		//generator.document.write('<html><head><title>Local Storage Values</title><style>td{border:1px solid;white-space:nowrap;padding:2 5px;}</style></head><body>'+
		generator.document.write('<body>'+
		'<table id="'+nowMs+'"><tr><th colspan="4" style="border-top:3px solid #009944;">'+timeStamp+'</th></tr><tr><th>Name</th><th>Value</th><th>Days</th><th>Hours</th></tr>'+str+'<tr><th colspan="1"><a href="javascript:this.clearLS();"> Clear the Local Storage</a></th>'+
		'<th colspan="3" style="text-align:right;"><a href="javascript:self.close()">Close the popup</a></th></tr></table></body></html>');
		console.log(keyVal2);
		resortTables();
    }
	else{
		generator.document.write('<html><head><title>Local Storage Values</title><style>td{border:1px solid;white-space:nowrap;padding:2 5px;}</style></head><body>'+
		'<table><tr><td colspan="4">no optimost local storage</td></tr></table><p><a href="javascript:self.close()"> Close</a> the popup.</p>'+
		'</body></html>');		
		console.log('no optimost local storage');
	}
})();







