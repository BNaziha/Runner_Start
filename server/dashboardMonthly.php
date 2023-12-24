<?php

require_once './connDB.php';

if (!isset($_GET['id']) || empty($_GET['id'])) {
    $obj = ['response' => false];
    echo json_encode($obj);
    exit();
}

$id = $_GET['id'];
$year = date('Y');

$sql = "SELECT * FROM `records` WHERE `UserID` = $id AND `date` >= '$year-01-01' AND `date` <= '$year-12-31'";

// Execute the query
$result = mysqli_query($conn, $sql);

// Check if the query was successful
if ($result) {
    // Create an array to store the records for each month
    $monthlyRecords = array();

    // Loop through the result set
    while ($row = mysqli_fetch_assoc($result)) {
        // Get the month from the date
        $month = date('M', strtotime($row['Date']));

        // Check if the month exists in the array
        if (!isset($monthlyRecords[$month])) {
            // If the month doesn't exist, create a new array for it
            $monthlyRecords[$month] = array();
        }

        // Add the record to the corresponding month array
        $monthlyRecords[$month][] = $row;
    }

    // Output the monthly records as JSON
    echo json_encode($monthlyRecords);
} else {
    // Query failed
    $obj = ['response' => false];
    echo json_encode($obj);
}
