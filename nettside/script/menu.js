var hbIcon = document.getElementById("hb-icon");
var headerMenu = document.getElementById("header-menu");

hbIcon.addEventListener("click",
function() {
  if (headerMenu.style.display == "block") {
    headerMenu.style.display = "none";
  } else {
    headerMenu.style.display = "block";
  };
});

/*
hbIcon.addEventListener("blur",function() {
  headerMenu.style.display = "none";
});*/

window.onresize = function() {
  if(window.innerWidth >= "400") {
    headerMenu.style.display = "block";
  } else {
    headerMenu.style.display = "none";
  }
}
