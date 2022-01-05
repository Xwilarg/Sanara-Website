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
    for (let val of response.commands) {
        if (val !== null) {
            for (let mod in val) {
                if (!modules.includes(mod)) {
                    modules.push(mod);
                }
            }
        }
    }

    let arrData = [modules];
    // Values
    let index = 9;
    for (let val of response.commands.reverse()) {
        let arr = [];
        if (index === 0) {
            arr.push("Now");
        } else {
            arr.push(`-${index}H`);
        }
        for (let mod of modules.slice(1)) {
            if (val === null || val[mod] === undefined) {
                arr.push(0);
            } else {
                arr.push(val[mod]);
            }
        }
        arrData.push(arr);
        index--;
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
    for (let key in response.errors) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(parseInt(response.errors[key]));
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
    for (let key in response.games) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(parseInt(response.games[key]));
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

function drawBooru() {
    let array = new Array();
    array.push(new Array());
    array[0].push("Booru");
    array[0].push("Nb of occurance");
    let i = 0;
    for (let key in response.booru) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(parseInt(response.booru[key]));
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Booru used (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('booruChart'));
    chart.draw(data, options);
}