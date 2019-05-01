function tableIntro(introLine) {
    return '<nav id="intro">' + introLine + '</nav><table><tr><th>Name</th><th>Description</th><th>Availability</th><th>NSFW</th></tr>';
}

function tableOutro() {
    return '</table>';
}

function displayAnimeManga() {
    document.getElementById("table").innerHTML =
    tableIntro('Information about anime and manga using <a href="https://kitsu.io">Kitsu</a>.')
    + tableOutro();
}

function displayBooru() {
    document.getElementById("table").innerHTML =
    tableIntro('Images from \'booru\' imageboards.')
    + tableOutro();
}

function displayCommunication() {
    document.getElementById("table").innerHTML =
    tableIntro('Various utility commands.')
    + tableOutro();
}

function displayDoujinshi() {
    document.getElementById("table").innerHTML =
    tableIntro('Doujinshi are mangas made by amators.')
    + tableOutro();
}

function displayGame() {
    document.getElementById("table").innerHTML =
    tableIntro('Ranking are available <a href="stats.html#games">in the stats page</a>.')
    + tableOutro();
}

function displayImage() {
    document.getElementById("table").innerHTML =
    tableIntro('.')
    + tableOutro();
}