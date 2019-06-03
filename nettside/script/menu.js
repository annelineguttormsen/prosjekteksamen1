var hbIcon = document.getElementById("hb-icon");
var headerMenu = document.getElementById("header-menu");
//headerMenu.style.display = "block";

hbIcon.addEventListener("click",
function() {
  if (headerMenu.style.display == "block") {
    headerMenu.style.display = "none";
    console.log("if");
  } else {
    headerMenu.style.display = "block";
    console.log("else");
  };
});

window.onresize = function() {
  if(window.innerWidth >= "400") {
    headerMenu.style.display = "block";
    console.log("Nå er jeg større enn 400px");
  } else {
    headerMenu.style.display = "none";
  }
}
