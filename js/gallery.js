function get2DigitsNumber(nb) {
    if (nb < 10) return "0" + nb;
    else return nb;
}

function showPopup(name, source, imageGroup, nbImages) {
    document.getElementById("popup").hidden = false;
    document.getElementById("popupAuthorName").innerHTML = name;
    let finalHtml = "";
    for (let i = 1; i <= nbImages; i++) {
        finalHtml += "<img src='img/Gallery/" + imageGroup + "_" + get2DigitsNumber(i) + ".jpg'/><br/>"
    }
    document.getElementById("popupImages").innerHTML = finalHtml;
    document.getElementById("popupSource").href = source;
}

document.addEventListener("mousedown", function(e) {
    if (!document.getElementById('popup').contains(e.target)) {
        document.getElementById("popup").hidden = true;
    }
});
