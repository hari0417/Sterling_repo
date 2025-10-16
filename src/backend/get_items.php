<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php';

try {
    // Get category from query string
    $category = $_GET['category'] ?? '';

    if (empty($category)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Category parameter is missing"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, name, manufacture_date, manufacture_year FROM items WHERE category = ? ORDER BY name ASC");
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    
    echo json_encode(["status" => "success", "items" => $items]);
    
    $stmt->close();
} catch (Throwable $e) {
    http_response_code(500);
    error_log($e->getMessage()); // Log error
    echo json_encode(["status" => "error", "message" => "Database error while fetching items"]);
}

$conn->close();
?>