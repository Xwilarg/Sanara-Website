document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes('?')) {
        let parsing = new URLSearchParams(window.location.href.split('?')[1]);
        if (parsing.has("page")) {
            displayPage(parsing.get("page"));
        }
    }
});

function tableIntro(introLine, displayNbOfPlayers) {
    return '<nav id="intro">' + introLine + '</nav><table><tr><th>Name</th><th id="description'+ (displayNbOfPlayers ? 'Small' : '') + '">Description</th>' + (displayNbOfPlayers ? '<th id="small">Nb of players</th>' : '') + '<th>Sub-module</th><th>Restriction</th></tr>';
}

function tableOutro() {
    return '</table>';
}

function displayCommunity() {
    document.getElementById("table").innerHTML =
    tableIntro('You must at first do the "Profile show" command to access these features.', false)
    + '<tr><td>Profile get [(optional) user]</td>'
    + '<td>Get the profile of an user ; you must begin by generating your own to use this module</td><td>Community</td><td>None</td></tr>'
    + '<tr><td>Profile description [(optional) description]</td>'
    + '<td>Change the description of your profile</td><td>Community</td><td>None</td></tr>'
    + '<tr><td>Profile color [color]</td>'
    + '<td>Change the background color of your profile</td><td>Community</td><td>None</td></tr>'
    + '<tr><td>Profile visibility [public/friend only/private]</td>'
    + '<td>Change the visibility of your profile</td><td>Community</td><td>None</td></tr>'
    + '<tr><td>Profile friend [user]</td>'
    + '<td>Add an user to your friends</td><td>Community</td><td>None</td></tr>'
    + '<tr><td>Profile unfriend [user]</td>'
    + '<td>Remove an user from your friends</td><td>Community</td><td>None</td></tr>'
    + '<tr><td>Profile save all</td>'
    + '<td>Force all profiles to be saved in the database</td><td>Community</td><td>Bot owner only</td></tr>'
    + tableOutro();
}

function displayImage() {
    document.getElementById("table").innerHTML =
    tableIntro('Get images and various other related stuff.', false)
    + '<tr><td>Source [url/image]</td>'
    + '<td>Give the source of an image</td><td>Booru</td><td>None</td></tr>'
    + '<tr><td>Safebooru [(optional)tags]</td>'
    + '<td>Request a random image from <a href="https://safebooru.org">Safebooru</a> (only SFW images)</td><td>Booru</td><td>None</td></tr>'
    + '<tr><td>Konachan [(optional)tags]</td>'
    + '<td>Request a random image from <a href="http://konachan.com">Konachan</a> (only wallpapers)</td><td>Booru</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Gelbooru [(optional)tags]</td>'
    + '<td>Request a random image from <a href="https://gelbooru.com">Gelbooru</a> (no particular rules)</td><td>Booru</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Rule34 [(optional)tags]</td>'
    + '<td>Request a random image from <a href="https://rule34.xxx/">Rule 34</a> (mostly weird images)</td><td>Booru</td><td>NSFW channel only</td></tr>'
    + '<tr><td>E621 [(optional)tags]</td>'
    + '<td>Request a random image from <a href="https://e621.net">E621</a> (mostly furries)</td><td>Booru</td><td>NSFW channel only</td></tr>'
    + '<tr><td>E926 [(optional)tags]</td>'
    + '<td>Request a random image from <a href="https://e926.net/">E926</a> (mostly furries, only SFW images)</td><td>Booru</td><td>None</td></tr>'
    + '<tr><td>Tags [id]</td>'
    + '<td>Get more information about an image previously given by Sanara</td><td>Booru</td><td>None</td></tr>'
    + '<tr><td>Doujinshi [(optional)tags / id]</td>'
    + '<td>Request a manga doujinshi from <a href="https://nhentai.net">Nhentai</a></td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Download doujinshi [doujinshi id]</td>'
    + '<td>Download a doujinshi in ZIP format</td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Download cosplay [cosplay id]</td>'
    + '<td>Download a cosplay in ZIP format</td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Cosplay [(optional)tags]</td>'
    + '<td>Request a cosplay from <a href="https://e-hentai.org">E-Hentai</a></td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + '<tr><td>AdultVideo [(optional)tag]</td>'
    + '<td>Request a porn video from <a href="https://www5.javmost.com">JavMost</a></td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Subscribe doujinshi [channel] [(optional)full] [(optional)whitelist/blacklist]</td>'
    + '<td>Choose a channel to receive a message everytimes a new doujinshi is released. You can also provides tags that will be whitelisted or blacklisted. The full option remove all default blacklisted tags.</td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Unsubscribe doujinshi</td>'
    + '<td>Remove a subscription</td><td>Doujinshi</td><td>NSFW channel only</td></tr>'
    + tableOutro()
    + '<div><h3>How to apply tags for subcription command</h3><br/>'
    + 'Sanara won\'t show any doujinshi that have blacklisted tags. If you have a whitelist, she\'ll also only show doujinshi that have at least one of the whitelisted tag<br/>'
    + 'Some tags are blacklisted by default (you can disable that by doing the subscribe command with the \'full\' argument). You can see their full list here: <a target="_blank" href="https://github.com/Xwilarg/Sanara/blob/master/SanaraV2/Subscription/SubscriptionTags.cs#L115">https://github.com/Xwilarg/Sanara/blob/master/SanaraV2/Subscription/SubscriptionTags.cs#L115</a><br/>'
    + 'You can add tags to whitelist by doing +tagName (example: +english) and to blacklist by doing (example: -x-ray). You can also remove a tag that was previously added with *tag (example: *futanari)<br/>'
    + 'If your tag contains a space in it, put it between double quote (example: "+full color"), make sure to have the correct tag or the functionnality won\'t work!</div>';
}

function displayJapan() {
    document.getElementById("table").innerHTML =
    tableIntro('Commands related to Japan culture.', false)
    + '<tr><td>Anime [name]</td>'
    + '<td>Give information about an anime</td><td>Anime/Manga</td><td>None</td></tr>'
    + '<tr><td>Manga [name]</td>'
    + '<td>Give information about a manga</td><td>Anime/Manga</td><td>None</td></tr>'
    + '<tr><td>LN [name]</td>'
    + '<td>Give information about a light novel</td><td>Anime/Manga</td><td>None</td></tr>'
    + '<tr><td>Subscribe anime [channel]</td>'
    + '<td>Choose a channel to receive a message everytimes a new anime is released</td><td>Anime/Manga</td><td>None</td></tr>'
    + '<tr><td>Unsubscribe anime</td>'
    + '<td>Remove a subscription</td><td>Anime/Manga</td><td>None</td></tr>'
    + '<tr><td>Kancolle charac [shipgirl]</td>'
    + '<td>Give informations about a shipgirl from KanColle wikia</td><td>Kantai Collection</td><td>None</td></tr>'
    + '<tr><td>Arknights charac [name]</td>'
    + '<td>Give informations an Arknights\'s operator</td><td>Arknights</td><td>None</td></tr>'
    + '<tr><td>Vn [visual novel]</td>'
    + '<td>Give informations about a visual novel</td><td>Vn</td><td>None</td></tr>'
    + tableOutro();
}

function displayGame() {
    document.getElementById("table").innerHTML =
    tableIntro('Play with Sanara in a text channel, ranking are available <a href="stats.html#games">in the stats page</a>.', true)
    + '<tr><td>Play shiritori</td>'
    + '<td>Play the shiritori game (you need to find a japanese word beginning by the ending of the previous one)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play kancolle</td>'
    + '<td>Play the KanColle guess game (you need to identify shipgirls by an image)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play arknights</td>'
    + '<td>Play the Arknights guess game (you need to identify operators by an image)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play azurlane</td>'
    + '<td>Play the Azur Lane guess game (you need to identify shipgirls by an image)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play fatego</td>'
    + '<td>Play the Fate GO guess game (you need to identify characters by an image)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play booru</td>'
    + '<td>Play the booru game (you need to identify tag of Gelbooru images)</td><td>1+</td><td>Game</td><td>NSFW channel only</td></tr>'
    + '<tr><td>Play anime</td>'
    + '<td>Play the anime guess game (you need to identify an anime from an excerpt of it)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play pokemon</td>'
    + '<td>Play the Pokemon game (you need to identify pokemons by an image)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play girlsfrontline</td>'
    + '<td>Play the Girl\'s Frontline game (you need to identify T-Dolls by an image)</td><td>1+</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Play reversi</td>'
    + '<td>Play the Reversi game (you need to capture opponent\'s disks)</td><td>2</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Score</td>'
    + '<td>Display your best scores compared to the other guilds</td><td>N/A</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Cancel</td>'
    + '<td>Cancel the current game</td><td>N/A</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Join</td>'
    + '<td>Join a multiplayer lobby</td><td>N/A</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Leave</td>'
    + '<td>Leave a multiplayer lobby</td><td>N/A</td><td>Game</td><td>None</td></tr>'
    + '<tr><td>Start</td>'
    + '<td>Force a multiplayer game to start</td><td>N/A</td><td>Game</td><td>None</td></tr>'
    + tableOutro()
    + '<div>Note: if you feel like you don\'t have enough time to answer, you can add \'easy\' at the end of the command.<br/>'
    + 'Some game also have additional difficulties:<br/>'
    + 'For the anime game, you can also add \'full\' to have more anime names (way harder).<br/>'
    + 'Quizz based game can have the option \'crop\' that display only half of the image.<br/>'
    + 'They can also have the \'shadow\' option that only display the shadow of the image.<br/><br/>'
    + 'To play against someone else, add \'multiplayer\' at the end of the command.<br/>'
    + 'For all solo game the final score is shared with the guild so anyone can play with you.</div>';
}

function displayRadio() {
    document.getElementById("table").innerHTML =
    tableIntro('Listen to music in a vocal channel.', false)
    + '<tr><td>Radio launch</td>'
    + '<td>Make the bot join you in a vocal channel</td><td>Radio</td><td>None</td></tr>'
    + '<tr><td>Radio add [YouTube url/keywords]</td>'
    + '<td>Add a song to the playlist</td><td>Radio</td><td>None</td></tr>'
    + '<tr><td>Radio playlist</td>'
    + '<td>Display current playlist</td><td>Radio</td><td>None</td></tr>'
    + '<tr><td>Radio skip</td>'
    + '<td>Skip the song currently played</td><td>Radio</td><td>None</td></tr>'
    + '<tr><td>Radio remove [name/index]</td>'
    + '<td>Remove the song given in parameter</td><td>Radio</td><td>None</td></tr>'
    + '<tr><td>Radio stop</td>'
    + '<td>Stop the radio and leave the vocal channel</td><td>Radio</td><td>None</td></tr>'
    + tableOutro();
}

function displaySettings() {
    document.getElementById("table").innerHTML =
    tableIntro('Modify Sanara\'s behaviour and get important information.', false)
    + '<tr><td>Help [module name/page]</td>'
    + '<td>Display the help</td><td>Information</td><td>None</td></tr>'
    + '<tr><td>GDPR</td>'
    + '<td>Show the informations the bot stored about the guild</td><td>Information</td><td>None</td></tr>'
    + '<tr><td>Status</td>'
    + '<td>Display available services</td><td>Information</td><td>None</td></tr>'
    + '<tr><td>Invite</td>'
    + '<td>Get the bot invite link</td><td>Information</td><td>None</td></tr>'
    + '<tr><td>Logs</td>'
    + '<td>Get the last changes about the bot</td><td>Information</td><td>None</td></tr>'
    + '<tr><td>Error [id]</td>'
    + '<td> Give explanations about an error</td><td>Information</td><td>None</td></tr>'
    + '<tr><td>Language [language]</td>'
    + '<td>Set the language of the bot for this guild</td><td>Settings</td><td>Guild Admin only</td></tr>'
    + '<tr><td>Prefix [(optional) prefix]</td>'
    + '<td>Set the prefix of the bot for this guild</td><td>Settings</td><td>Guild Admin only</td></tr>'
    + '<tr><td>Reload language</td>'
    + '<td>Reload translation language files</td><td>Settings</td><td>Bot owner only</td></tr>'
    + '<tr><td>Exit [(optional) name]</td>'
    + '<td>Leave the guild given in parameter or the current one if none specified</td><td>Settings</td><td>Bot owner only</td></tr>'
    + '<tr><td>Enable [module name/all]</td>'
    + '<td>Enable a module</td><td>Settings</td><td>Guild Admin only</td></tr>'
    + '<tr><td>Disable [module name/all]</td>'
    + '<td>Disable a module</td><td>Settings</td><td>Guild Admin only</td></tr>'
    + '<tr><td>Eval</td>'
    + '<td>Evaluate the given expression</td><td>Settings</td><td>Bot owner only</td></tr>'
    + tableOutro();
}

function displayMedia() {
    document.getElementById("table").innerHTML =
    tableIntro('Interract with various medias.', false)
    + '<tr><td>Xkcd [(optional) comic id/last]</td>'
    + '<td>Give a random xkcd comic</td><td>Xkcd</td><td>None</td></tr>'
    + '<tr><td>Youtube [keywords]</td>'
    + '<td>Give a YouTube video given some keywords</td><td>Youtube</td><td>None</td></tr>'
    + tableOutro();
}

function displayTools() {
    document.getElementById("table").innerHTML =
    tableIntro('Various useful tools.', false)
    + '<tr><td>Japanese [word]</td>'
    + '<td>Translate a word in both japanese and english</td><td>Linguistic</td><td>None</td></tr>'
    + '<tr><td>Kanji [word/kanji]</td>'
    + '<td>Get information about a kanji</td><td>Linguistic</td><td>None</td></tr>'
    + '<tr><td>Translation [language] [sentence/link to image]</td>'
    + '<td>Translate a sentence in the language given</td><td>Linguistic</td><td>None</td></tr>'
    + '<tr><td>Urban [word]</td>'
    + '<td>Define a word using Urban Dictionnary</td><td>Linguistic</td><td>None</td></tr>'
    + '<tr><td>Color [(optional) RGB/Hexa/Name]</td>'
    + '<td>Display a color along with it RGB and Hexadecimal values</td><td>Code</td><td>None</td></tr>'
    + '<tr><td>Shell [command]</td>'
    + '<td>Explain the different parts of a Shell command</td><td>Code</td><td>None</td></tr>'
    + '<tr><td>Increase [link to an image]</td>'
    + '<td>Make an image twice bigger</td><td>Code</td><td>None</td></tr>'
    + tableOutro();
}

function displayDiscord() {
    document.getElementById("table").innerHTML =
    tableIntro('Various interractions with Discord.', false)
    + '<tr><td>Infos [user]</td>'
    + '<td>Give informations about an user</td><td>Communication</td><td>None</td></tr>'
    + '<tr><td>BotInfos</td>'
    + '<td>Give informations about the bot</td><td>Communication</td><td>None</td></tr>'
    + '<tr><td>Quote [(optional) Message ID]</td>'
    + '<td>Quote a message</td><td>Communication</td><td>None</td></tr>'
    + '<tr><td>Poll [title] [choice 1] [choice 2] [etc...]</td>'
    + '<td>Create a poll</td><td>Communication</td><td>None</td></tr>'
    + '<tr><td>Calc [expression]</td>'
    + '<td>Calculate basic math expression</td><td>Communication</td><td>None</td></tr>'
    + '<tr><td>Complete [sentence]</td>'
    + '<td>Continue a sentence using machine learning</td><td>Communication</td><td>None</td></tr>'
    + tableOutro();
}