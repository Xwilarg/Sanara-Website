<?php
require './vendor/autoload.php';
header('Content-Type: application/json');
error_reporting(0);
$conn = r\connect('localhost');
$date = date('Ymd');

function remove_id($array) {
    return array_diff_key(json_decode(json_encode($array), true), array_flip(array("id"))); 
}

echo(json_encode(array(
    "GuildCount"    => remove_id(r\db('Hanaki_stats')->table('GuildCount')->get($date)->run($conn)),
    "NbMessages"    => remove_id(r\db('Hanaki_stats')->table('NbMessages')->get($date)->run($conn)),
    "Errors"        => remove_id(r\db('Hanaki_stats')->table('Errors')->get($date)->run($conn)),
    "Commands"      => remove_id(r\db('Hanaki_stats')->table('Commands')->get($date)->run($conn)),
    "Games"         => remove_id(r\db('Hanaki_stats')->table('Games')->get($date)->run($conn)),
    "GamesPlayers"  => remove_id(r\db('Hanaki_stats')->table('GamesPlayers')->get($date)->run($conn)),
    "Booru"         => remove_id(r\db('Hanaki_stats')->table('Booru')->get($date)->run($conn))
)));