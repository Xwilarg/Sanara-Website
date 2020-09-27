function displayPage(name) {
    document.getElementById("administration").hidden = true;
    document.getElementById("entertainment").hidden = true;
    document.getElementById("game").hidden = true;
    document.getElementById("nsfw").hidden = true;
    document.getElementById("radio").hidden = true;
    document.getElementById("tool").hidden = true;
    document.getElementById("table").hidden = true;

    document.getElementById(name).hidden = false;
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes('?')) {
        let parsing = new URLSearchParams(window.location.href.split('?')[1]);
        if (parsing.has("page")) {
            displayPage(parsing.get("page"));
        }
    }
});

function displayAdministration() {
    displayPage("administration");
}

function displayEntertainment() {
    displayPage("entertainment")
}

function displayGame() {
    displayPage("game");
}

function displayNSFW() {
    displayPage("nsfw");
}

function displayRadio() {
    displayPage("radio");
}

function displayTool() {
    displayPage("tool");
}