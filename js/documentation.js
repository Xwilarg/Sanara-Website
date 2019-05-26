function trigger(idName) {
    if (document.getElementById("explanation" + idName).hidden) {
        document.getElementById("explanation" + idName).hidden = false;
        document.getElementById("right" + idName).innerHTML = "▲";
    } else {
        document.getElementById("explanation" + idName).hidden = true;
        document.getElementById("right" + idName).innerHTML = "▼";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes('?')) {
        let parsing = new URLSearchParams(window.location.href.split('?')[1]);
        if (parsing.has("display") && typeof document.getElementById("explanation" + parsing.get("display")) !== "undefined") {
            trigger(parsing.get("display"));
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
});