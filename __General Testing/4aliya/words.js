var colores = ["#aaffaa","#bbff99","#ccff88","#ddff77","#eeff66","#ffff55","#aaffbb","#99ffcc",
				"#99ffdd","#99ffee","#66ffff","#55eeaa","#aaddaa","#99ccaa","#88bbaa","#77aaaa"];
var NUMWORDS;		//The TOTAL number of vocabulary words, gotten from the findArraySize function
var NUMQUESTIONS = 8;	//The number of words to be tested
var ingles = ['talk','eat','want','teacher','yes','I/me','you','good','same/also','study','on/at/near','see','name','thanks','no/not','very','all/both','busy','cold','wind','they/them','old','really','dog','cat','big','small','book','that','this','tired','people','expensive','call','how','newspaper','women','scholar','morning','evening','clock','teach','short','think','like/enjoy','more','most','some','tall','arrive','leg','men','understand','help','lead to','please','close/shut','day','vehicle','nose','song','pray','remain','go(to place)','correct','please tell me','country','new','battle','to enter','house'];   
var chino =  ['shuo','chi','y�o','shi'     ,'sh�','w�'  ,'N�' ,'h�o' ,'t�ng'     ,'x�e'  ,'z�i'      ,'j�an','m�ng','x�e'   ,'b�'    ,'h�n' ,'dou'     ,'m�ng','l�ng','feng','tamen'    ,'l�o','zhen'  ,'g�u','mao','d�' ,'xi�o' ,'shu' ,'n�' ,'zh�','l�i(la)','r�n'   ,'g�i'      ,'ji�o','z�n','b�o'      ,'n�r�n','xu�zhe','z�osh�ng','w�nsh�ng','zhong','jiao','�i'   ,'xi�ng','x�huan'  ,'g�ng','z�i' ,'y�u de','gao' ,'dao' ,'tui','n�nr�n','d�ng'     ,'bang','y�nq�'  ,'q�ng'  ,'guan'     ,'tian','che'   ,'b� zi','ger','q� d�o','l�u'  ,'w�ng'        ,'g�i'    ,'q�n w�n'       ,'gu�jia' ,'xin','zh�n'  ,'r�'    ,'f�ng zi'];	//a��� i��� e��� o��� ��� 
var inglesChino = [
['talk','shuo'],
['eat','chi'],
['want','y�o'],
['teacher','shi'],
['yes','sh�'],
['I/me','w�'],
['you','N�'],
['good','h�o'],
['same/also','t�ng'],
['study','x�e'],
['on/at/near','z�i'],
['see','j�an'],
['name','m�ng zi'],
['thanks','x�e'],
['no/not','b�'],
['very','h�n'],
['all/both','dou'],
['busy','m�ng'],
['cold','l�ng'],
['wind','feng'],
['they/them','tamen'],
['old','l�o'],
['really','zhen'],
['dog','g�u'],
['cat','mao'],
['big','d�'],
['small','xi�o'],
['book','shu'],
['that','n�'],
['this','zh�'],
['tired','l�i(la)'],
['people','r�n'],
['expensive','g�i'],
['call','ji�o'],
['how','z�n'],
['newspaper','b�o'],
['women','n�r�n'],
['scholar','xu�zhe'],
['morning','z�osh�ng'],
['evening','w�nsh�ng'],
['clock','zhong'],
['teach','jiao'],
['short','�i'],
['think','xi�ng'],
['like/enjoy','x�huan'],
['more','g�ng'],
['most','z�i'],
['some','y�u de'],
['tall','gao'],
['arrive','dao'],
['leg','tui'],
['men','n�nr�n'],
['understand','d�ng'],
['help','bang'],
['lead to','y�nq�'],
['please','q�ng'],
['close/shut','guan'],
['day','tian'],
['vehicle','che'],
['nose','b� zi'],
['song','ger'],
['pray','q� d�o'],
['remain','l�u'],
['go(to place)','w�ng'],
['correct','g�i'],
['please tell me','q�n w�n'],
['country','gu�jia'],
['new','xin'],
['battle','zh�n'],
['to enter','r�'],
['house','f�ng zi']  
					];	//a��� i��� e��� o��� ��� 
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

//���
//���
//���
//���
//���