var submitButton = document.getElementById("submitButton");
var errorElement = document.getElementById("error");
var formElement = document.getElementsByTagName("form")[0];

var name = document.getElementById("formName");
var email = document.getElementById("formEmail");
var phone = document.getElementById("formTelephone");
var text = document.getElementById("formText");

var emptyInput = /\w/;
//var emailRX = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9].\w{2,3}$/i;
var emailRX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var phoneRX = /^[+\s]*[0-9]{3}[.-\s]*[0-9]{2,3}[.-\s]*[0-9]{3,4}/;

submitButton.addEventListener("click",checkInput);

//functions
function checkInput() {
  errorElement.innerHTML = "";
  checkRegex(emailRX,email,"Form must include a valid e-mail");
  checkRegex(phoneRX,phone,"Form must include a valid phone number");
  checkRegex(emptyInput,text,"Form must include message")
  if (errorElement.innerHTML == "") {
    formElement.innerHTML = "<p style='color:#fff'>Thanks for your message! We'll get back to you soon.</p>"
  }
}
function checkRegex(regex,element,errorMessage) {
  if (regex.test(element.value) == false) {
      errorElement.innerHTML += ("<p>" + errorMessage + "</p>");
  }else {return;}
}
