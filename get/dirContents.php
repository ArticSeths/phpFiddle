<?php

require_once __DIR__ . "/../classes/Fiddle.php";

if(!isset($_GET["p"]))
    exit;

$project = $_GET["p"];
$path    = $_GET["path"];

$fiddle = new Fiddle();
if(!$fiddle->isProject($project)){
    echo json_encode(["Bad Project"]);
    exit;
}
//echo json_encode([$path]);
echo json_encode($fiddle->getContents($project, $path));