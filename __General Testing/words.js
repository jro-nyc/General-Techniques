var colores = ["#aaffaa","#bbff99","#ccff88","#ddff77","#eeff66","#ffff55","#aaffbb","#99ffcc",
				"#99ffdd","#99ffee","#66ffff","#55eeaa","#aaddaa","#99ccaa","#88bbaa","#77aaaa"];
var NUMWORDS;		//The TOTAL number of vocabulary words, gotten from the findArraySize function
var NUMQUESTIONS = 8;	//The number of words to be tested
var ingles = ['talk','eat','want','teacher','yes','I/me','you','good','same/also','study','again','see','name','thanks','no/not','very','all/both','busy','cold','wind','they/them','old'];
var chinoViejo = ['shuo','chi','yao4','shi','shi4','wo3','Ni3','hao3','tong2','xue2','zai4','jian4','ming2','xie4','bu4','hen3','dou','mang2','leng3','feng','tamen','lao3'];
var chino = ['shuo','chi','y�o','shi','sh�','w�','N�','h�o','t�ng','x�e','z�i','j�an','m�ng','x�e','b�','h�n','dou','m�ng2','l�ng3','feng','tamen','l�o'];

function findArraySize(){
var i=0;
	do{
		i+=1;
	}while (chinoViejo[i])
	return(i);
	
}

//���
//���
//���
//���
//���