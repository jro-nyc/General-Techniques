var colores = ["#aaffaa","#bbff99","#ccff88","#ddff77","#eeff66","#ffff55","#aaffbb","#99ffcc",
				"#99ffdd","#99ffee","#66ffff","#55eeaa","#aaddaa","#99ccaa","#88bbaa","#77aaaa"];
var NUMWORDS;		//The TOTAL number of vocabulary words, gotten from the findArraySize function
var NUMQUESTIONS = 8;	//The number of words to be tested
var ingles = ['talk','eat','want','teacher','yes','I/me','you','good','same/also','study','on/at/near','see','name','thanks','no/not','very','all/both','busy','cold','wind','they/them','old','really','dog','cat','big','small','book','that','this','tired','people','expensive','call','how','newspaper','women','scholar','morning','evening','clock','teach','short','think','like/enjoy','more','most','some','tall','arrive','leg','men','understand','help','lead to','please','close/shut','day','vehicle','nose','song','pray','remain','go(to place)','correct','please tell me','country','new','battle','to enter','house'];   
var chino =  ['shuo','chi','yào','shi'     ,'shì','wô'  ,'Nî' ,'hâo' ,'tóng'     ,'xúe'  ,'zài'      ,'jìan','míng','xìe'   ,'bù'    ,'hên' ,'dou'     ,'máng','lêng','feng','tamen'    ,'lâo','zhen'  ,'gôu','mao','dà' ,'xiâo' ,'shu' ,'nà' ,'zhè','lèi(la)','rén'   ,'gùi'      ,'jiào','zên','bào'      ,'nûrén','xuézhe','zâoshàng','wânshàng','zhong','jiao','âi'   ,'xiâng','xîhuan'  ,'gèng','zùi' ,'yôu de','gao' ,'dao' ,'tui','nánrén','dông'     ,'bang','yînqî'  ,'qîng'  ,'guan'     ,'tian','che'   ,'bî zi','ger','qí dâo','líu'  ,'wâng'        ,'gâi'    ,'qîn wèn'       ,'guójia' ,'xin','zhàn'  ,'rù'    ,'fáng zi'];	//aáâà iíîì eéêè oóôò úûù 
var inglesChino = [
['talk','shuo'],
['eat','chi'],
['want','yào'],
['teacher','shi'],
['yes','shì'],
['I/me','wô'],
['you','Nî'],
['good','hâo'],
['same/also','tóng'],
['study','xúe'],
['on/at/near','zài'],
['see','jìan'],
['name','míng zi'],
['thanks','xìe'],
['no/not','bù'],
['very','hên'],
['all/both','dou'],
['busy','máng'],
['cold','lêng'],
['wind','feng'],
['they/them','tamen'],
['old','lâo'],
['really','zhen'],
['dog','gôu'],
['cat','mao'],
['big','dà'],
['small','xiâo'],
['book','shu'],
['that','nà'],
['this','zhè'],
['tired','lèi(la)'],
['people','rén'],
['expensive','gùi'],
['call','jiào'],
['how','zên'],
['newspaper','bào'],
['women','nûrén'],
['scholar','xuézhe'],
['morning','zâoshàng'],
['evening','wânshàng'],
['clock','zhong'],
['teach','jiao'],
['short','âi'],
['think','xiâng'],
['like/enjoy','xîhuan'],
['more','gèng'],
['most','zùi'],
['some','yôu de'],
['tall','gao'],
['arrive','dao'],
['leg','tui'],
['men','nánrén'],
['understand','dông'],
['help','bang'],
['lead to','yînqî'],
['please','qîng'],
['close/shut','guan'],
['day','tian'],
['vehicle','che'],
['nose','bî zi'],
['song','ger'],
['pray','qí dâo'],
['remain','líu'],
['go(to place)','wâng'],
['correct','gâi'],
['please tell me','qîn wèn'],
['country','guójia'],
['new','xin'],
['battle','zhàn'],
['to enter','rù'],
['house','fáng zi']  
					];	//aáâà iíîì eéêè oóôò úûù 
var numWords=inglesChino.length;
var numChino=chino.length;
var numingles=ingles.length;

function findArraySize(){
var i=0;
	do{
		i+=1;
	}while (chino[i])
	alert(i);
	return(i);
	
}

//áâà
//íîì
//éêè
//óôò
//úûù