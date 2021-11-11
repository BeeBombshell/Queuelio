const remInQueCon = $("#remInQue");
const userPosCon = $("#userPos");
const nexTurnCon = $("#nexTurn");
const personList = $("#personList");
const rmBtn = $(".rmBtn");
var A1= new Audio('/asset/1.mp3');
var A2= new Audio('/asset/2.mp3');

const url = "/queue/data/"+queueCode;

personList.on("click", (e) => {
	let username = e.target.id;

	let goto = "/queue/rmUser/"+username+"/"+queueCode;
	$.ajax({
		type: "Get",
		url: goto,
		success: function(data){
			console.log(data.success);
			getCurrData();
		}
	})
})

setInterval(getCurrData, 5000);

function getCurrData(){
	$.ajax({
		type : 'GET',
		url : url,
		success: function (data) {

			personList.html("");
			let liEle = ''
			for(person of data.joinedUsersName){
				liEle += `<li>${person} <abbr title="Remove User  from Queue"><button id="${person}" class="rmBtn"><i class="fas fa-times"></i></button></abbr></li>`;
			}
			personList.html(liEle);


			remInQueCon.html(data.queueLength);
			userPosCon.html(data.userPos);
			nexTurnCon.html(data.nexTurn);
			if(data.userPos==1){
				A1.play();
			}
			if(data.userPos==2){
				A2.play();
			}
		}
	});
}
