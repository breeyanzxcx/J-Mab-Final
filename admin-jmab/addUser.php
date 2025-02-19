<?php
header("Content-Type: application/json");

$host = 'localhost';
$db = 'business-jmab';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]));
}

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['first_name'], $data['last_name'], $data['email'], $data['password'], $data['address'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

$first_name = trim($data['first_name']);
$last_name = trim($data['last_name']);
$email = trim($data['email']);
$password = password_hash(trim($data['password']), PASSWORD_DEFAULT); // Hash password
$address = trim($data['address']);

// Insert into database
$sql = "INSERT INTO users (first_name, last_name, email, password, address) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $first_name, $last_name, $email, $password, $address);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
