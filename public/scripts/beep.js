var myAudio= new Audio('/asset/beep.mp3');
function upd() { 
	setInterval(function() {myAudio.play();},1000);
}
upd();
