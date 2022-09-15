function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn =  document.querySelectorAll(".close");

// launch & close modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
closeBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// launch & close modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
}

// error messages
firstErrorMsg.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
lastErrorMsg.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
emailErrorMsg.innerHTML = "Veuillez entrer une adresse email valide.";
birthdateErrorMsg.innerHTML = "Vous devez entrer votre date de naissance.";
quantityErrorMsg.innerHTML = "Vous devez entrer un nombre.";
radioErrorMsg.innerHTML = "Vous devez choisir une option.";
checkboxErrorMsg.innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";



