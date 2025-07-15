function displayPage(name) {
    document.getElementById("table").hidden = true;
    document.getElementById("tableHelp").hidden = false;

    let html = "";
    for (let e of data[name]) {
        let valDiscord, valRevolt;
        if (e.DiscordSupport === 0) valDiscord = "✔️";
        else if (e.DiscordSupport === 1) valDiscord = "➖";
        else valDiscord = "❌";
        if (e.RevoltSupport === 0) valRevolt = "✔️";
        else if (e.RevoltSupport === 1) valRevolt = "➖";
        else valRevolt = "❌";
        html += `
        <tr>
            <td id="name">${e.Name}</td>
            <td>${e.Arguments.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</td>
            <td>${e.Description}</td>
            <td class="opt">${e.Restrictions}</td>
            <td class="opt">${e.Aliases}</td>
            <td class="opt small">${valDiscord}</td>
            <td class="opt small">${valRevolt}</td>
        </tr>
        `;
    }
    document.getElementById("documentation").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes('?')) {
        let parsing = new URLSearchParams(window.location.href.split('?')[1]);
        if (parsing.has("page")) {
            displayPage(parsing.get("page"));
        }
    }
});

let data = {};

let http = new XMLHttpRequest();
http.open("GET", "api/help.php", false);
http.onreadystatechange = function ()
{
    if (this.readyState === 4)
    {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let modulesStr = "";
            for (let e of json) {
                modulesStr += `<li onclick="displayPage('${e.Name}')">${e.Name}</li>`;
                data[e.Name] = e["Commands"];
            }
            document.getElementById("moduleList").innerHTML = modulesStr;
        } else {
            console.error(`Error ${this.status} while loading help`);
        }
    }
};
http.send(null);