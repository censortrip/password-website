//"use strict";

//EVENT HANDLER SETUP ON WINDOW LOAD
function addListeners(){
    document.getElementById('singlePassBtn').addEventListener("click", generateSinglePassword);
    document.getElementById('multiplePassBtn').addEventListener("click",generateMultiplePassword);
    document.getElementById('saveToFile').addEventListener("click",saveToFileMultiple);
    document.getElementById('copyClipboard').addEventListener("click",copyTextMultiple);
    document.getElementById('saveToFile2').addEventListener("click",saveToFileSingle);
    document.getElementById('copyClipboard2').addEventListener("click",copyTextSingle);
    document.getElementById('cp').addEventListener("mouseleave",function(){setTimeout(toggleCP,500)});

}
window.onload= addListeners();

//PASSWORD OBJECT
function Password(passwordLength, passwordTypes) {
    this.passwordLength = passwordLength;
    this.passwordTypes = passwordTypes;
}
Password.prototype = {
    generateSinglePass: function () {
        var password = generatePass(this.passwordLength, this.passwordTypes);
        updateSinglePasswordWindow(password);
    },

    generateMultiPass: function () {
        var multiPassLength = document.getElementById("selectLengthOfPasswords").value,
            numberOfPasswords = document.getElementById("selectNumberOfPasswords").value,
            passwords = generatePasses(multiPassLength, numberOfPasswords, this.passwordTypes); //should be an array that contains all the passwords
        printPasswords(passwords);
    }
};

//GENERATES SINGLE PASSWORD WHEN SINGLE PASSWORD BUTTON IS CLICKED
function generateSinglePassword() {

    var checked = document.querySelectorAll("input:checked"),
        password = new Password(getPasswordLength(), getPasswordTypes());



    if (checked.length === 0) { //no boxes checked or only multi-pass checked
        updateSinglePasswordWindow("Choose Password Type");
    }
    else {
        password.generateSinglePass();
        enableSmallButtonsSingle();
    }
    return false;
}

//GENERATES MULTIPLE PASSWORDS WHEN MULTI-PASS BUTTON IS CLICKED
function generateMultiplePassword() {
    var checked = document.querySelectorAll("input:checked"),
        password = new Password(getPasswordLength(), getPasswordTypes());

    if (checked.length === 0) { //no boxes checked or only multipass checked
        updateSinglePasswordWindow("Choose Password Type");
    }
    else{
        password.generateMultiPass();
        enableSmallButtonsMultiple();
    }
    return false; //set to prevent page reload
}

//GETS CHOSEN PASSWORD LENGTHS
function getPasswordLength() {
    var formValues = getFormValues();
    return formValues[0];
}

//GETS CHOSEN PASSWORD TYPES
function getPasswordTypes() {
    var formValues = getFormValues(), types = [];
    for (var i = 1; i < formValues.length; i++) {
        if (formValues[i] !== false)
            types.push(formValues[i]);
    }
    return types;
}

//gets submitted form values, used by getPasswordLength() and getPasswordTypes() use this
function getFormValues() {
    var form = document.getElementById("myForm"), formValues = [];

    for (var i = 0; i < form.length - 1; i++) { //note the -1 removed the unneeded generate password value
        if (isNaN(form.elements[i].value) === false) { //i.e. if it is a number
            formValues[0] = form.elements[i].value;
        }
        else if (form.elements[i].checked) { //if item is a checked check box
            formValues[i] = form.elements[i].name;
        }
        else {
            formValues[i] = false;
        }
    }
    return formValues;
}

//USED IN TWO PLACES, printPasswords() and saveToFile() functions
function getMultiPassWindowId() {
    return document.getElementById("multiplePasswordWindow");
}

function getSinglePassWindowId(){
    return document.getElementById("passwordText")
}

function saveToFileMultiple() {
    var stringArray = getMultiPassWindowId().value.split('\n'), //this adds text area values to array, split by ,
        stringFromArray = stringArray.join("\r\n"), //this converts the split array's values to string and adds newline for each element value in array
        blob = new Blob([stringFromArray], {type: "text/plain;charset=utf-8"});

    saveAs(blob, "fast_passwords_generated.txt");
}

function saveToFileSingle() {
    var stringArray = getSinglePassWindowId().value.split('\n'), //this adds text area values to array, split by ,
        stringFromArray = stringArray.join("\r\n"), //this converts the split array's values to string and adds newline for each element value in array
        blob = new Blob([stringFromArray], {type: "text/plain;charset=utf-8"});

    saveAs(blob, "fast_password_generated.txt");
}

//FISHER/YATES SHUFFLE USED TO SHUFFLE ARRAYS
function shuffle(array) {
    var numberOfElements = array.length, temp = [], index = -1;

    while (numberOfElements) { // While there remain elements to shuffle…
        index = Math.floor(Math.random() * numberOfElements--); // Pick a remaining element…
        temp = array[numberOfElements];
        array[numberOfElements] = array[index];
        array[index] = temp;
    }
    return array;
}

//GENERATES SINGLE PASSWORD
function generatePass(passwordLength, types) {
    var password = "",
        array = getArray(types);
    shuffle(array);
    for (var i = 1; i <= passwordLength; i++) {
        password += array[Math.floor(Math.random() * array.length)];
    }
    return password;
}

//SETS SINGLE PASSWORD TEXT
function updateSinglePasswordWindow(message) {
    var doc = document,
        text = doc.getElementById("passwordText");
    text.value = message;
}

//GENERATES MULTIPLE PASSWORDS
function generatePasses(multiPassLength, numberOfPasswords, types) {
    var individualPassword = "", passwordsArray = [],
        array = getArray(types);
    shuffle(array);
    for (var passes = 0; passes < numberOfPasswords; passes++) {
        for (var i = 1; i <= multiPassLength; i++) {
            individualPassword += array[Math.floor(Math.random() * array.length)];
        }
        passwordsArray.push(individualPassword);
        individualPassword = "";
    }
    return passwordsArray;
}

//SETS MULTIPLE PASSWORD TEXT
function printPasswords(passwords) {
    var multiplePassWindow = getMultiPassWindowId();
    multiplePassWindow.innerHTML = "";
    for (var i = passwords.length - 1; i >= 0; i--) {
        multiplePassWindow.innerHTML += passwords[i] + "\n";
    }
    multiplePassWindow = null;
}
//CREATES AND RETURNS THE TYPE OF ARRAY REQUIRED FOR THE PASSWORD
function getArray(types) {
    var array = [],
        capitalArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        lowercaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        symbolsArray = ["{", "}", "(", ")", "[", "]", "#", "?", "!", "=", "+", "*", "~", "@", "$", "%", "^", "&"];

    if (types.length == 4) {
        return array.concat(capitalArray, lowercaseArray, numbersArray, symbolsArray);
    }
    else {
        for (var i = 0; i < types.length; i++) {
            if (types[i] === "capital") {
                array.push.apply(array, capitalArray);
            }
            else if (types[i] === "lowercase") {
                array.push.apply(array, lowercaseArray);
            }
            else if (types[i] === "numbers") {
                array.push.apply(array, numbersArray);
            }
            else {
                array.push.apply(array, symbolsArray);
            }
        }
        return array;
    }
}

function copyTextMultiple() {
    getMultiPassWindowId().select();
}

function copyTextSingle() {
    getSinglePassWindowId().select();
}


//This is not working, but find a way man, find a way
/*
 function copyToClipBoard()
 {
 multiplePasswordWindow.innerText = copytext.innerText;
 copied = multiplePasswordWindow.createTextRange();
 copied.execCommand("Copy");
 }
 */
