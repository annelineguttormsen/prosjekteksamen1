var missionName = document.getElementById("mission-name");
var rocketName = document.getElementById("rocket-name");
var launchDetails = document.getElementById("launch-details");
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
              implementLaunches();
          }
          else {
              console.log("Fil ikke funnet 404");
          }
      }
  }
  xhr.open("GET",url,true);
  xhr.send();

function implementLaunches() {
  missionName.innerHTML  = "<b>Mission name: </b>" + data["mission_name"];
  rocketName.innerHTML = "<b>Rocket name: </b>" + data["rocket"]["rocket_name"];
  launchDetails.innerHTML = data["details"];
}
