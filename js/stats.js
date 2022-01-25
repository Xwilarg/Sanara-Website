let response;
let options = {
    title: '',
    isStacked: true,
    legend: {
        position: 'right',
        textStyle: {color: "#eee"}
    },
    backgroundColor: "#181a1b",
    titleTextStyle: {color: "#eee"},
    width: '100%',
    height: 300
};

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            response = JSON.parse(this.responseText);

            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(drawErrors);
            google.charts.setOnLoadCallback(drawCommandServs);
            google.charts.setOnLoadCallback(drawBooru);
            google.charts.setOnLoadCallback(drawGames);
            google.charts.setOnLoadCallback(drawGamePlayers);
            google.charts.setOnLoadCallback(drawDownload);
        } else {
            console.error(`Error code ${this.status}`);
        }
    }
}
xmlhttp.open("GET", "../api/stats.php", true);
xmlhttp.send();

function drawCommandServs() {
    let modules = ['Date'];

    // Headers
    for (let i = 0; i < 20; i++) {
        if (response.sanara.commands[i] !== null) {
            for (let mod in response.sanara.commands[i]) {
                if (!modules.includes(mod)) {
                    modules.push(mod);
                }
            }
        }
        if (response.hanaki.commands[i] !== null) {
            for (let mod in response.hanaki.commands[i]) {
                if (!modules.includes(mod)) {
                    modules.push(mod);
                }
            }
        }
    }

    let arrData = [modules];
    // Values
    for (let i = 29; i >= 0; i--) {
        let arr = [];
        if (i === 0) {
            arr.push("Now");
        } else {
            arr.push(`-${i}H`);
        }
        for (let mod of modules.slice(1)) {
            let value = 0;
            let valS = response.sanara.commands[i];
            let valH = response.sanara.commands[i];
            if (valS !== null && valS[mod] !== undefined) {
                value += valS[mod];
            }
            if (valH !== null && valH[mod] !== undefined) {
                value += valH[mod];
            }
            arr.push(value);
        }
        arrData.push(arr);
    }

    let data = google.visualization.arrayToDataTable(arrData);
    options.title = 'Commands usage';
    let chart = new google.visualization.LineChart(document.getElementById('commandsChart'));
    chart.draw(data, options);
}

function drawErrors() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Return status");
    array[0].push("Nb of occurance");
    let i = 0;
    let dict = {};
    for (let key in response.sanara.errors) {
        dict[key] = parseInt(response.sanara.errors[key]);
    }
    for (let key in response.hanaki.errors) {
        if (dict[key] === undefined) {
            dict[key] = parseInt(response.hanaki.errors[key]);
        } else {
            dict[key] += parseInt(response.hanaki.errors[key]);
        }
    }
    for (let key in dict) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(dict[key]);
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Errors encountered (daily)';
    let chart = new google.visualization.PieChart(document.getElementById('errorsChart'));
    chart.draw(data, options);
}

function drawGames() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Game");
    array[0].push("Nb of occurance");
    let i = 0;
    let dict = {};
    for (let key in response.sanara.games) {
        dict[key] = parseInt(response.sanara.games[key]);
    }
    for (let key in response.hanaki.games) {
        if (dict[key] === undefined) {
            dict[key] = parseInt(response.hanaki.games[key]);
        } else {
            dict[key] += parseInt(response.hanaki.games[key]);
        }
    }
    for (let key in dict) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(dict[key]);
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Games played (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('gamesChart'));
    chart.draw(data, options);
}

function drawGamePlayers() {
    let data = google.visualization.arrayToDataTable([]);
    options.isStacked = true;
    options.title = 'Games per players (monthly)';
    let chart = new google.visualization.ColumnChart(document.getElementById('gamePlayersChart'));
    chart.draw(data, options);
}

function drawDownload() {
    let array = new Array();
    array.push(new Array());
    array.push(new Array());
    array.push(new Array());
    array[0].push("Command");
    array[0].push("Size downloaded (MB)");
    array[1].push("Doujinshi");
    if (response.sanara.download.Doujinshi == undefined) {
        array[1].push(0);
    } else {
        array[1].push(response.sanara.download.Doujinshi / 1000);
    }
    array[2].push("Cosplay");
    if (response.sanara.download.Cosplay == undefined) {
        array[2].push(0);
    } else {
        array[2].push(response.sanara.download.Cosplay / 1000);
    }
    let data = google.visualization.arrayToDataTable(array);
    options.title = 'Size downloaded (daily)';
    let chart = new google.visualization.ColumnChart(document.getElementById('downloadChart'));
    chart.draw(data, options);
}

function drawBooru() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Booru");
    array[0].push("Nb of occurance");
    let i = 0;
    let dict = {};
    for (let key in response.sanara.booru) {
        dict[key] = parseInt(response.sanara.booru[key]);
    }
    for (let key in response.hanaki.booru) {
        if (dict[key] === undefined) {
            dict[key] = parseInt(response.hanaki.booru[key]);
        } else {
            dict[key] += parseInt(response.hanaki.booru[key]);
        }
    }
    for (let key in dict) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(dict[key]);
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Booru used (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('booruChart'));
    chart.draw(data, options);
}