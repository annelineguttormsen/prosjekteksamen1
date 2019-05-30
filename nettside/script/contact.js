var submitButton = document.getElementById("submitButton");
var formElement = document.getElementsByTagName("form")[0];

var name = document.getElementById("formName");
var email = document.getElementById("formEmail");
var phone = document.getElementById("formTelephone");
var text = document.getElementById("formText");

var tipEmail = document.getElementsByClassName("input-email")[0];
var tipPhone = document.getElementsByClassName("input-phone")[0];
var tipMsg = document.getElementsByClassName("textarea-tip")[0];

var emptyInput = /\w/;
//var emailRX = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9].\w{2,3}$/i;
var emailRX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var phoneRX = /^[+\s]*[0-9]{3}[.-\s]*[0-9]{2,3}[.-\s]*[0-9]{3,4}/;

submitButton.addEventListener("click",checkInput);

//functions
function checkInput() {
  tipEmail.style.visibility = "hidden";
  tipPhone.style.visibility = "hidden";
  tipMsg.style.visibility = "hidden";
  checkRegex(emailRX,email,tipEmail);
  checkRegex(phoneRX,phone,tipPhone);
  checkRegex(emptyInput,text,tipMsg);

}
function checkRegex(regex,element,tipElement) {
  if (regex.test(element.value) == false) {
      tipElement.style.visibility = "visible";
  }else {return;}
}
