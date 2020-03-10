var themes = document.querySelectorAll(".themeBtn");
for (var i = 0; i < themes.length; i++) {
    themes[i].onclick = function () {
        setTheme(this.id);
    };
}

function setTheme(themeId) {
    var thisTheme = themeId,
        colorThemeSheet = document.getElementById("colorTheme");

    if (thisTheme === "violet") {
        colorThemeSheet.setAttribute('href', "css/themes/violetTheme.css");
    }
    else if (thisTheme === "indigo") {
        colorThemeSheet.setAttribute('href', "css/themes/indigoTheme.css");
    }
    else if (thisTheme === "ocean") {
        colorThemeSheet.setAttribute('href', "css/themes/oceanTheme.css");
    }
    else if (thisTheme === "appSynth") {
        colorThemeSheet.setAttribute('href', "css/themes/appSynthTheme.css");
    }
    else if (thisTheme === "crimson") {
        colorThemeSheet.setAttribute('href', "css/themes/crimsonTheme.css");
    }
    else if (thisTheme === "pumpkin") {
        colorThemeSheet.setAttribute('href', "css/themes/pumpkinTheme.css");
    }
    else if (thisTheme === "boring") {
        colorThemeSheet.setAttribute('href', "css/themes/boringTheme.css");
    }
    else {
        console.log("out of themes");
    }
}

function toggleCP() {
    var cp = document.getElementById("cp");

    if (cp.style.left === "0px") {
        cp.style.left = "-150px";
    }
    else {
        cp.style.left = "0px";
    }
}

//ENABLES SELECT ALL AND SAVE FILE BUTTONS MULTI PASSWORD BUTTON CLICK
function enableSmallButtonsMultiple() {
    var copyToClipboard = document.getElementById("copyClipboard"),
        saveToFile = document.getElementById("saveToFile");

    copyToClipboard.disabled = false;
    copyToClipboard.className = 'smallBtnActive';
    saveToFile.disabled = false;
    saveToFile.className = 'smallBtnActive';
}

function enableSmallButtonsSingle() {
    var copyToClipboard2 = document.getElementById("copyClipboard2"),
        saveToFile2 = document.getElementById("saveToFile2");

    copyToClipboard2.disabled = false;
    copyToClipboard2.className = 'smallBtnActive';
    saveToFile2.disabled = false;
    saveToFile2.className = 'smallBtnActive';
}



