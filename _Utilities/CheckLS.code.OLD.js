javascript:var lstore = window.localStorage,n, str = "", strg="",stri="",strs="-------------------------\n",dbKey = "_optimost",dbStr = lstore.getItem(dbKey),db = {};if (dbStr) {try {db = JSON.parse(dbStr)} catch (ex) {console.log("WARNING: failure parsing optimost localStorage", ex)}for (n in db)if (db[n].expireMs) {var d = new Date;d.setTime(db[n].expireMs);if(n.indexOf("liid")!=-1)stri += db[n].key + " has an expiration of " + d + " || " + db[n].value + "\n";else strg += db[n].key + " has an expiration of " + d + " || " + db[n].value + "\n";}};window.open("","checkLS","width=1200,height=600,scrollbars=yes").document.write("<html><head></head><body>"+stri.replace(/\n/g,"<br/>")+strs.replace(/\n/g,"<br/>")+strg.replace(/\n/g,"<br/>")+"[END][END][END][END][END][END][END][END][END][END]<BR/><BR/>"+"</body>");console.log(stri+strs+strg);