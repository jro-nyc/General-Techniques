/*
	BEGIN
	https://www.marketinghub.opentext.com/js/report.js
*/

function ReportGetContext(oForm, aExclusionList)
{
	var oValues = new Object;
	
	if (typeof(aExclusionList) == 'undefined')
		aExclusionList = [];
	else for (var j=0; j < aExclusionList.length; j++)
		aExclusionList[j] = aExclusionList[j].toLowerCase();

	if (oForm == null)
		oForm = document.getElementById('reportctx');
	
	if (oForm == null)
		return oValues;

	var a = oForm.getElementsByTagName('*');
	for (var i=0; i < a.length; i++)
	{
		if ((a[i].tagName.toLowerCase() == 'input') && (a[i].type.toLowerCase() == 'hidden'))
		{
			if (a[i].name == 'iemodal')
				continue; // do not pass along
			if (a[i].name == 'yuimodal')
				continue; // do not pass along
			if (a[i].name == 'csrf_token')
				continue; // do not pass along
			
			// Determine if tag is excluded
			for (var j=0, bExcluded=false; !bExcluded && j < aExclusionList.length; j++)
				bExcluded = (aExclusionList[j] == a[i].name.toLowerCase());
			
			if (!bExcluded)
				oValues[a[i].name] = a[i].value;
		}
	}
	
	// Let reportsid dictate report name
	if (oValues['reportsid'] != null)
		oValues['report'] = null;
	
	return oValues;
}

function ReportBuildQuery(oValues)
{
	var url = '';

	for (i in oValues)
		if (oValues[i] != null)
			url += ((url.length > 0) ? '&' : '') + i + '=' + encodeURIComponent(oValues[i]);
	
	return url;
}

function ReportSortBy(field)
{
	var oParams = ReportGetContext(null);
	oParams['sortfield'] = field;
	ReportRefresh(oParams);
}

function ReportRefresh(oParams)
{
	if (oParams == null)
		oParams = ReportGetContext(null);

	ReportNavigate('/report-render-ia.phtml?' + ReportBuildQuery(oParams), true);
}

function ReportNavigate(url, bReplace, bOpenSeparateWindow)
{
    if(bOpenSeparateWindow) {
        var optimostReportWindow;
        if(!optimostReportWindow || !optimostReportWindow.closed) {
            optimostReportWindow = window.open(url, "optimost_report_window_from_console", "menubar=1,resizable=1,width=1024,height=768,location=1");
        }
        else {
            optimostReportWindow.location = url;
        }
        optimostReportWindow.focus();
    }
	else if (bReplace)
		LocationReplaceUrl(url, window);
	else
		LocationRedirectUrl(url, window);
}

function ReportPrint()
{
	var url = '/report-render-print.phtml?' + ReportBuildQuery(ReportGetContext(null));
	window.open(url, 'PrintReportWindow', 'channelmode=0,directories=0,fullscreen=0,location=0,menubar=1,toolbar=0,status=0,scrollbars=1,resizable=1');
}

function ReportDownload()
{
	LocationRedirectUrl('/report-render-csv.phtml?' + ReportBuildQuery(ReportGetContext(null)), window);
}

function ReportOpenSpreadsheet()
{
	var url = '/report-render-csv.phtml?' + ReportBuildQuery(ReportGetContext(null));
	window.open(url, 'ExcelSpreadsheetWindow', 'channelmode=0,directories=0,fullscreen=0,location=0,menubar=1,toolbar=0,status=0,scrollbars=1,resizable=1');
}

function ReportCustomize()
{
    var fnConfirm = function(returnVal)
	{
		ReportRefresh(null);
    };

	var url = '/report-customize-d.phtml?' + ReportBuildQuery(ReportGetContext(null));
	
    openYuiDialog(url, 500, 290, fnConfirm);
}

function ReportFavoriteAdd()
{
    var fnConfirm = function(favoriteId)
	{
		var oParams = ReportGetContext(null);
		oParams['reportsid'] = null; // let favorite dictate report
		oParams['favoriteid'] = favoriteId;
		ReportRefresh(oParams);
    };

	var url = '/report-favorite-add-d.phtml?' + ReportBuildQuery(ReportGetContext(null));
	
    openYuiDialog(url, 325, 125, fnConfirm);
}

function ReportFavoriteSave(favoriteId)
{
	var image = new Image(1, 1);
	image.src = '/report-favorite-save.php?' + ReportBuildQuery(ReportGetContext(null));
	alert('Changes to this Favorite have been saved.');
}

function ReportFavoriteOrganize()
{
    var fnConfirm = function(returnVal)
	{
		var oParams = ReportGetContext(null);
		if (oParams['reportsid'] == null)
			window.location.reload(true); // user is not viewing a report
		else
			ReportRefresh(null);
    };

	var url = '/report-favorite-organize-d.phtml?' + ReportBuildQuery(ReportGetContext(null));
	
    openYuiDialog(url, 500, 160, fnConfirm);
}
/*
	END
	https://www.marketinghub.opentext.com/js/report.js
*/


document.write([
//'<link href="https://fonts.googleapis.com/css?family=Lato:300" rel="stylesheet" type="text/css">',
'<style>',
'/* latin-ext */',
'@font-face {',
'  font-family: \'Lato\';',
'  font-style: normal;',
'  font-weight: 300;',
'  src: local(\'Lato Light\'), local(\'Lato-Light\'), url(https://fonts.gstatic.com/s/lato/v13/dPJ5r9gl3kK6ijoeP1IRsvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');',
'  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;',
'}',
'/* latin */',
'@font-face {',
'  font-family: \'Lato\';',
'  font-style: normal;',
'  font-weight: 300;',
'  src: local(\'Lato Light\'), local(\'Lato-Light\'), url(https://fonts.gstatic.com/s/lato/v13/EsvMC5un3kjyUhB9ZEPPwg.woff2) format(\'woff2\');',
'  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;',
'}',
'#barchart_div *, #table_div *{font-family:\'Lato\' !important;}',
'<\/style>',
'<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"><\/script>',
''].join(""));






function doCreative(){
	
var d_creative = document.createElement("div");
d_creative.id="op_creative";
document.body.appendChild(d_creative);

var d_bar = document.createElement("div");
d_bar.id="barchart_div";
d_creative.appendChild(d_bar);

var br = document.createElement("br");
d_creative.appendChild(br);

var br = document.createElement("br");
d_creative.appendChild(br);



var d_table = document.createElement("div");
d_table.id="table_div";
d_creative.appendChild(d_table);

google.charts.load('current', {'packages':['bar', 'table']});
      google.charts.setOnLoadCallback(drawBarChart);

      function drawBarChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350]
        ]);

        var options = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          bars: 'horizontal' // Required for Material Bar Charts.
        };

        var chart = new google.charts.Bar(document.getElementById('barchart_div'));

        chart.draw(data, options);
      }
	  
	  


     //google.charts.load('current', {'packages':['table']});
	 //google.charts.load('visualization', '1.0', {'packages':['table']});

     google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time Employee');
        data.addRows([
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '1024px', height: '500px'});
      }
}
	  
	  

document.addEventListener("DOMContentLoaded", function(){
	if(document.location.href.indexOf("report=wave-summary") > -1){
		doCreative();
	}
});