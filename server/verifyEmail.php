<?php

require_once "connDB.php";

// SQL query to retrieve emails

if (!isset($_GET["email"])) {
    echo "No email provided.";
    exit();
}
$sql = "SELECT email, MotDePasse FROM personnes WHERE email = '" . $_GET["email"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $pass = $result->fetch_assoc()["MotDePasse"];
    password_verify($_GET["password"], $pass);
    echo true;
    
} else {
    echo "No emails found.";
}

$conn->close();


