<?php

require_once "connDB.php";

session_start();
if (!isset($_GET['time']) || !isset($_GET['distance']) || !isset($_SESSION['user_id'])) {
    echo "No time or distance provided.";
    exit();
}

$time = $_GET['time'];
$distance = $_GET['distance'];
$calculatedSpeed = $distance / $time;
$calories = $calculatedSpeed * 0.5;
$currentDateTime = date('Y-m-d');
$currentUserId = $_SESSION['user_id']; 

$query = "INSERT INTO records (Temps, Distance, calories_burned, Speed, Date, UserID) VALUES ('$time', '$distance', '$calories', '$calculatedSpeed', '$currentDateTime', '$currentUserId')";
$result = mysqli_query($conn, $query);

echo $result;

$query = "INSERT INTO records (Temps, Distance, Date, UserID) VALUES ('$time', '$distance', '$currentDateTime', '$currentUserId')";
$result = mysqli_query($conn, $query);

echo $result;
