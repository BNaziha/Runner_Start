<?php

require_once "connDB.php";

session_start();
if (!isset($_SESSION['user_id'])) {
    exit();
}

$id = $_SESSION['user_id'];

$query = "SELECT * FROM `usergroupe` WHERE `UserID` = $id AND `isCoach` = 1";


$result = mysqli_query($conn, $query);
//calculate the number of rows
$num_rows = mysqli_num_rows($result);

if ($num_rows > 0) {
    $row = mysqli_fetch_assoc($result);
    $groupeID = $row['GroupeID'];
    $obj = ['response' => true, 'groupeID' => $groupeID];
    echo json_encode($obj);
} else {
    $obj = ['response' => false];
    echo json_encode($obj);
}