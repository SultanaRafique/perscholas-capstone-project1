
"use strict";
var formValidity = true;
var emailValidity = true;

//validate email
function EmailValidation(enteredEmail){

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!(re.test(String(enteredEmail).toLowerCase())))
        {

            var errorDiv = document.getElementById("errorText");
            errorDiv.innerHTML = "Please insert valid email id.";
            emailValidity = false;

        }else{
            emailValidity = true;
            var errorDiv = document.getElementById("errorText");
            errorDiv.innerHTML = "";
            console.log("outside if validate");
        }


}

/* validate required fields */
function validateRequired() {
var inputElements = document.querySelectorAll(
   "#registerinfo input");
var errorDiv = document.getElementById("errorText");
var elementCount = inputElements.length;
var textarea = document.getElementById("comments");
var requiredValidity = true;
var currentElement;
    try {
        for (var i = 0; i < elementCount; i++) {
        // validate all input elements in fieldset
        currentElement = inputElements[i];
        if (currentElement.value === "" ) {

            currentElement.style.background = "rgb(255,233,233)";
            requiredValidity = false;

        } else if (textarea.value === ""){

            textarea.style.background = "rgb(255,233,233)";
            requiredValidity = false;

        } else {
            currentElement.style.background = "white";
            textarea.style.background = "white";
        }
        }

        var email = document.getElementById("email").value;
        EmailValidation(email)

        
        if(requiredValidity === false) {

            
            throw "Please complete all fields.";
        } else if (emailValidity == false){

            
            throw "Please insert valid email id.";
        } 

        errorDiv.style.display =  "none";
        errorDiv.innerHTML = "";
    }

    catch(msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    } 

}


/* create event listeners */
function createEventListeners() {
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", validateForm, false);
} else if (form.attachEvent) {
form.attachEvent("onsubmit", validateForm);
}
}

/* validate form */
function validateForm(evt){
if (evt.preventDefault) {
    evt.preventDefault(); //prevent form from submitting    
} else {
    evt.returnValue = false;    
}

formValidity = true;
validateRequired();
// validateNumbers();
if (formValidity === true) {
    document.getElementsByTagName("form")[0].submit();
}
}

if (window.addEventListener){
window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent){
window.attachEvent("onload", createEventListeners);
}


