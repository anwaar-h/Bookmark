var websiteNameInput = document.getElementById("name");
var websiteUrlInput = document.getElementById("url");
var submitButton = document.getElementById("submitBtn");
var mainIndex ;
var websitesArray =[];
if (localStorage.getItem("websites") !== null) {
    websitesArray = JSON.parse(localStorage.getItem("websites"));
    displayWebsites();
}
function addWebsite(){
    var website ={
        name: websiteNameInput.value ,
        url: websiteUrlInput.value
    }
    websitesArray.push(website);
    localStorage.setItem("websites", JSON.stringify(websitesArray));
    displayWebsites();
}
function displayWebsites() {
    var trs ="";
    for(var i=0; i<websitesArray.length;i++){
        trs+= `
        <tr>
        <td>${i}</td>
        <td>${websitesArray[i].name}</td>
        <td>
        <button class="btn btnVisit">Visit</button>
        </td>
        <td>
        <button class="btn btnDelete" onclick="deleteWebsite(${i})" >Delete</button>
        </td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = trs;
}