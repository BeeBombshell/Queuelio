var topIcon = document.querySelector('.icon');
var nav = document.querySelector('.nav-lin');
var navLi = document.querySelectorAll('.nav-lin li')

//Event Listener

topIcon.addEventListener("click", addNavBar);

//Functions

function addNavBar(){
    //Class given to topIcon
    nav.classList.toggle('icon-active');

    //links animation
    navLi.forEach((link, index) => {
      if(link.style.animation){
        link.style.animation = ""
      }else{
        link.style.animation = `navLinkFade 0.7s ease forwards ${index/5}s`;
      }
    });

    //icon animation
    topIcon.classList.toggle('toggle');
}


nav.addEventListener("click", addNavBar);


const otpBtn = $("#otpBtn");
const regBtn = $("#regBtn");
let otp;

otpBtn.on("click", () => {

  const emailId = $("#username").val();
  if(emailId != ""){
    let url = "https://talk9api.herokuapp.com/OTP?id="+emailId;

    $.getJSON(url, (data) => {
      otp = data.OTP;
    });

    const alertMessage = "Check OTP on your email Id: "+emailId;
    alert(alertMessage);
    otpBtn.css("display", "none");
  }else{
    alert("Please Fill all the fields");
  }
});

regBtn.on("click", (e) => {
  const otpVal = $("#otp").val();

  console.log("OTP", otp);
  if(otpVal != otp){
    e.preventDefault();
    alert("OTP is not correct, try again!!");
    otpBtn.css("display", "inline-block");
  }
});
