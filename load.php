<?php

$from = (int)$_GET['from'];
$to = (int)$_GET['to'];

for ($i = $from; $i <= $to; $i++) {
    echo $i . ":" . file_get_contents(__DIR__ . '/pictures/' . $i . '.b64') . "\n";
    ob_flush();
}