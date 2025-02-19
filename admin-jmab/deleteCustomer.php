<?php

$host = 'localhost';
$db = 'business-jmab';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id'];

    // Delete user from the database
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);  

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'ID not provided']);
}

$conn->close();
?>