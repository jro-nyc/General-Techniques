<?php
/************************************************************************/
/* PHP Directory List: A better looking take on a directory index.      */
/* ============================================                         */
/*                                                                      */
/* Original Code By: hendrik.wermer@gmx.de - taken from:                */
/* http://us2.php.net/function.opendir                                  */
/*                                                                      */
/* Code added and edited by: Tony Virelli & John Hass                   */
/* We add the ability to download from within a directory and added     */
/* CSS for looks.                                                       */
/*                                                                      */
/* This program is free software. You can redistribute it and/or modify */
/* it under the terms of the GNU General Public License as published by */
/* the Free Software Foundation; either version 2 of the License.       */
/************************************************************************/
?>

<style>
/* You can change the way this page looks by editing this CSS information. */
/* For more information on CSS visit: http://www.w3schools.com/css/default.asp */
body{
	background-color:#EDF4FE;
}

tr,td{
	font-family:Tahoma;
	font-size:16px;
}

.tableBorder{
	border:2px solid #CCCCCC;
}

.dfBGColor{
	background-color:#99CCFF
}

.padding{
	padding-left:12;
}

.pageTitle{
	font-size:24px;
	font-weight: bold;
	color:#000000;
	text-shadow:#999999;
}

.dirLink{
	font-weight: bold;
	text-transform:uppercase;
}

a:link {
	color: #000000;
}
a:visited {
	color: #000000;
}
a:hover {
	color: #000000;
}
a:active {
	color: #000000;
}
</style>

<?php
//The tile of your page
$title = "Optimost JavaScript Code Repository";

// $GLOBALS is defining the root directory. This is the full path to your files.
$GLOBALS['texttoreplace'] = "/usr/share";
// show directory content
function showDir($dir, $i, $maxDepth){
$texttoreplace = $GLOBALS['texttoreplace'];
   $i++;
   if($checkDir = opendir($dir)){
       $cDir = 0;
       $cFile = 0;
       // check all files in $dir, add to array listDir or listFile
       while($file = readdir($checkDir)){
           if($file != "." && $file != ".."){
               if(is_dir($dir . "/" . $file)){
                   $listDir[$cDir] = $file;
                   $cDir++;
               }
               else{
                   $listFile[$cFile] = $file;
                   $cFile++;
               }
           }
       }
      
       // show directories
       if(count($listDir) > 0){
           sort($listDir);
           for($j = 0; $j < count($listDir); $j++){
               echo "
               <tr>";
                   $spacer = "";
                   for($l = 0; $l < $i; $l++) $spacer .= "&emsp;";
                   // create link
                   $link = "<a href=\"" . $_SERVER["PHP_SELF"] . "?dir=" . $dir . "/" . $listDir[$j] . "\">$listDir[$j]</a>";
                   echo "<td class=\"dirLink\">Directory: " . $spacer . $link . "</td>
               </tr>";
               // list all subdirectories up to maxDepth
               if($i < $maxDepth) showDir($dir . "/" . $listDir[$j], $i, $maxDepth);
           }
       }
      
       // show files
       if(count($listFile) > 0){
           sort($listFile);
           for($k = 0; $k < count($listFile); $k++){
               $spacer = "";
               for($l = 0; $l < $i; $l++) $spacer .= "&emsp;";
               $root = $_GET['dir'];
			   if(!isset($root)){
			  echo "
               <tr>
                   <td class=\"padding\"><a href=\"$listFile[$k]\">" . $spacer . $listFile[$k] . "</a></td>
               </tr>";
			   }else{
				$root = str_replace($texttoreplace,"",$root);
				echo "
               <tr>
                   <td class=\"padding\"><a href=\"$root/$listFile[$k]\">" . $spacer . $listFile[$k] . "</a></td> 
				   <tr>";
				   }  
           }
       }       
       closedir($checkDir);
   }
}

if($_GET["dir"] == "" || !is_dir($_GET["dir"])) $dir = getcwd();
else $dir = $_GET["dir"];
// replace backslashes, not necessary, but better to look at
$dir = str_replace("\\", "/", $dir);

// show parent path
$pDir = pathinfo($dir);
$parentDir = $pDir["dirname"];

// Display directory content
echo"<span class=\"pageTitle\">$title</span>
<table class=\"tableBorder\" cellspacing=0 cellpadding=2>
<tr class=\"dfBGColor\">";

// specifies the maxDepth of included subdirectories
// set maxDepth to 0 if u want to display the current directory
$maxDepth = 0;
showDir($dir, -1, $maxDepth); 

?>