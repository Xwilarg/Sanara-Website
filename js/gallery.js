function get2DigitsNumber(nb) {
    if (nb < 10) return "0" + nb;
    else return nb;
}

function showPopup(name, authorUrl, source, imageGroup, nbImages, nsfwStarting, ext) {
    if (source === null) popupSource.classList.add("hidden")
    else popupSource.classList.remove("hidden")

    document.getElementById("popup").classList.remove("hidden")
    document.getElementById("popupAuthorName").innerHTML = `<a href="${authorUrl}" target="_blank">${name}</a>`;
    let finalHtml = "";
    for (let i = 1; i <= nbImages; i++) {
        finalHtml += "<img"
        if (nsfwStarting !== undefined && i >= nsfwStarting)
        {
            finalHtml += ' class="nsfw"'
        }
        finalHtml += " src='gallery/" + imageGroup + "_" + get2DigitsNumber(i) + "." + ext + "'/><br/>"
    }
    document.getElementById("popupImages").innerHTML = finalHtml;
    if (source === undefined) document.getElementById("popupSource").classList.add("hidden");
    else document.getElementById("popupSource").classList.remove("hidden");
    document.getElementById("popupSource").href = source;
}
