<?php
require './vendor/autoload.php';
error_reporting(0);
header('Content-Type: application/json');
$conn = r\connect('localhost');
$now = new DateTime();

function remove_id($array) {
    return array_diff_key(json_decode(json_encode($array), true), array_flip(array("id"))); 
}

function getStats($name, $conn, $now) {
    $date = $now->format("Ymd");

    $commands = array();
    $nb_messages = array();
    for ($i = 0; $i < 10; $i += 1) {
        $curr = new DateTime();
        $curr->sub(new DateInterval("PT" . strval($i) . "H"));
        array_push($commands, remove_id(r\db($name)->table('Commands')->get($curr->format("YmdH"))->run($conn)));
    }

    return array(
        "guild_count"   => remove_id(r\db($name)->table('GuildCount')->get($date)->run($conn)),
        "errors"        => remove_id(r\db($name)->table('Errors')->get($date)->run($conn)),
        "commands"      => $commands,
        "games"         => remove_id(r\db($name)->table('Games')->get($date)->run($conn)),
        "games_players" => remove_id(r\db($name)->table('GamesPlayers')->get($date)->run($conn)),
        "booru"         => remove_id(r\db($name)->table('Booru')->get($date)->run($conn)),
        "download"      => remove_id(r\db($name)->table('Download')->get($date)->run($conn))
    );
}

echo(json_encode(getStats("Hanaki_stats", $conn, $now)));