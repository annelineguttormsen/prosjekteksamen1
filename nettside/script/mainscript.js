var archiveDiv = document.getElementsByClassName("archive-info")[0];

var baseUrl = "https://api.spacexdata.com/v3/";
var data;

function getArchive(urlArg) {
  //lag XHR basert på om det er i IE eller ikke
  if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
  } else {
      //hvis IE bruk activex
      var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var url = (baseUrl + urlArg);
  xhr.onreadystatechange = function(){
      if (this.readyState == 4) {
          if(this.status == 200) {
              data = JSON.parse(xhr.responseText);
              //her går eventuelle funksjoner
              if (urlArg == "history") {
                implementHistory();
              }
              else if (urlArg == "rockets") {
                implementRockets();
              }
              else if (urlArg == "missions") {
                implementMissions();
              }
              else if (urlArg == "launches") {
                implementLaunches();
              }
          }
          else {
              console.log("Fil ikke funnet 404");
          }
      }
  }
  xhr.open("GET",url,true);
  xhr.send();
}

function implementHistory() {
  /*archiveDiv.innerHTML = "";
  for (var i in data) {
    archiveDiv.innerHTML
  }*/
  console.log("history");
}
function implementRockets() {
  console.log("rockets");
}
function implementMissions() {
  console.log("missions");
}
function implementLaunches() {
  console.log("launches");
}
