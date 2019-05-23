function trigger(idName) {
    if (document.getElementById("explanation" + idName).hidden) {
        document.getElementById("explanation" + idName).hidden = false;
        document.getElementById("right" + idName).innerHTML = "▲";
    } else {
        document.getElementById("explanation" + idName).hidden = true;
        document.getElementById("right" + idName).innerHTML = "▼";
    }
}