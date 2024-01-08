<?php

require_once "connDB.php";

session_start();
if (!isset($_SESSION['user_id'])) {
    echo "No name provided.";
    exit();
}

$id = $_SESSION['user_id'];

//generate a random group name
$groupName = "Group" . rand(0, 1000);

//insert the group name into the database
$query = "INSERT INTO groupe (Nom) VALUES ('$groupName')";

//execute the query and get the group id
$result = mysqli_query($conn, $query);
$groupId = mysqli_insert_id($conn);

//create a new group with the user as the coach
$query = "INSERT INTO groups (UserID, GroupeID, isCoach) VALUES ('$id', '$groupId', 1)";

//execute the query
$result = mysqli_query($conn, $query);


