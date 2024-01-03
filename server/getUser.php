<?php

require_once './connDB.php';

session_start();
if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
    $obj = ['response' => false];
    echo json_encode($obj);
    exit();
}

$id = $_SESSION['user_id'];

$sql = "SELECT * FROM `personnes` WHERE `id` = $id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    $obj = ['response' => true, 'data' => $data];
    echo json_encode($obj);
} else {
    $obj = ['response' => false, 'data' => []];
    echo json_encode($obj);
}

