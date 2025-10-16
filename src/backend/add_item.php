<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'config.php';

// accept JSON or form-encoded/multipart
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$raw = file_get_contents("php://input");
if (stripos($contentType, 'application/json') !== false) {
    $data = json_decode($raw, true);
} else {
    // prefer $_POST for form submissions; fallback to parse_str if needed
    $data = $_POST;
    if (empty($data) && !empty($raw)) {
        parse_str($raw, $data);
    }
}

if (!is_array($data) || !isset($data['name']) || !isset($data['manufacture_date']) || !isset($data['manufacture_year']) || !isset($data['category'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$name = trim($data['name']);
$manufacture_date = trim($data['manufacture_date']);
$manufacture_year = trim($data['manufacture_year']);
$category = trim($data['category']);

// basic validation
if ($name === '' || $manufacture_date === '' || $manufacture_year === '' || $category === '') {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Fields cannot be empty"]);
    exit;
}
if (!preg_match('/^\d{4}$/', $manufacture_year)) {
    // allow only 4-digit year
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Manufacture year must be a 4-digit year"]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO items (name, manufacture_date, manufacture_year, category) VALUES (?, ?, ?, ?)");
    $yearInt = (int)$manufacture_year;
    $stmt->bind_param("ssis", $name, $manufacture_date, $yearInt, $category);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Item saved successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to save item"]);
    }

    $stmt->close();
} catch (Throwable $e) {
    http_response_code(500);
    // do not leak DB internals; return generic message
    echo json_encode(["status" => "error", "message" => "Database error"]);
}

$conn->close();
?>
