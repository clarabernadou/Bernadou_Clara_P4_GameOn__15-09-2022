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
const form = document.querySelector('form');
const modalConfirm = document.querySelector('.modal-confirm');
const modalConfirmClose = document.querySelector('.modal-confirm-btn');

const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const locations = document.getElementById('location1');
const checkbox = document.getElementById('checkbox1');
const radio = document.querySelectorAll('input[name="location"]');

// launch & close modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
closeBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// launch & close modal form
function launchModal(){
  modalbg.style.display = "block";
};
function closeModal(){
  modalbg.style.display = "none";
};

// open & close the confirm modal
function modalConfirmForm(){
  modalConfirm.style.display = "flex";
};
modalConfirmClose.addEventListener('click', () => {
  modalConfirm.style.display = "none";
});

// error messages
const errorMsg = {
  firstErrorMsg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  lastErrorMsg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  emailErrorMsg: "Veuillez entrer une adresse email valide.",
  birthdateErrorMsg: "Vous devez entrer votre date de naissance.",
  quantityErrorMsg: "Vous devez entrer un nombre.",
  locationsErrorMsg: "Vous devez choisir un tournois.",
  checkboxErrorMsg: "Vous devez vérifier que vous acceptez les termes et conditions.",
  radioErrorMsg: "Vous devez choisir une option."
};

// show & deleted error message when field is invalid & valid
function isInvalid(element, message){
  element.parentElement.setAttribute("data-error-visible", "true");
  element.parentElement.setAttribute("data-error", message);
};
function isValid(element){
  element.parentElement.setAttribute("data-error-visible", "false");
  element.parentElement.removeAttribute("data-error");
};

// clear error messages
function clearErrors(){
  let invalidInput = document.querySelectorAll('.formData[data-error-visible="true"]');
  for(let input of invalidInput){
    input.setAttribute("data-error-visible", "false");
    input.removeAttribute("data-error");
  }
};

// verify if the field is empty or if it has less than 2 characters
function firstValid(first, message){
  const firstInput = first.value;
  if(firstInput !== null && firstInput.length >= 2){
    isValid(first);
    return true;
  }else{
    isInvalid(first, message);
  }
};

// verify if the field is empty or if it has less than 2 characters
function lastValid(last, message){
  const lastInput = last.value;
  if(lastInput !== null && lastInput.length >= 2){
    isValid(last);
    return true;
  }else{
    isInvalid(last, message);
  }
};

// verify email format
function emailValid(email, message){
  let regex = /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/;
  let emailInput = email.value;
  if(emailInput.match(regex)){
    isValid(email);
    return true;
  }else{
    isInvalid(email, message);
  }
};

// verify birthdate format
function birthdateValid(birthdate, message){
  let regexBirthdate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  let currentDate = new Date(Date.now());
  let selectDate = new Date(Date.parse(birthdate.value));
  if(regexBirthdate.test(birthdate.value) && currentDate > selectDate){
    isValid(birthdate);
    return true;
  }else{
    isInvalid(birthdate, message);
  }
};

// verify that the quantity is between 0 and 99
function quantityValid(quantity, message){
  let concoursQuantity = quantity.value;
  if(concoursQuantity !== '' && concoursQuantity >= 0 && concoursQuantity <= 99){
    isValid(quantity);
    return true;
  }else{
    isInvalid(quantity, message);
  }
};

// verify that a location is selected
function locationsValid(locations, message){ 
  let radioButtons = document.querySelectorAll('.checkbox-input[type="radio"]');
  for(let radioBtn of radioButtons){
    if(radioBtn.checked === true){
      isValid(locations);
      return true;
    }else{
      isInvalid(locations, message);
    }
  }
};

// verify that one is checked
function checkboxValid(checkbox, message){
  if(checkbox.checked === true){
    isValid(checkbox);
    return true;
  }else{
    isInvalid (checkbox, message);
  }
};

// addEventListener to change
first.addEventListener('change', () => {
  firstValid(first, errorMsg.firstErrorMsg);
});
last.addEventListener('change', () => {
  lastValid(last, errorMsg.lastErrorMsg);
});
email.addEventListener('change', () => {
  emailValid(email, errorMsg.emailErrorMsg);
});
birthdate.addEventListener('change', () => {
  birthdateValid(birthdate, errorMsg.birthdateErrorMsg);
});
quantity.addEventListener('change', () => {
  quantityValid(quantity, errorMsg.quantityErrorMsg);
});
radio.forEach(locations => {
  locations.addEventListener('change', () => {
    locationsValid(locations, errorMsg.locationsErrorMsg);
  })
});

// if the fields are false, display an error message
function validate(){
  let formValid = true;
  if(!(firstValid(first, errorMsg.firstErrorMsg))){formValid = false};
  if(!(lastValid(last, errorMsg.lastErrorMsg))){formValid = false};
  if(!(emailValid(email, errorMsg.emailErrorMsg))){formValid = false};
  if(!(birthdateValid(birthdate, errorMsg.birthdateErrorMsg))){formValid = false};
  if(!(quantityValid(quantity, errorMsg.quantityErrorMsg))){formValid = false};
  if(!(locationsValid(locations, errorMsg.locationsErrorMsg))){formValid = false};
  if(!(checkboxValid(checkbox, errorMsg.checkboxErrorMsg))){formValid = false};

  if(formValid){
    clearErrors();
  };
}

// clear fields
function clearForm(){
  let formInputs = document.querySelectorAll('.formData input');
  for (filledInput of formInputs){
    filledInput.value = "";
  }
  for (city of radio){
    locations.checked = false;
  }
};

// submit & validate the form
form.addEventListener('submit', function(e){
  e.preventDefault();
  validate();
  clearForm();
  closeModal();
  modalConfirmForm();
});