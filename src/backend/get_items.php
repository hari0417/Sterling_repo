<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php';

$category = $_GET['category'] ?? '';

if (empty($category)) {
    echo json_encode(["status" => "error", "message" => "Category parameter missing"]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT id, name, manufacture_year, image_path FROM items WHERE category = ? ORDER BY name ASC");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $row['image_url'] = $row['image_path'] ? "http://localhost:8000/uploads/" . $row['image_path'] : null;
        $items[] = $row;
    }

    echo json_encode(["status" => "success", "items" => $items]);
} catch (Throwable $e) {
    echo json_encode(["status" => "error", "message" => "Database error"]);
}

$conn->close();
?>
