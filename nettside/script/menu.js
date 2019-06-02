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
