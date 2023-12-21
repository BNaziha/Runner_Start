<?php

require_once "connDB.php";

if (!isset($_GET['time']) || !isset($_GET['distance']) || !isset($_GET['UserID'])) {
    echo "No time or distance provided.";
    exit();
}

$time = $_GET['time'];
$distance = $_GET['distance'];
$calculatedSpeed = $distance / $time;
$currentDateTime = date('Y-m-d');
$currentUserId = $_GET['UserID']; 
// $_GET['userId'];

$query = "INSERT INTO records (Temps, Distance, Date, UserID) VALUES ('$time', '$distance', '$currentDateTime', '$currentUserId')";
$result = mysqli_query($conn, $query);

echo $result;
