function tableIntro(introLine) {
    return '<nav id="intro">' + introLine + '</nav><table><tr><th>Name</th><th>Description</th><th>Availability</th></tr>';
}

function tableOutro() {
    return '</table>';
}

function displayAnimeManga() {
    document.getElementById("table").innerHTML =
    tableIntro('Information about anime and manga using <a href="https://kitsu.io">Kitsu</a>.')
    + '<tr><td>Anime [name]</td>'
    + '<td>Give information about an anime</td><td>None</td></tr>'
    + '<tr><td>Manga [name]</td>'
    + '<td>Give information about a manga</td><td>None</td></tr>'
    + tableOutro();
}

function displayBooru() {
    document.getElementById("table").innerHTML =
    tableIntro('Images from \'booru\' imageboards.')
    + '<tr><td>Safebooru [tags]</td>'
    + '<td>Request a random image from <a href="https://safebooru.org">Safebooru</a> (only SFW images)</td><td>None</td></tr>'
    + '<tr><td>Konachan [tags]</td>'
    + '<td>Request a random image from <a href="http://konachan.com">Konachan</a> (only wallpapers)</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Gelbooru [tags]</td>'
    + '<td>Request a random image from <a href="https://gelbooru.com">Gelbooru</a> (no particular rules)</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Rule34 [tags]</td>'
    + '<td>Request a random image from <a href="https://rule34.xxx/">Rule 34</a> (mostly weird images)</td><td>NSFW channel only</td></tr>'
    + '<tr><td>E621 [tags]</td>'
    + '<td>Request a random image from <a href="https://e621.net">E621</a> (mostly furries)</td><td>NSFW channel only</td></tr>'
    + '<tr><td>E926 [tags]</td>'
    + '<td>Request a random image from <a href="https://e926.net/">E926</a> (mostly furries, only SFW images)</td><td>None</td></tr>'
    + tableOutro();
}

function displayCommunication() {
    document.getElementById("table").innerHTML =
    tableIntro('Various utility commands to interract with Discord.')
    + '<tr><td>Infos [user]</td>'
    + '<td>Give informations about an user</td><td>None</td></tr>'
    + '<tr><td>BotInfos</td>'
    + '<td>Give informations about the bot</td><td>None</td></tr>'
    + '<tr><td>Quote [(optional) Message ID]</td>'
    + '<td>Quote a message</td><td>None</td></tr>'
    + tableOutro();
}

function displayDoujinshi() {
    document.getElementById("table").innerHTML =
    tableIntro('Doujinshi are mangas made by amators.')
    + '<tr><td>Doujinshi [tags]</td>'
    + '<td>Request a doujinshi from Nhentai</td><td>NSFW channel only</td></tr>'
    + tableOutro();
}

function displayGame() {
    document.getElementById("table").innerHTML =
    tableIntro('Ranking are available <a href="stats.html#games">in the stats page</a>.')
    + tableOutro();
}

function displayImage() {
    document.getElementById("table").innerHTML =
    tableIntro('Image manipulation.')
    + tableOutro();
}

function displayInformation() {
    document.getElementById("table").innerHTML =
    tableIntro('Information about the bot.')
    + tableOutro();
}

function displayKantaiCollection() {
    document.getElementById("table").innerHTML =
    tableIntro('Information about the browser game <a href="http://www.dmm.com/netgame/feature/kancolle.html">Kantai Collection</a>.')
    + tableOutro();
}

function displayLinguistic() {
    document.getElementById("table").innerHTML =
    tableIntro('Everything about languages.')
    + tableOutro();
}

function displayRadio() {
    document.getElementById("table").innerHTML =
    tableIntro('Listening to music in a vocal channel.')
    + tableOutro();
}

function displaySettings() {
    document.getElementById("table").innerHTML =
    tableIntro('Modifying Sanara features and behaviour.')
    + tableOutro();
}

function displayVisualNovel() {
    document.getElementById("table").innerHTML =
    tableIntro('A Visual Novel is a combinaison of a novel and computer game: overall it\'s a text based storyline with little interraction over an anime-style background.')
    + tableOutro();
}

function displayXkcd() {
    document.getElementById("table").innerHTML =
    tableIntro('<a href="https://xkcd.com/">XKCD</a> is a webcomic serie.')
    + tableOutro();
}

function displayYouTube() {
    document.getElementById("table").innerHTML =
    tableIntro('Interactions with the video-sharing website <a href="http://youtube.com">YouTube</a>.')
    + tableOutro();
}