<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'config.php';

$id = $_POST['id'] ?? '';
$name = $_POST['name'] ?? '';
$manufacture_year = $_POST['manufacture_year'] ?? '';
$category = $_POST['category'] ?? '';

if (empty($id) || empty($name) || empty($manufacture_year)) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$fileName = $_POST['existing_image'] ?? ''; // fallback
$targetDir = "uploads/";

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName = time() . '_' . basename($_FILES['image']['name']);
    move_uploaded_file($fileTmpPath, $targetDir . $fileName);
}

try {
    $stmt = $conn->prepare("UPDATE items SET name = ?, manufacture_year = ?, category = ?, image_path = ? WHERE id = ?");
    $stmt->bind_param("sissi", $name, $manufacture_year, $category, $fileName, $id);
    $stmt->execute();

    echo json_encode(["status" => "success", "fileName" => $fileName]);
    $stmt->close();
} catch (Throwable $e) {
    echo json_encode(["status" => "error", "message" => "Database error"]);
}

$conn->close();
?>
