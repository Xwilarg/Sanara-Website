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
            google.charts.setOnLoadCallback(drawCommandPerBot);
            google.charts.setOnLoadCallback(drawBooru);
            google.charts.setOnLoadCallback(drawGames);
            google.charts.setOnLoadCallback(drawGamesPlayers);
            google.charts.setOnLoadCallback(drawGamesTypes);
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
            let valH = response.hanaki.commands[i];
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


function drawCommandPerBot() {
    let headers = ['Date', 'Sanara', 'Hanaki'];

    let arrData = [headers];
    // Values
    for (let i = 29; i >= 0; i--) {
        let arr = [];
        if (i === 0) {
            arr.push("Now");
        } else {
            arr.push(`-${i}H`);
        }
        if (response.sanara.commands[i] === null) {
            arr.push(0);
        } else {
            let count = 0;
            for (let val in response.sanara.commands[i]) {
                count += response.sanara.commands[i][val];
            }
            arr.push(count);
        }
        if (response.hanaki.commands[i] === null) {
            arr.push(0);
        } else {
            let count = 0;
            for (let val in response.hanaki.commands[i]) {
                count += response.hanaki.commands[i][val];
            }
            arr.push(count);
        }
        arrData.push(arr);
    }
    let data = google.visualization.arrayToDataTable(arrData);

    options.isStacked = true;
    options.title = 'Commands usage';
    let chart = new google.visualization.ColumnChart(document.getElementById('commandsPerBotChart'));
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
        dict[key] = response.sanara.errors[key];
    }
    for (let key in response.hanaki.errors) {
        if (dict[key] === undefined) {
            dict[key] = response.hanaki.errors[key];
        } else {
            dict[key] += response.hanaki.errors[key]    ;
        }
    }
    for (let key in dict) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(dict[key]);
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Errors encountered (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('errorsChart'));
    chart.draw(data, options);
}

function drawGames() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Game");
    array[0].push("Nb of occurance");
    let dict = {};
    for (let key in response.sanara.games) {
        let sum = 0;
        for (let type in response.sanara.games[key]) {
            for (let count in response.sanara.games[key][type]) {
                sum += response.sanara.games[key][type][count];
            }
        }
        dict[key] = sum;
    }
    for (let key in response.hanaki.games) {
        let sum = 0;
        for (let type in response.hanaki.games[key]) {
            for (let count in response.hanaki.games[key][type]) {
                sum += response.sanara.games[key][type][count];
            }
        }
        if (dict[key] === undefined) {
            dict[key] = sum;
        } else {
            dict[key] += sum;
        }
    }
    let i = 0;
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

function drawGamesPlayers() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Game");
    let max = 0;
    let dict = {};
    for (let key in response.sanara.games) {
        for (let type in response.sanara.games[key]) {
            for (let count in response.sanara.games[key][type]) {
                if (count > max) {
                    max = count;
                }
                if (dict[key] === undefined ) {
                    dict[key] = {};
                }
                if (dict[key][count] === undefined) {
                    dict[key][count] = response.sanara.games[key][type][count];
                } else {
                    dict[key][count] += response.sanara.games[key][type][count];
                }
            }
        }
    }
    for (let key in response.hanaki.games) {
        for (let type in response.hanaki.games[key]) {
            for (let count in response.hanaki.games[key][type]) {
                if (count > max) {
                    max = count;
                }
                if (dict[key] === undefined ) {
                    dict[key] = {};
                }
                if (dict[key][count] === undefined) {
                    dict[key][count] = response.hanaki.games[key][type][count];
                } else {
                    dict[key][count] += response.hanaki.games[key][type][count];
                }
            }
        }
    }
    for (let j = 1; j <= max; j++) {
        array[0].push(j.toString());
    }
    let i = 1;
    for (let key in dict) {
        array.push(new Array());
        array[i].push(key);
        for (let j = 1; j <= max; j++) {
            if (dict[key][j] === undefined) {
                array[i].push(0);
            } else {
                array[i].push(dict[key][j]);
            }
        }
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Players per Game played (monthly)';
    options.isStacked = 'percent';
    let chart = new google.visualization.ColumnChart(document.getElementById('gamesPlayersChart'));
    chart.draw(data, options);
}

function drawGamesTypes() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Game");
    array[0].push("Unknown");
    array[0].push("Cooperation");
    array[0].push("Versus");
    let max = 0;
    let dict = {};
    for (let key in response.sanara.games) {
        for (let type in response.sanara.games[key]) {
            let sum = 0;
            for (let count in response.sanara.games[key][type]) {
                if (count > 1) {
                    sum += response.sanara.games[key][type][count];
                }
            }
            if (dict[key] === undefined ) {
                dict[key] = {};
            }
            if (dict[key][type] === undefined) {
                dict[key][type] = sum;
            } else {
                dict[key][type] += sum;
            }
        }
    }
    for (let key in response.hanaki.games) {
        for (let type in response.hanaki.games[key]) {
            let sum = 0;
            for (let count in response.hanaki.games[key][type]) {
                if (count > 1) {
                    sum += response.hanaki.games[key][type][count];
                }
            }
            if (dict[key] === undefined ) {
                dict[key] = {};
            }
            if (dict[key][type] === undefined) {
                dict[key][type] = sum;
            } else {
                dict[key][type] += sum;
            }
        }
    }
    for (let j = 1; j <= max; j++) {
        array[0].push(j.toString());
    }
    let i = 1;
    for (let key in dict) {
        array.push(new Array());
        array[i].push(key);
        if (dict[key]["UNKNOWN"] === undefined) {
            array[i].push(0);
        } else {
            array[i].push(dict[key]["UNKNOWN"]);
        }
        if (dict[key]["COOPERATION"] === undefined) {
            array[i].push(0);
        } else {
            array[i].push(dict[key]["COOPERATION"]);
        }
        if (dict[key]["VERSUS"] === undefined) {
            array[i].push(0);
        } else {
            array[i].push(dict[key]["VERSUS"]);
        }
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Types per Game played, multiplayer only (monthly)';
    options.isStacked = 'percent';
    let chart = new google.visualization.ColumnChart(document.getElementById('gamesTypesChart'));
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
    if (response.sanara.download === null || response.sanara.download.Doujinshi === undefined) {
        array[1].push(0);
    } else {
        array[1].push(response.sanara.download.Doujinshi / 1000);
    }
    array[2].push("Cosplay");
    if (response.sanara.download === null || response.sanara.download.Cosplay === undefined) {
        array[2].push(0);
    } else {
        array[2].push(response.sanara.download.Cosplay / 1000);
    }
    let data = google.visualization.arrayToDataTable(array);
    options.title = 'Size downloaded (monthly)';
    options.isStacked = false;
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