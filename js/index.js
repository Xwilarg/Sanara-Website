function updateInfos() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            document.getElementById("cmdLaunched").innerHTML = response.sanara.commands_sum + response.hanaki.commands_sum;
            document.getElementById("serverCount").innerHTML = response.sanara.guild_count.count;
        }
    }
    xmlhttp.open("GET", "../api/stats.php", true);
    xmlhttp.send();
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("githubStars").innerHTML = JSON.parse(this.responseText).stargazers_count;
        }
    }
    xmlhttp2.open("GET", "https://api.github.com/repos/xwilarg/sanara", true);
    xmlhttp2.send();
}

updateInfos();
window.setInterval(updateInfos, 60000); // Every minute

const images = [
    "https://github.com/Xwilarg/Sanara/blob/master/Preview/Cosplay.png?raw=true",
    "https://github.com/Xwilarg/Sanara/blob/master/Preview/Game.png?raw=true",
    "https://github.com/Xwilarg/Sanara/blob/master/Preview/Subscription.png?raw=true",
    "https://github.com/Xwilarg/Sanara/blob/master/Preview/Translate.png?raw=true"
]
let imgIndex = 0;

function showNextImage() {
    imgIndex++;
    if (imgIndex == images.length) {
        imgIndex = 0;
    }

    document.getElementById("carousel-image").src = images[imgIndex];
}
window.setInterval(showNextImage, 5000);