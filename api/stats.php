<?php
require './vendor/autoload.php';
header('Content-Type: application/json');
$conn = r\connect('localhost');
$now = new DateTime();
$now->setTimezone(new DateTimeZone('Europe/London'));

function remove_id($array) {
    if ($array === null) {
        return null;
    }
    return array_diff_key(json_decode(json_encode($array), true), array_flip(array("id"))); 
}

function pad_zero($nb) {
    if ($nb < 10) {
        return "0" . strval($nb);
    }
    return strval($nb);
}

function get_month_stats_dict($db, $table, $conn, $now) {
    $day = intval($now->format("d"));
    $res = array();
    for ($i = $day; $i >= 0; $i--) {
        $dict = remove_id(r\db($db)->table($table)->get($now->format("Ym") . pad_zero($i))->run($conn));
        if ($dict !== null) {
            foreach($dict as $key=>$value) {
                if (array_key_exists($key, $res)) {
                    $res[$key] += $value;
                } else {
                    $res[$key] = $value;
                }
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
        $commands[$i] = array();
        $curr = new DateTime();
        $curr->setTimezone(new DateTimeZone('Europe/London'));
        $curr->sub(new DateInterval("PT" . strval($i) . "H"));
        $dict = remove_id(r\db($name)->table('Commands')->get($curr->format("YmdH"))->run($conn));
        if ($dict !== null)
        {
            foreach ($dict as $key => $value)
            {
                $newKey = explode(";", $key)[0];
                if (!array_key_exists($newKey, $commands[$i])) {
                    $commands[$i][$newKey] = $value;
                } else {
                    $commands[$i][$newKey] += $value;
                }
            }
        }
    }

    $playerArr = array();
    foreach(get_month_stats_dict($name, 'GamesPlayers', $conn, $now) as $key=>$value) {
        $data = explode(";", $key);
        $game = $data[0];
        $count = $data[1];
        $mult = $data[2];
        if (!array_key_exists($game, $playerArr)) {
            $playerArr[$game] = array($mult => array($count => $value));
        } else {
            if (!array_key_exists($mult, $playerArr[$game])) {
                $playerArr[$game][$mult] = array($count => $value);
            } else {
                if (!array_key_exists($count, $playerArr[$game][$mult])) {
                    $playerArr[$game][$mult][$count] = $value;
                } else {
                    $playerArr[$game][$mult][$count] += $value;
                }
            }
        }
    }

    $commandsPerSource = array();
    $sum = 0;
    $day = intval($now->format("d"));
    for ($i = $day; $i >= 0; $i--) {
        $dict = remove_id(r\db($name)->table("CommandsDaily")->get($now->format("Ym") . pad_zero($i))->run($conn));
        if ($dict !== null) {
            foreach($dict as $key=>$value) {
                $data = explode(";", $key);
                $sum += $value;
                $source = $data[1] == 0 ? "Slash Commands" : "Bot Pings";
                $cmd = $data[0];
                if (!array_key_exists($cmd, $commandsPerSource)) {
                    $commandsPerSource[$cmd] = array($source => $value);
                } else {
                    if (!array_key_exists($source, $commandsPerSource[$cmd])) {
                        $commandsPerSource[$cmd][$source] = $value;
                    } else {
                        $commandsPerSource[$cmd][$source] += $value;
                    }
                }
            }
        }
    }

    return array(
        "guild_count"   => remove_id(r\db($name)->table('GuildCount')->get($date)->run($conn)),
        "errors"        => get_month_stats_dict($name, 'Errors', $conn, $now),
        "commands"      => $commands,
        "commands_sum"  => $sum,
        "commands_source"=> $commandsPerSource,
        "games"         => $playerArr,
        "booru"         => get_month_stats_dict($name, 'Booru', $conn, $now),
        "download"      => get_month_stats_dict($name, 'Download', $conn, $now)
    );
}

echo(json_encode(array(
    "sanara" => getStats("Sanara_stats", $conn, $now),
    "hanaki" => getStats("Hanaki_stats", $conn, $now)
)));