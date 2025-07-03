var websiteNameInput = document.getElementById("websiteName");
var websiteUrlInput = document.getElementById("websiteUrl");
var submitButton = document.getElementById("submitBtn");

var websiteNameRegex= /^[A-Za-z0-9 ]{2,29}$/;
var websiteUrlregex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

function inputsValidation(){

  let isValid = true;

  if(!websiteNameRegex.test(websiteNameInput.value)){
    websiteNameInput.classList.add("is-invalid")
    websiteNameInput.classList.remove("is-valid")
    isValid = false;
  }else{
    websiteNameInput.classList.remove("is-invalid")
    websiteNameInput.classList.add("is-valid")
  }

  if(!websiteUrlregex.test(websiteUrlInput.value)){
    websiteUrlInput.classList.add("is-invalid")
    websiteUrlInput.classList.remove("is-valid")
    isValid = false;
  }else{
    websiteUrlInput.classList.remove("is-invalid")
    websiteUrlInput.classList.add("is-valid")
  }

  return isValid;
}

var websitesArray = [];
if (localStorage.getItem("websites") !== null) {
  websitesArray = JSON.parse(localStorage.getItem("websites"));
  displayWebsites();
}
function addWebsite() {
  if (!inputsValidation()) {
            openErrorDialouge();
            return false; 
        }

  var website = {
    name: websiteNameInput.value,
    url: websiteUrlInput.value,
  };
  websitesArray.push(website);
  localStorage.setItem("websites", JSON.stringify(websitesArray));
  displayWebsites();
  clearInputs();
  return true;
}
function clearInputs() {
  websiteNameInput.value = "";
  websiteUrlInput.value = "";
}
function displayWebsites() {
  var trs = "";
  for (var i = 0; i < websitesArray.length; i++) {
    trs += `
        <tr>
        <td>${i+1}</td>
        <td>${websitesArray[i].name}</td>
        <td>
        <a href="${websitesArray[i].url}" target="_blank" class="btn btnVisit"><i class="fa-solid fa-eye pe-2"></i> Visit</a>
        </td>
        <td>
        <button class="btn btnDelete" onclick="deleteWebsite(${i})" ><i class="fa-solid fa-trash-can"></i> Delete</button>
        </td>
        </tr>`;
  }
  document.getElementById("tBody").innerHTML = trs;
}
function deleteWebsite(websiteIndex) {
  websitesArray.splice(websiteIndex, 1);
  localStorage.setItem("websites", JSON.stringify(websitesArray));
  displayWebsites();
}
// function visitWebsite(websiteIndex) {}


function openErrorDialouge() {
  Swal.fire({
 html:`<div class="boxLayer position-absolute d-flex justify-content-center align-items-center w-100 h-100 ">
            <div class="checkBox bg-white p-4 rounded-3 shadow">
                <div class="sec1 d-flex flex-row space-between align-items-center justify-content-between mb-4">
                <div class="dots d-flex gap-2">
                    <i class="fa-solid fa-circle dot-1"></i>
                    <i class="fa-solid fa-circle dot-2"></i>
                    <i class="fa-solid fa-circle dot-3"></i>
                </div>
                </div>
                <h4 class="pb-2">Site Name or Url is not valid, Please follow the rules below :</h4>
                <ul class="boxList">
                    <li class="mt-3"><i class="fa-regular fa-circle-right p-2"></i>Site name must contain at least 3 characters</li>
                    <li class="mt-3"><i class="fa-regular fa-circle-right p-2"></i>Site URL must be a valid one</li>
                </ul>
            </div>
        </div>` ,
    showCloseButton: true,
    confirmButtonText: false,
  
      })
  }
submitButton.addEventListener('click', function(e) {
        e.preventDefault(); 
        addWebsite();
    }); 
