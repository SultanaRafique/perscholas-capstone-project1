
"use strict";
var httpRequest = false;

function getRequestObject(){
    try{
        httpRequest = new XMLHttpRequest();
    } catch(requestError){
        document.getElementById("csset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if(zip.addEventListener){
            zip.removeEventListner("keyup", checkInput, false);
        }else if (zip.attachEvent) {
            zip.detachEvent("onkeyup", checkInput)
        }
        return false;
    }
    return httpRequest;
}

function checkInput(){
    var zip = document.getElementById("zip").value;
    if(zip.length === 5){
        getLocation();
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";

    }
}

function getLocation(){

    var zip = document.getElementById("zip").value;
    if(!httpRequest){
        httpRequest = getRequestObject();

    }
    httpRequest.abort();
    httpRequest.open("GET","http://api.zippopotam.us/us/" + zip, true);
    httpRequest.send();
    httpRequest.onreadystatechange = displayData;
}

function displayData(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200){
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}

    var list = [];
    function generateList(){

        var listItems = document.getElementsByTagName("li");
        for (var i = listItems.length - 1; i >= 0; i--) {
            document.getElementsByTagName("ol")[0].removeChild(listItems[i]);
        }

        for (var i = 0; i < list.length; i++) {
                var newItem = "<span class='first'>     first   </span>" +  "<span class='last'>     last    </span>" +list[i];
                var newListItem = document.createElement("li");
                newListItem.innerHTML = newItem;
                document.getElementsByTagName("ol")[0].appendChild(newListItem);
                var firstButtons = document.querySelectorAll(".first");
                var lastFirstButton = firstButtons[firstButtons.length - 1];
                var lastButtons = document.querySelectorAll(".last");
                var lastLastButton = lastButtons[lastButtons.length - 1];
                if (lastFirstButton.addEventListener) {
                    lastFirstButton.addEventListener("click",moveToTop, false);
                    lastLastButton.addEventListener("click",moveToBottom, false);

                } else if (lastFirstButton.attachEvent) {
                    lastFirstButton.attachEvent("onclick", moveToTop);
                    lastLastButton.attachEvent("onclick", moveToTop);
            }       
        }
    }    
    
    
    function addItem(){
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        var zip = document.getElementById("zip");
        try{
        if(zip.value == ""){
            var errorDiv = document.getElementById("errorText");
            zip.style.background = "rgb(255,233,233)";
            throw "Please enter zip code.";


        } else {
            var errorDiv = document.getElementById("errorText");
            errorDiv.innerHTML = "";
            zip.style.background = "rgb(255,255,255)";
            if(list.length < 4){
            
            list.push("     "+ city.value + ",   " + state.value);
            }
        }

        }catch(msg) {
            errorDiv.style.display = "block";
            errorDiv.innerHTML = msg;
            formValidity = false;
        } 
        
        city.value = "";
        state.value = "";
        zip.value = "";
        var count = 0;
        generateList();

        var listItems = document.getElementsByTagName("li");
        count = listItems.length;
        var buttonCreated = document.getElementById("submitbtn");

        if(count == 4 ){
            if(buttonCreated == undefined){
            var btn = document.createElement("button");
            btn.innerHTML = "Submit";
            btn.type = "submit";
            btn.name = "formBtn";
            btn.id = "submitbtn";
            document.body.appendChild(btn);
           
            var listDiv = document.getElementById("results");
            listDiv.appendChild(btn);
            }
            

            var submotbtn = document.getElementById("submitbtn");
            if(submotbtn.addEventListener){
            submotbtn.addEventListener("click", loadOnSubmit,  false);
            } else if (submotbtn.attachEvent){
            submotbtn.attachEvent("onclick",loadOnSubmit);
           
        }
                

        }
        

    }

    function moveToTop(evt){
        if (evt === undefined) { // get caller element in IE8
            evt = window.event;
            }
            
              var callerElement = evt.target || evt.srcElement;
              var listItems = document.getElementsByTagName("li");
              var parentItem = callerElement.parentNode;
              for (var i = 0; i < list.length; i++) {
                 if (parentItem.innerHTML.search(list[i]) !== -1) {
                    var itemToMove = list.splice(i, 1);
                    list.unshift(itemToMove);
                } 
            }
        generateList();

    }


    function moveToBottom(evt){
        if (evt === undefined) { // get caller element in IE8
            evt = window.event;
            }
            
            var callerElement = evt.target || evt.srcElement;
            var listItems = document.getElementsByTagName("li");
            var parentItem = callerElement.parentNode;
              for (var i = 0; i < list.length; i++) {
                 if (parentItem.innerHTML.search(list[i]) !== -1) {
                    var itemToMove = list.splice(i, 1);
                    list.push(itemToMove);
            } 
        }
              generateList();

    }


    function loadOnSubmit(){
        location.href = "Registration.html";
    }

    function invisibleFieldSet(){
        document.getElementById("csset").style.visibility = "hidden";
    }


var zip = document.getElementById("zip");
if(zip.addEventListener){
    zip.addEventListener("keyup", checkInput,  false);
} else if (zip.attachEvent){
    zip.attachEvent("onkeyup",checkInput);
}


function createEventListener() {
    var addButton = document.getElementById("button");
    if (addButton.addEventListener) {
        addButton.addEventListener("click", addItem, false);
    } else if (addButton.attachEvent) {
            addButton.attachEvent("onclick", addItem);
    }
}
if (window.addEventListener) {
  window.addEventListener("load", createEventListener, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListener);
}


if (window.addEventListener) {
    window.addEventListener("load", invisibleFieldSet, false);
  } else if (window.attachEvent) {
      window.attachEvent("onload", invisibleFieldSet);
  }
