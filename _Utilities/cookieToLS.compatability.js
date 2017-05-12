// -- This code goes in AUGMENT LOAD LIST -- This code goes in AUGMENT LOAD LIST -- This code goes in AUGMENT LOAD LIST -- This code goes in AUGMENT LOAD LIST 
			//[START][START][START][START][START][START][START][START][START] 
			//13 April - Testing new release local Storage issues, trying to make it backward-compatible with cookie stuff
			//13 April - So we can "drop cookies" and "read cookies" using optimost functionality but actually do it in localStorage behind the scenes
				if (!!document.cookie.match(/(^|;)\s*oplsmode\=true/))optimost.config.storageMode = "local";    //Set storage mode to localStorage
				//else optimost.config.storageMode="cookie"; //Else, use cookies
				if(optimost.config.storageMode === "local"){
					utils.log('In localStorage mode, so we need to add backward compatability functionality');
					optimost.I=function() {
						var s = optimost.L.search;
						var c = optimost.D.cookie;
						if (s.length > 3) {
							for (var a = s.substring(1).split("&"), i = 0, l = a.length; i < l; i++) {
								var p = a[i].indexOf("=");
								if (p > 0) optimost.Q[a[i].substring(0, p)] = unescape(a[i].substring(p + 1));
							}
						}
						if (c.length > 3) {
							for (var a = c.split(";"), i = 0, b = a.length; i < b; i++) {
								var v = a[i].split("=");
								while (v[0].substring(0,1) == " ") v[0] = v[0].substring(1, v[0].length);
								if (v.length == 2) optimost.C[v[0]] = unescape(v[1]);
							}
						}
						optimost.storage.keys().forEach(
							function(key) {
								optimost.C[key] = optimost.storage.getItem( key );
							}
						);
					}
					optimost.SC=function(n, v, e, d) {
						optimost.storage.setItem(n, v, e, "/", d, false)

					}
					optimost.storage.keys().forEach(
						function(key) {
							optimost.C[key] = optimost.storage.getItem( key );
						}
					);					
				}
			//[END][END][END][END][END][END][END][END][END][END][END][END][END]		
								