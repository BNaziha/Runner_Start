<?php

session_start();
//verify if the id and the height and the weight is set and not empty
if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id']) || !isset($_GET['height']) || empty($_GET['height']) || !isset($_GET['weight']) || empty($_GET['weight'])) {
    $obj = ['response' => false];
    echo json_encode($obj);
    exit();
}

//get the id, the height and the weight
$id = $_SESSION['user_id'];
$height = $_GET['height'];
$weight = $_GET['weight'];

//connect to the database
require_once './connDB.php';

//update the height and the weight of the user
$sql = "UPDATE `personnes` SET `Taille` = $height, `Poids` = $weight WHERE `id` = $id";

//verify if the query is executed
if ($conn->query($sql) === TRUE) {
    $obj = ['response' => true];
    echo json_encode($obj);
} else {
    $obj = ['response' => false];
    echo json_encode($obj);
}