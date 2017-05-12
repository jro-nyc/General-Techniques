<script>
// comment: "If possible, display all shipping costs to two decimal places"
// yes, it is possible, here:
 var Sels = document.getElementsByTagName("select");	// get all the select tags
 var Ops = Sels[Sels.length - 1].getElementsByTagName("option");	// take the options from the last select tag on the page
 alert(Ops);
 for(var i = 0;i < Ops.length;i++)
 {
  var myPattern = /(^.*?)(\$\d+\.\d{2}$)/i;	// money at the end
  var myPattern2 = /(^.*?)(\$\d+\.\d{2}).*?$/i;	// money is supposed to be at the end (this one cuts after the second cents digit)
 
  var myBad = new Array();	// these are common mistakes or money formats that aren't compatible
  myBad[0] = /(^.*?)(\$\d+\.\d$)/;	// only one cents digit
  myBad[1] = /(^.*?)(\$\d+\.\d{2}).*?$/;	// too many cents digits or crap after the change
  myBad[2] = /(^.*?)(\$\d+\.$)/;	// no cents digits but the decimal point is intact
  myBad[3] = /(^.*?)(\$\d+$)/;	// no cents, no decimal point

  if(Ops[i].text.search(myPattern) == -1)
  {
   var result = myBad[0].exec(Ops[i].text);
   if(result != null)
    Ops[i].text = result[1] + result[2] + "0";
   var result = myBad[1].exec(Ops[i].text);
   if(result != null)
    Ops[i].text = result[1] + result[2];
   var result = myBad[2].exec(Ops[i].text);
   if(result != null)
    Ops[i].text = result[1] + result[2] + "00";
   var result = myBad[3].exec(Ops[i].text);
   if(result != null)
    Ops[i].text = result[1] + result[2] + ".00";
   result = null;
  }
 }
</script>