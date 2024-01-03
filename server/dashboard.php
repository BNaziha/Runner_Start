<?php

require_once './connDB.php';
session_start();
if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
    $obj = ['response' => false];
    echo json_encode($obj);
    exit();
}

$id = $_SESSION['user_id'];
$year = date('Y');
$sql = "SELECT * FROM `records` WHERE `UserID` = $id AND `date` >= '$year-01-01' AND `date` <= '$year-12-31'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {    
    $data = $result->fetch_all(MYSQLI_ASSOC); // Fetch data as associative array
    // print_r($data);
    $obj = ['response' => true, 'data' => $data];
    echo json_encode($obj);
} else {
    $obj = ['response' => false, 'data' => []];
    echo json_encode($obj);
}

