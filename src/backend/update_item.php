<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['name']) || !isset($data['manufacture_date']) || !isset($data['manufacture_year'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields for update"]);
    exit;
}

$id = (int)$data['id'];
$name = trim($data['name']);
$manufacture_date = trim($data['manufacture_date']);
$manufacture_year = trim($data['manufacture_year']);

if ($name === '' || $manufacture_date === '' || $manufacture_year === '') {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Fields cannot be empty"]);
    exit;
}
if (!preg_match('/^\d{4}$/', $manufacture_year)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Manufacture year must be a 4-digit year"]);
    exit;
}

try {
    $stmt = $conn->prepare("UPDATE items SET name = ?, manufacture_date = ?, manufacture_year = ? WHERE id = ?");
    $yearInt = (int)$manufacture_year;
    $stmt->bind_param("ssii", $name, $manufacture_date, $yearInt, $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Item updated successfully!"]);
    } else {
        echo json_encode(["status" => "success", "message" => "No changes were made to the item."]);
    }

    $stmt->close();
} catch (Throwable $e) {
    http_response_code(500);
    error_log($e->getMessage()); // Log error
    echo json_encode(["status" => "error", "message" => "Database error during update"]);
}

$conn->close();
?>