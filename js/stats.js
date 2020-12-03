let response;
let options = {
    title: '',
    isStacked: true,
    legend: {
        position: 'right',
        textStyle: {color: "#eee"}
    },
    backgroundColor: "#181a1b",
    titleTextStyle: {color: "#eee"}
};

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        response = JSON.parse(this.responseText);

        google.charts.load('current', {'packages':['corechart']});

        google.charts.setOnLoadCallback(drawErrors);
        google.charts.setOnLoadCallback(drawTotalUsage);
        google.charts.setOnLoadCallback(drawCommandServs);
        google.charts.setOnLoadCallback(drawGames);
        google.charts.setOnLoadCallback(drawGamePlayers);

        //google.charts.setOnLoadCallback(drawBoorus);
        //google.charts.setOnLoadCallback(drawScores);
    }
}
xmlhttp.open("GET", "https://api.zirk.eu/bots.php?name=Sanara", true);
xmlhttp.send();

function getCurrentDate() {
    let now = new Date();
    let paris = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    paris.setHours(paris.getHours() + 2);
    return paris;
}

function addZero(nb) {
    return ((nb < 10) ? ('0' + nb) : (nb));
}

function getElementOnce(arr, elem) {
    if (arr == undefined)
        return (0);
    let e1 = arr[elem];
    if (e1 == undefined)
        return (0);
    return (e1);
}

function getElement(arr, elem1, elem2) {
    if (arr == undefined)
        return (0);
    let e1 = arr[elem1];
    if (e1 == undefined)
        return (0);
    let e2 = e1[elem2];
    if (e2 == undefined)
        return (0);
    return (e2);
}

function drawCommandServs() {
    let values = [];
    let currentDate = getCurrentDate();
    for (let i = 0; i < 10; i++) {
        values.push(currentDate.getFullYear().toString().substr(-2) + addZero((currentDate.getMonth() + 1)) + addZero(currentDate.getDate()) + addZero(currentDate.getHours()));
        currentDate.setHours(currentDate.getHours() - 1);
    }

    let val = response.message.commands;

    let modules = [];
    let arr = ['Date'];

    for (let key in val) {
        for (let key2 in val[key]) {
            if (!modules.includes(key2)) {
                modules.push(key2);
                arr.push(key2);
            }
        }
    }

    let arrData = [arr];

    for (let i = 9; i >= 0; i--) {
        let tmpArr = ['H-' + i];

        for (let t in modules) {
            tmpArr.push(getElement(val, values[i], modules[t]));
        }

        arrData.push(tmpArr);
    }

    let data = google.visualization.arrayToDataTable(arrData);
    options.title = 'Commands usage';
    let chart = new google.visualization.LineChart(document.getElementById('commandsChart'));
    chart.draw(data, options);
}

function drawTotalUsage() {
    let currentDate = getCurrentDate();
    let now = currentDate.getFullYear().toString().substr(-2) + addZero((currentDate.getMonth() + 1));
    let val = response.message.monthCommands;

    let modules = [];
    let arr = [];
    arr.push(['Modules', 'Utilisations']);

    for (let key in val) {
        for (let key2 in val[key]) {
            if (!modules.includes(key2)) {
                modules.push(key2);
            }
        }
    }

    for (let t in modules) {
        arr.push([modules[t], getElement(val, now, modules[t])]);
    }

    let data = google.visualization.arrayToDataTable(arr);

    options.title = 'Commands usage (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('commandsChart2'));
    chart.draw(data, options);
}

function drawErrors() {
    let currentDate = getCurrentDate();
    let now = currentDate.getFullYear().toString().substr(-2) + addZero((currentDate.getMonth() + 1)) + addZero(currentDate.getDate());
    let errors = response.message.errors[now];

    let array = new Array();
    array.push(new Array());
    array[0].push("Return status");
    array[0].push("Nb of occurance");
    let i = 0;
    for (let key in errors) {
        array.push(new Array());
        array[i + 1].push(key);
        array[i + 1].push(parseInt(errors[key]));
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Errors encountered (daily)';
    let chart = new google.visualization.PieChart(document.getElementById('errorsChart'));
    chart.draw(data, options);
}

function drawScores() {
    let datas = response.message.bestScores;

    let names = [
        datas["shiritori"][0], datas["shiritori"][2], datas["shiritori"][4],
        datas["anime"][0], datas["anime"][2], datas["anime"][4],
        datas["booru"][0], datas["booru"][2], datas["booru"][4],
        datas["kancolle"][0], datas["kancolle"][2], datas["kancolle"][4],
        datas["azurlane"][0], datas["azurlane"][2], datas["azurlane"][4],
        datas["fatego"][0], datas["fatego"][2], datas["fatego"][4],
        datas["pokemon"][0], datas["pokemon"][2], datas["pokemon"][4],
        datas["girlsfrontline"][0], datas["girlsfrontline"][2], datas["girlsfrontline"][4],
        datas["arknights"][0], datas["arknights"][2], datas["arknights"][4],
        datas["arkaudio"][0], datas["arkaudio"][2], datas["arkaudio"][4],
        datas["general"][0], datas["general"][2], datas["general"][4], datas["general"][6], datas["general"][8]
    ];
    let nameToColor = {};
    names.forEach(function(name) {
        if (name === names[30]) nameToColor[name] = "#ffd700";
        else if (name === names[31]) nameToColor[name] = "#c0c0c0";
        else if (name === names[32]) nameToColor[name] = "#b87333";
        else if (name === names[33]) nameToColor[name] = "#17bf0a";
        else if (name === names[34]) nameToColor[name] = "#244615";
        else nameToColor[name] = "#3366cc";
    });

    let data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[0], parseInt(datas["shiritori"][1]), nameToColor[names[0]]],
        [names[1], parseInt(datas["shiritori"][3]), nameToColor[names[1]]],
        [names[2], parseInt(datas["shiritori"][5]), nameToColor[names[2]]],
    ]);
    options.title = 'Best scores (Shiritori)';
    options.legend.position = 'none';
    let chart = new google.visualization.ColumnChart(document.getElementById('scoreschart1'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[3], parseInt(datas["anime"][1]), nameToColor[names[3]]],
        [names[4], parseInt(datas["anime"][3]), nameToColor[names[4]]],
        [names[5], parseInt(datas["anime"][5]), nameToColor[names[5]]],
    ]);
    options.title = 'Best scores (Anime guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart2'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[6], parseInt(datas["booru"][1]), nameToColor[names[6]]],
        [names[7], parseInt(datas["booru"][3]), nameToColor[names[7]]],
        [names[8], parseInt(datas["booru"][5]), nameToColor[names[8]]],
    ]);
    options.title = 'Best scores (Booru guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart3'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[9], parseInt(datas["kancolle"][1]), nameToColor[names[9]]],
        [names[10], parseInt(datas["kancolle"][3]), nameToColor[names[10]]],
        [names[11], parseInt(datas["kancolle"][5]), nameToColor[names[11]]],
    ]);
    options.title = 'Best scores (KanColle guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart4'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[12], parseInt(datas["azurlane"][1]), nameToColor[names[12]]],
        [names[13], parseInt(datas["azurlane"][3]), nameToColor[names[13]]],
        [names[14], parseInt(datas["azurlane"][5]), nameToColor[names[14]]],
    ]);
    options.title = 'Best scores (Azur Lane guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart5'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[15], parseInt(datas["fatego"][1]), nameToColor[names[15]]],
        [names[16], parseInt(datas["fatego"][3]), nameToColor[names[16]]],
        [names[17], parseInt(datas["fatego"][5]), nameToColor[names[17]]],
    ]);
    options.title = 'Best scores (Fate GO guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart6'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[18], parseInt(datas["pokemon"][1]), nameToColor[names[18]]],
        [names[19], parseInt(datas["pokemon"][3]), nameToColor[names[19]]],
        [names[20], parseInt(datas["pokemon"][5]), nameToColor[names[20]]],
    ]);
    options.title = 'Best scores (Pokemon guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart7'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[21], parseInt(datas["girlsfrontline"][1]), nameToColor[names[21]]],
        [names[22], parseInt(datas["girlsfrontline"][3]), nameToColor[names[22]]],
        [names[23], parseInt(datas["girlsfrontline"][5]), nameToColor[names[23]]],
    ]);
    options.title = 'Best scores (Girl\'s Frontline guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart8'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[24], parseInt(datas["arknights"][1]), nameToColor[names[24]]],
        [names[25], parseInt(datas["arknights"][3]), nameToColor[names[25]]],
        [names[26], parseInt(datas["arknights"][5]), nameToColor[names[26]]],
    ]);
    options.title = 'Best scores (Arknights guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart9'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[27], parseInt(datas["arkaudio"][1]), nameToColor[names[27]]],
        [names[28], parseInt(datas["arkaudio"][3]), nameToColor[names[28]]],
        [names[29], parseInt(datas["arkaudio"][5]), nameToColor[names[29]]],
    ]);
    options.title = 'Best scores (Arknights audio guess game)';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('scoreschart10'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ["Server's name", 'Score', { role: 'style' }],
        [names[30], parseInt(datas["general"][1]), nameToColor[names[30]]],
        [names[31], parseInt(datas["general"][3]), nameToColor[names[31]]],
        [names[32], parseInt(datas["general"][5]), nameToColor[names[32]]],
        [names[33], parseInt(datas["general"][7]), nameToColor[names[33]]],
        [names[34], parseInt(datas["general"][9]), nameToColor[names[34]]],
    ]);
    options.title = 'Global game ranking';
    options.legend.position = 'none';
    chart = new google.visualization.ColumnChart(document.getElementById('rankingchart'));
    chart.draw(data, options);
}

function drawGames() {
    let currentDate = getCurrentDate();
    let now = currentDate.getFullYear().toString().substr(-2) + addZero((currentDate.getMonth() + 1));
    let games = response.message.games[now];

    let array = new Array();
    array.push(new Array());
    array[0].push("Game");
    array[0].push("Nb of occurance");
    let i = 0;
    for (let key in games) {
        array.push(new Array());
        array[i + 1].push(key.charAt(0).toUpperCase() + key.substr(1));
        array[i + 1].push(parseInt(games[key]));
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Games played (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('gameschart'));
    chart.draw(data, options);
}

function drawGamePlayers() {
    let currentDate = getCurrentDate();
    let now = currentDate.getFullYear().toString().substr(-2) + addZero((currentDate.getMonth() + 1));
    let games = response.message.gamesPlayers[now];

    let max = 1;
    let keys = new Array();
    for (let key in games) { // Getting max number
        if (!key.includes(';')) { // Exception handling
            continue;
        }
        let value = key.split(';')[1];
        let game = key.split(';')[0];
        if (value > max) max = value;
        if (!keys.includes(game)) {
            keys.push(game);
        }
    }
    let sumArray = new Array();
    let array = new Array();
    array.push("Nb of player");
    for (let i = 1; i <= max; i++) {
        array.push(i.toString());
    }
    sumArray.push(array);
    for (let key in keys) {
        let currArray = new Array();
        currArray.push(keys[key]);
        for (let i = 1; i <= max; i++) {
            currArray.push(0);
        }
        for (let k in games) { // Getting max number
            if (!k.includes(';')) { // Exception handling
                continue;
            }
            let value = k.split(';')[1];
            let game = k.split(';')[0];
            if (game == keys[key]) {
                currArray[parseInt(value)] = games[k];
            }
        }
        sumArray.push(currArray);
    }

    let data = google.visualization.arrayToDataTable(sumArray);
    options.isStacked = true;
    options.title = 'Games per players (monthly)';
    let chart = new google.visualization.ColumnChart(document.getElementById('gamePlayersChart'));
    chart.draw(data, options);
}

function drawBoorus() {
    let currentDate = getCurrentDate();
    let now = currentDate.getFullYear().toString().substr(-2) + addZero((currentDate.getMonth() + 1));
    let games = response.message.booru[now];

    let array = new Array();
    array.push(new Array());
    array[0].push("Booru");
    array[0].push("Nb of occurance");
    let i = 0;
    for (let key in games) {
        array.push(new Array());
        array[i + 1].push(key.charAt(0).toUpperCase() + key.substr(1));
        array[i + 1].push(parseInt(games[key]));
        i++;
    }
    let data = google.visualization.arrayToDataTable(array);

    options.title = 'Booru used (monthly)';
    let chart = new google.visualization.PieChart(document.getElementById('booruChart'));
    chart.draw(data, options);
}