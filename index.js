var PROG=null,be=null,otpe=null;



function init(){
	var re=document.querySelectorAll(".wr .editor .row")[0];
	be=document.querySelectorAll(".wr .editor .box")[0];
	otpe=document.querySelectorAll(".wr .output .otp")[0];
	be.onkeydown=function(e){
		if (e.key.toLowerCase()=="enter"&&e.altKey==true){
			run();
			return false;
		}
	}
	be.innerHTML="++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.+++++++..+++.<<++.>+++++++++++++++.>.+++.------.--------.<<+.<."
	setInterval(function(){
		var n=be.value.split("\n").length;
		re.innerHTML="";
		for (var i=0;i<n;i++){
			re.innerHTML+=`\n${i+1}`;
		}
		re.innerHTML=re.innerHTML.substring(1).split("\n").join("<br>");
		re.style.transform=`translate(0,-${be.scrollTop}px)`;
	},0);
	run();
}



function run(){
	stop();
	otpe.innerHTML="";
	PROG=new Program(be.value);
	setTimeout(function(){
		PROG.start();
	},0);
}



function stop(){
	if (PROG!=null){
		PROG.stop();
	}
}



document.addEventListener("DOMContentLoaded",init,false)