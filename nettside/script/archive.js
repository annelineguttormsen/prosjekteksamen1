var archiveDiv = document.getElementsByClassName("archive-info")[0];

var selectEl = document.getElementsByClassName("select")[0];
var optionsEl = document.getElementsByClassName("options")[0];

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
              var selectP = selectEl.getElementsByTagName("p")[0];
              selectP.innerHTML = (urlArg.charAt(0).toUpperCase() + urlArg.slice(1)) + "<img src=\"media/arrow-right-16.svg\">";
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
    makeElement("h1",data[i].title);
    makeElement("p",data[i].details);
    makeElement("a","Article","href",data[i].links.article);
  }
}
function implementRockets() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    makeElement("h1",data[i].rocket_name);
    makeElement("p",data[i].description);
    makeElement("img",null,"src",data[i].flickr_images[0]);
  }
}
function implementMissions() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    makeElement("h1",data[i].mission_name);
    makeElement("p",data[i].description);
  }
}
function implementLaunches() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    makeElement("h1",data[i].mission_name);
    if(data[i].links.mission_patch_small !== null) {
      makeElement("img",null,"src",data[i].links.mission_patch_small);
    }
    makeElement("p",("<b>Rocket: </b>" + data[i].rocket.rocket_name));
    makeElement("p",("<b>Launch site: </b>" + data[i].launch_site.site_name_long));
    if (data[i].details !== null) {
      makeElement("p",("<b>Details: </b>" + data[i].details));
    } else {
      makeElement("p","<b>Details</b>: No details available");
    }
    makeElement("p",("<b>Launch year: </b>" + data[i].launch_year));
    if (data[i].links.article_link !== null) {
      makeElement("a",(data[i].mission_name + " launch article"),"href",data[i].links.article_link);
    }
  }
}

function makeElement(elementType, content, attr, attrContent) {
  var element = document.createElement(elementType);
  if (attr !== undefined && attrContent !== undefined) {
    element.setAttribute(attr,attrContent);
  }
  var archiveRow = document.createElement("div");
  archiveRow.setAttribute("class","archive-row");
  element.innerHTML = content;
  archiveRow.appendChild(element);
  archiveDiv.appendChild(archiveRow);
}

getArchive("launches");

selectEl.onfocus = function popUpOptions() {
  optionsEl.style.display = "block";
}
selectEl.onblur = function() {
  optionsEl.style.display = "none";
}

window.onresize = function() {
  optionsEl.style.display = "none";
  console.log("fjern options");
}