function displayPage(name) {
    document.getElementById("tableHelp").hidden = false;
    document.getElementById("Administration").hidden = true;
    document.getElementById("Entertainment").hidden = true;
    document.getElementById("Game").hidden = true;
    document.getElementById("Nsfw").hidden = true;
    document.getElementById("Radio").hidden = true;
    document.getElementById("Tool").hidden = true;
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
    displayPage("Administration");
}

function displayEntertainment() {
    displayPage("Entertainment")
}

function displayGame() {
    displayPage("Game");
}

function displayNSFW() {
    displayPage("Nsfw");
}

function displayRadio() {
    displayPage("Radio");
}

function displayTool() {
    displayPage("Tool");
}

let http = new XMLHttpRequest();
http.open("GET", "php/getJson.php?file=Help", false);
http.onreadystatechange = function ()
{
    if (this.readyState === 4 && this.status === 200) {
        let json = JSON.parse(this.responseText);
        for (j in json) {
            var elem = json[j];
            var c = elem.Item2;
            let args = "";
            for (index in c.Arguments) {
                let arg = c.Arguments[index];
                if (arg.Type == 0) args += "(" + arg.Content + ") ";
                else args += "[" + arg.Content + "] ";
            }
            document.getElementById(elem.Item1).innerHTML +=
            '<tr>' +
            `<td>${c.CommandName}</td>` +
            `<td>${args}</td>` +
            `<td>${c.Description}</td>` +
            `<td>${c.Restriction}</td>` +
            `<td>${c.Example == null ? "" : c.Example}</td>` +
            '</tr>';
        }
    }
};
http.send(null);