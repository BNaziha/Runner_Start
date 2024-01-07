<?php

require_once "connDB.php";

session_start();
if (!isset($_SESSION['user_id']) || !isset($_GET['groupeID'])) {
    exit();
}

$id = $_SESSION['user_id'];

// get the grpID from the url and adds it to the usergroupe table

$groupeID = $_GET['groupeID'];

$query = "INSERT INTO `usergroupe`(`UserID`, `GroupeID`, `isCoach`) VALUES ($id,$groupeID,0)";

$result = mysqli_query($conn, $query);

if ($result) {
    $obj = ['response' => true];
    echo json_encode($obj);
} else {
    $obj = ['response' => false];
    echo json_encode($obj);
}