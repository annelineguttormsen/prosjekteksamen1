var launchCounter = document.getElementsByClassName("launch-counter")[0];
var data;

  if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
  } else {
      //hvis IE bruk activex
      var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var url = ("https://api.spacexdata.com/v3/launches/next");
  xhr.onreadystatechange = function(){
      if (this.readyState == 4) {
          if(this.status == 200) {
              data = JSON.parse(xhr.responseText);
              //her går eventuelle funksjoner
              implementLaunchTime();
          }
          else {
              console.log("Fil ikke funnet 404");
          }
      }
  }
  xhr.open("GET",url,true);
  xhr.send();

function implementLaunchTime() {

}

var hbIcon = document.getElementById("hb-icon");
var headerMenu = document.getElementById("header-menu");
//headerMenu.style.display = "block";

hbIcon.addEventListener("click",
function() {
  if (headerMenu.style.display == "none") {
    headerMenu.style.display = "block";
    console.log("if");
  } else {
    headerMenu.style.display = "none";
    console.log("else");
  }
console.log("function called");});
