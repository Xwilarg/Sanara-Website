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
    + '<td>Request a doujinshi from <a href="https://nhentai.net">Nhentai</a></td><td>NSFW channel only</td></tr>'
    + tableOutro();
}

function displayGame() {
    document.getElementById("table").innerHTML =
    tableIntro('Ranking are available <a href="stats.html#games">in the stats page</a>.')
    + '<tr><td>Play shiritori</td>'
    + '<td>Play the shiritori game (you need to find a japanese word beginning by the ending of the previous one)</td><td>None</td></tr>'
    + '<tr><td>Play kancolle</td>'
    + '<td>Play the KanColle guess game (you need to identify shipgirls by an image)</td><td>None</td></tr>'
    + '<tr><td>Play azurlane</td>'
    + '<td>Play the Azur Lane guess game (you need to identify shipgirls by an image)</td><td>None</td></tr>'
    + '<tr><td>Play fatego</td>'
    + '<td>Play the Fate GO guess game (you need to identify characters by an image)</td><td>None</td></tr>'
    + '<tr><td>Play booru</td>'
    + '<td>Play the booru game (you need to identify tag of Gelbooru images)</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Play anime</td>'
    + '<td>Play the anime guess game (you need to identify an anime from an excerpt of it)</td><td>None</td></tr>'
    + '<tr><td>Score</td>'
    + '<td>Display your best scores compared to the other guilds</td><td>None</td></tr>'
    + '<tr><td>Cancel</td>'
    + '<td>Cancel the current game</td><td>None</td></tr>'
    + tableOutro()
    + '<div>Note: if you feel like you don\'t have enough time to answer, you can add \'easy\' at the end of the command.<br/>'
    + 'For the anime game, you can also add \'full\' to have more anime names (way harder).</div>';
}

function displayImage() {
    document.getElementById("table").innerHTML =
    tableIntro('Image manipulation.')
    + '<tr><td>Color [RGB/Hexa/Name]</td>'
    + '<td>Display a color along with it RGB and Hexadecimal values</td><td>None</td></tr>'
    + tableOutro();
}

function displayInformation() {
    document.getElementById("table").innerHTML =
    tableIntro('Information about the bot.')
    + '<tr><td>Help [module name/page]</td>'
    + '<td>Display the help</td><td>None</td></tr>'
    + '<tr><td>GDPR</td>'
    + '<td>Show the informations the bot stored about the guild</td><td>None</td></tr>'
    + '<tr><td>Status</td>'
    + '<td>Display available services</td><td>None</td></tr>'
    + '<tr><td>Invite</td>'
    + '<td>Get bot invite link</td><td>None</td></tr>'
    + tableOutro();
}

function displayKantaiCollection() {
    document.getElementById("table").innerHTML =
    tableIntro('Information about the browser game <a href="http://www.dmm.com/netgame/feature/kancolle.html">Kantai Collection</a>.')
    + '<tr><td>Kancolle charac [shipgirl]</td>'
    + '<td>Give informations about a shipgirl from KanColle wikia</td><td>None</td></tr>'
    + '<tr><td>Kancolle drop [shipgirl]</td>'
    + '<td>Give informations about where you can find a shipgirl in Kancolle</td><td>None</td></tr>'
    + tableOutro();
}

function displayLinguistic() {
    document.getElementById("table").innerHTML =
    tableIntro('Everything about languages.')
    + '<tr><td>Japanese [word]</td>'
    + '<td>Translate a word in both japanese and english</td><td>None</td></tr>'
    + '<tr><td>Translation [language] [sentence/link to image]</td>'
    + '<td>Translate a sentence in the language given</td><td>None</td></tr>'
    + '<tr><td>Urban [word]</td>'
    + '<td>Define a word using Urban Dictionnary</td><td>None</td></tr>'
    + tableOutro();
}

function displayRadio() {
    document.getElementById("table").innerHTML =
    tableIntro('Listening to music in a vocal channel.')
    + '<tr><td>Radio launch</td>'
    + '<td>Make the bot join you in a vocal channel</td><td>None</td></tr>'
    + '<tr><td>Radio add [YouTube url/keywords]</td>'
    + '<td>Add a song to the playlist</td><td>None</td></tr>'
    + '<tr><td>Radio playlist</td>'
    + '<td>Display current playlist</td><td>None</td></tr>'
    + '<tr><td>Radio skip</td>'
    + '<td>Skip the song currently played</td><td>None</td></tr>'
    + '<tr><td>Radio stop</td>'
    + '<td>Stop the radio and leave the vocal channel</td><td>None</td></tr>'
    + tableOutro();
}

function displaySettings() {
    document.getElementById("table").innerHTML =
    tableIntro('Modifying Sanara features and behaviour.')
    + '<tr><td>Language [language]</td>'
    + '<td>Set the language of the bot for this guild</td><td>Guild owner only</td></tr>'
    + '<tr><td>Prefix [(optional) prefix]</td>'
    + '<td>Set the prefix of the bot for this guild</td><td>Guild owner only</td></tr>'
    + '<tr><td>Reload language</td>'
    + '<td>Reload translation language files</td><td>Bot owner only</td></tr>'
    + '<tr><td>Leave [(optional) name]</td>'
    + '<td>Leave the guild given in parameter or the current one if none specified</td><td>Bot owner only</td></tr>'
    + '<tr><td>Exit</td>'
    + '<td>Exit the bot</td><td>Bot owner only</td></tr>'
    + '<tr><td>Enable [module name]</td>'
    + '<td>Enable a module</td><td>Guild owner only</td></tr>'
    + '<tr><td>Disable [module name]</td>'
    + '<td>Disable a module</td><td>Guild owner only</td></tr>'
    + '<tr><td>ResetDb [(optional) name]</td>'
    + '<td>Reset the database of the guild given in parameter or the current one if none specified</td><td>Bot owner only</td></tr>'
    + '<tr><td>Eval</td>'
    + '<td>Evaluate the given expression</td><td>Bot owner only</td></tr>'
    + tableOutro();
}

function displayVisualNovel() {
    document.getElementById("table").innerHTML =
    tableIntro('A Visual Novel is a combinaison of a novel and computer game: overall it\'s a text based storyline with little interraction over an anime-style background.')
    + '<tr><td>Vn [visual novel]</td>'
    + '<td>Give informations about a visual novel</td><td>None</td></tr>'
    + tableOutro();
}

function displayXkcd() {
    document.getElementById("table").innerHTML =
    tableIntro('<a href="https://xkcd.com/">XKCD</a> is a webcomic serie.')
    + '<tr><td>Xkcd [(optional) comic id]</td>'
    + '<td>Give a random xkcd comic</td><td>None</td></tr>'
    + tableOutro();
}

function displayYouTube() {
    document.getElementById("table").innerHTML =
    tableIntro('Interactions with the video-sharing website <a href="http://youtube.com">YouTube</a>.')
    + '<tr><td>Youtube [keywords]</td>'
    + '<td>Give a YouTube video given some keywords</td><td>None</td></tr>'
    + tableOutro();
}