<?php

require_once "connDB.php";

// SQL query to retrieve emails

if (!isset($_POST["email"]) && !isset($_POST["password"])  ) {
    echo json_encode(["s" => "No email provided."]);
    exit();
}
$sql = "SELECT ID, email, MotDePasse FROM personnes WHERE email = '" . $_POST["email"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $obj = $result->fetch_assoc();
    // $id = $result->fetch_assoc()["ID"];
    if(password_verify($_POST["password"], $obj["MotDePasse"]))
    {
        echo json_encode(["s" => true, "id" => $obj["ID"]]);    
    }
    else
    {
        echo json_encode(["s" => "Wrong password."]);
    }
} else {
    echo json_encode(["s" =>"No emails found."]);
}

$conn->close();


