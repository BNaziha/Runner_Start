<?php

require_once "connDB.php";

if (isset($_POST['FullName']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['date']) && isset($_POST['height']) && isset($_POST['weight']) && isset($_POST['sex'])) {
    $FullName = $_POST['FullName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hpass = password_hash($password, PASSWORD_DEFAULT);
    $date = date('Y-m-d', strtotime($_POST['date']));
    $height = $_POST['height'];
    $weight = $_POST['weight'];
    $sex = $_POST['sex'];

    
    $query = "SELECT * FROM personnes WHERE Email = '$email'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["s" => "Email already exists in the database."]);
    } else {
        $insertQuery = "INSERT INTO personnes (Nom, Email, MotDePasse, DateNaissance, Taille, Poids, Sexe) VALUES ('$FullName', '$email', '$hpass', '$date', '$height', '$weight', '$sex')";
        mysqli_query($conn, $insertQuery);
        $last_id = mysqli_insert_id($conn);
        echo json_encode(["s" => true, "id" => $last_id]);
    }
} else {
    $s = ["s" => "Please fill in all input fields."];
    echo json_encode($s);
    echo $s;
}

