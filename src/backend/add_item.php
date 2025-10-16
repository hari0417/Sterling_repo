<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['manufacture_date']) || !isset($data['manufacture_year'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$manufacture_date = $conn->real_escape_string($data['manufacture_date']);
$manufacture_year = $conn->real_escape_string($data['manufacture_year']);

$sql = "INSERT INTO items (name, manufacture_date, manufacture_year) VALUES ('$name', '$manufacture_date', '$manufacture_year')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Item saved successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
