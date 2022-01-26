<?php
require './vendor/autoload.php';
header('Content-Type: application/json');
error_reporting(0);
$conn = r\connect('localhost');
$now = new DateTime();

function remove_id($array) {
    return array_diff_key(json_decode(json_encode($array), true), array_flip(array("id"))); 
}

function get_month_stats_dict($db, $table, $conn, $now) {
    $day = intval($now->format("d"));
    $res = array();
    for ($i = $day; $i >= 0; $i--) {
        $dict = remove_id(r\db($db)->table($table)->get($now->format("Ym") . strval($i))->run($conn));
        foreach($dict as $key=>$value) {
            if (array_key_exists($key, $res)) {
                $res[$key] += $value;
            } else {
                $res[$key] = $value;
            }
        }
    }
    return $res;
}

function getStats($name, $conn, $now) {
    $date = $now->format("Ymd");

    $commands = array();
    $nb_messages = array();
    for ($i = 0; $i < 30; $i += 1) {
        $curr = new DateTime();
        $curr->sub(new DateInterval("PT" . strval($i) . "H"));
        array_push($commands, remove_id(r\db($name)->table('Commands')->get($curr->format("YmdH"))->run($conn)));
    }

    return array(
        "guild_count"   => remove_id(r\db($name)->table('GuildCount')->get($date)->run($conn)),
        "errors"        => get_month_stats_dict($name, 'Errors', $conn, $now),
        "commands"      => $commands,
        "games"         => get_month_stats_dict($name, 'Games', $conn, $now),
        "games_players" => remove_id(r\db($name)->table('GamesPlayers')->get($date)->run($conn)),
        "booru"         => get_month_stats_dict($name, 'Booru', $conn, $now),
        "download"      => get_month_stats_dict($name, 'Download', $conn, $now)
    );
}

echo(json_encode(array(
    "sanara" => getStats("Sanara_stats", $conn, $now),
    "hanaki" => getStats("Hanaki_stats", $conn, $now)
)));