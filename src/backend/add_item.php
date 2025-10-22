<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'config.php';

$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$name = $_POST['name'] ?? '';
$manufacture_year = $_POST['manufacture_year'] ?? '';
$category = $_POST['category'] ?? '';

if (empty($name) || empty($manufacture_year) || empty($category)) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

if (!preg_match('/^\d{4}$/', $manufacture_year)) {
    echo json_encode(["status" => "error", "message" => "Invalid year"]);
    exit;
}

$fileName = "";
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName = time() . '_' . basename($_FILES['image']['name']);
    $destPath = $targetDir . $fileName;
    move_uploaded_file($fileTmpPath, $destPath);
}

try {
    $stmt = $conn->prepare("INSERT INTO items (name, manufacture_year, category, image_path) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siss", $name, $manufacture_year, $category, $fileName);
    $stmt->execute();

    echo json_encode(["status" => "success", "fileName" => $fileName]);
    $stmt->close();
} catch (Throwable $e) {
    echo json_encode(["status" => "error", "message" => "Database error"]);
}

$conn->close();
?>
