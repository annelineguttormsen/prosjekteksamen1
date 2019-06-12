var archiveDiv = document.getElementsByClassName("archive-info")[0];

var selectEl = document.getElementsByClassName("select")[0];
var optionsEl = document.getElementsByClassName("options")[0];

var baseUrl = "https://api.spacexdata.com/v3/";
var data;

function getArchive(urlArg) {
  archiveDiv.innerHTML ="<img id=\"loading-img\" src=\"media/loading.svg\">";
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

//funksjoner for å hente ulik informasjon
function implementHistory() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].title,archiveRow);
    makeElement("p",data[i].details,archiveRow);
    makeElement("a","Article",archiveRow,"href",data[i].links.article);
    archiveDiv.appendChild(archiveRow);
  }
}
function implementRockets() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].rocket_name,archiveRow);
    makeElement("p",("<b>Details: </b>" + data[i].description),archiveRow);
    makeElement("p",("<b>Country: </b>" + data[i].country),archiveRow);
    makeElement("p",("<b>First flight: </b>" + data[i].first_flight),archiveRow);
    makeElement("a",(data[i].rocket_name + " Wikipedia page"),archiveRow,"href",data[i].wikipedia);
    makeImgElement(null,archiveRow,data[i].flickr_images[0],(data[i].rocket_name));
    archiveDiv.appendChild(archiveRow);
  }
}
function implementMissions() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].mission_name,archiveRow);
    makeElement("p",("<b>Details: </b>" + data[i].description),archiveRow);
    makeElement("a",(data[i].mission_name + " wikipedia article"),archiveRow,"href",data[i].wikipedia);
    archiveDiv.appendChild(archiveRow);
  }
}
function implementLaunches() {
  archiveDiv.innerHTML = "";
  for (var i in data) {
    var archiveRow = document.createElement("div");
    archiveRow.setAttribute("class","archive-row");
    makeElement("h1",data[i].mission_name,archiveRow);
    if(data[i].links.mission_patch_small !== null) {
      makeImgElement(null,archiveRow,data[i].links.mission_patch_small,(data[i].mission_name + " mission patch"));
    }
    makeElement("p",("<b>Rocket: </b>" + data[i].rocket.rocket_name),archiveRow);
    makeElement("p",("<b>Launch site: </b>" + data[i].launch_site.site_name_long),archiveRow);
    if (data[i].details !== null) {
      makeElement("p",("<b>Details: </b>" + data[i].details),archiveRow);
    } else {
      makeElement("p","<b>Details</b>: No details available",archiveRow);
    }
    makeElement("p",("<b>Launch year: </b>" + data[i].launch_year),archiveRow);
    if (data[i].links.article_link !== null) {
      makeElement("a",(data[i].mission_name + " launch article"),archiveRow,"href",data[i].links.article_link);
    }
    archiveDiv.appendChild(archiveRow);
  }
}

//lager element
function makeElement(elementType, content, parentElement, attr, attrContent) {
  var element = document.createElement(elementType);
  if (attr !== undefined && attrContent !== undefined) {
    element.setAttribute(attr,attrContent);
  }
  element.innerHTML = content;
  parentElement.appendChild(element);
}
function makeImgElement(content,parentElement,srcContent,altContent) {
  var element = document.createElement("img");
  element.setAttribute("src",srcContent);
  element.setAttribute("alt",altContent);
  element.innerHTML = content;
  parentElement.appendChild(element);
}


//hent launches med en gang siden loades
getArchive("launches");


selectEl.onfocus = function popUpOptions() {
  optionsEl.style.display = "block";
}
selectEl.onblur = function() {
  optionsEl.style.display = "none";
}
optionsEl.addEventListener("click",function() {
  optionsEl.style.display = "none";
  selectEl.blur();
});
window.onresize = function() {
  optionsEl.style.display = "none";
  console.log("fjern options");
}
