var launchCounter = document.getElementsByClassName("launch-counter")[0];
var launchDate;
var today;
var launchDifference;
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
              var update = setInterval(implementLaunchTime,500);
              console.log("jeg har funnet " + data);
          }
          else {
              console.log("Fil ikke funnet 404");
          }
      }
  }
  xhr.open("GET",url,true);
  xhr.send();

function implementLaunchTime() {
  today = new Date().getTime();
  launchDate = new Date(data.launch_date_local);
  launchDifference = launchDate - today;
  var days = Math.floor(launchDifference/(1000*60*60*24));
  var hours = Math.floor((launchDifference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  var minutes = Math.floor((launchDifference%(1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((launchDifference%(1000 * 60)) / 1000);
  launchCounter.innerHTML = "<h1>" + days + "d: " + hours + "h: " + minutes + "m: " + seconds + "s</h1>";
}
