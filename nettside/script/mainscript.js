//lag XHR basert på om det er i IE eller ikke
if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
} else {
    //hvis IE bruk activex
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//url er bare et eksempel, sett opp data til global variabel
var url = "https://api.spacexdata.com/v3/launches";
var data;

xhr.onreadystatechange = function(){
    if (this.readyState == 4) {
        if(this.status == 200) {
            data = JSON.parse(xhr.responseText);
            //eventuell funksjon som skal bruke data
        }
        else {
            console.log("Fil ikke funnet 404");
        }
    }
}
xhr.open("GET",url,true);
xhr.send();