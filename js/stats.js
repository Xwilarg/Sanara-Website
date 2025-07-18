let response;
let options = {
    title: '',
    isStacked: true,
    legend: {
        position: 'right',
        textStyle: {color: "#eee"}
    },
    backgroundColor: "transparent",
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

            google.charts.setOnLoadCallback(drawCommandRecap);
            google.charts.setOnLoadCallback(drawCommandSource);
            google.charts.setOnLoadCallback(drawDownload);
            google.charts.setOnLoadCallback(drawErrors);
            google.charts.setOnLoadCallback(drawCommandServs);
            google.charts.setOnLoadCallback(drawCommandPerPlatform);
            google.charts.setOnLoadCallback(drawBooru);
            google.charts.setOnLoadCallback(drawGames);
            google.charts.setOnLoadCallback(drawDownload);
        } else {
            console.error(`Error code ${this.status}`);
        }
    }
}
xmlhttp.open("GET", "../api/stats.php", true);
xmlhttp.send();

function drawCommandRecap() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Command");
    array[0].push("Nb of occurance");
    let i = 0;
    let dict = {};
    for (let key in response.sanara.commands_source) {
        for (let source in response.sanara.commands_source[key]) {
            if (dict[key] === undefined) {
                dict[key] = response.sanara.commands_source[key][source];
            } else {
                dict[key] += response.sanara.commands_source[key][source];
            }
        }
    }
    for (let key in response.hanaki.commands_source) {
        for (let source in response.hanaki.commands_source[key]) {
            if (dict[key] === undefined) {
                dict[key] = response.hanaki.commands_source[key][source];
            } else {
                dict[key] += response.hanaki.commands_source[key][source];
            }
        }
    }
    for (let key in dict) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(dict[key]);
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Commands usage (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('commandsRecapChart'));
    chart.draw(data, options);
}

function drawCommandSource() {
    let array = new Array();
    array.push(new Array(), new Array(), new Array());
    array[0].push("Command source");
    array[0].push("Nb of occurance");
    let i = 0;
    let dict = {};
    let sumSlashCommands = 0;
    let sumBotPing = 0;
    for (let key in response.sanara.commands_source) {
        for (let source in response.sanara.commands_source[key]) {
            if (source === "Slash Commands") {
                sumSlashCommands += response.sanara.commands_source[key][source];
            } else {
                sumBotPing += response.sanara.commands_source[key][source];
            }
        }
    }
    for (let key in response.hanaki.commands_source) {
        for (let source in response.hanaki.commands_source[key]) {
            if (source === "Slash Commands") {
                sumSlashCommands += response.hanaki.commands_source[key][source];
            } else {
                sumBotPing += response.hanaki.commands_source[key][source];
            }
        }
    }
    array[1].push("Slash Commands");
    array[1].push(sumSlashCommands);
    array[2].push("Bot Pings");
    array[2].push(sumBotPing);
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Source per Commands used (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('commandsRepartitionChart'));
    chart.draw(data, options);
}

function drawCommandServs() {
    let modules = ['Date'];

    // Headers
    for (let i = 0; i < 30; i++) {
        for (let mod in response.sanara.commands[i]) {
            if (!modules.includes(mod)) {
                modules.push(mod);
            }
        }
        for (let mod in response.hanaki.commands[i]) {
            if (!modules.includes(mod)) {
                modules.push(mod);
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


function drawCommandPerPlatform() {
    let headers = ['Date', 'Discord', 'Revolt'];

    let arrData = [headers];
    // Values
    for (let i = 29; i >= 0; i--) {
        let arr = [];
        if (i === 0) {
            arr.push("Now");
        } else {
            arr.push(`-${i}H`);
        }
        const eSanara = response.sanara.commands_platform[i];
        const eHanaki = response.hanaki.commands_platform[i];
        arr.push(eSanara["Discord"] ?? 0 + eHanaki["Discord"] ?? 0);
        arr.push(eSanara["Revolt"] ?? 0 + eHanaki["Revolt"] ?? 0);
        arrData.push(arr);
    }
    let data = google.visualization.arrayToDataTable(arrData);

    options.isStacked = true;
    options.title = 'Commands usage';
    let chart = new google.visualization.ColumnChart(document.getElementById('commandsPerPlatformChart'));
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
            dict[key] += response.hanaki.errors[key];
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