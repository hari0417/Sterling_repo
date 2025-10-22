<?php
// load credentials from environment with fallbacks (updated defaults)
// load credentials from environment with fallbacks (updated defaults)
$DB_HOST = getenv('DB_HOST') ?: "localhost";
$DB_USER = getenv('DB_USER') ?: "root";
$DB_PASS = getenv('DB_PASS') ?: "Janu@17";
$DB_NAME = getenv('DB_NAME') ?: "reactive_shop";
$DB_PORT = getenv('DB_PORT') ?: 3306;
// throw exceptions for mysqli errors

// throw exceptions for mysqli errors
// The mysqli extension must be enabled in php.ini

try {
    // include port when creating the connection
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, (int)$DB_PORT);
    $conn->set_charset("utf8mb4");
} catch (Throwable $e) {
    http_response_code(500);
    $message = 'Database connection failed.';
    die(json_encode([
        "status" => "error",
        "message" => $message
    ]));
}
?>
