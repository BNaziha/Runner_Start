<?php

require_once "connDB.php";

session_start();
if (!isset($_SESSION['user_id'])) {
    
    exit();
}

$id = $_SESSION['user_id'];

// Get the groupID of the coach
$coachGroupQuery = "SELECT `groupeID` FROM `usergroupe` WHERE `UserID` = $id";
$coachGroupResult = mysqli_query($conn, $coachGroupQuery);
$coachGroup = mysqli_fetch_assoc($coachGroupResult)['groupeID'];

// Get all the users in the same groupID
$usersQuery = "SELECT * FROM `usergroupe` WHERE `groupeID` = $coachGroup";
$usersResult = mysqli_query($conn, $usersQuery);

// Fetch each user's data
$usersData = [];
while ($user = mysqli_fetch_assoc($usersResult)) {
    $userID = $user['UserID'];
    $userDataQuery = "SELECT ID, Nom, DateNaissance, Sexe, Email, Poids, Taille, calories FROM `personnes` WHERE `ID` = $userID";
    $userDataResult = mysqli_query($conn, $userDataQuery);
    $userData = mysqli_fetch_assoc($userDataResult);
    $usersData[] = $userData;
}

//return all the data from the table
echo json_encode($usersData);