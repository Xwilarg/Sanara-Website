<?php
header('Content-Type: application/json');
echo file_get_contents(__DIR__ . "/../json/Help.json");