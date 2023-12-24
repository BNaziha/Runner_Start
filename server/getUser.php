<?php

require_once './connDB.php';

if (!isset($_GET['id']) || empty($_GET['id'])) {
    $obj = ['response' => false];
    echo json_encode($obj);
    exit();
}

$id = $_GET['id'];

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

