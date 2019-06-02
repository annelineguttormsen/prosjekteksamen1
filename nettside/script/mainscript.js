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
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].title,archiveRow);
    makeElement("p",data[i].details,archiveRow);
    makeElement("a","Article",archiveRow,"href",data[i].links.article);
    archiveRow.setAttribute("class","archive-row");
    archiveDiv.appendChild(archiveRow);
  }
}
function implementRockets() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].rocket_name,archiveRow);
    makeElement("p",data[i].description,archiveRow);
    makeElement("img",null,archiveRow,"src",data[i].flickr_images[0]);
    archiveDiv.appendChild(archiveRow);
  }
}
function implementMissions() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].mission_name,archiveRow);
    makeElement("p",data[i].description,archiveRow);
    archiveDiv.appendChild(archiveRow);
  }
}
function implementLaunches() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].mission_name,archiveRow);
    makeElement("img",null,archiveRow,"src",data[i].links.mission_patch_small);
    makeElement("p",data[i].details,archiveRow);
    archiveDiv.appendChild(archiveRow);
  }
}

function makeElement(elementType, content, parentElement, attr, attrContent) {
  var element = document.createElement(elementType);
  if (attr !== undefined && attrContent !== undefined) {
    element.setAttribute(attr,attrContent);
  }
  element.innerHTML = content;
  parentElement.appendChild(element);
}
