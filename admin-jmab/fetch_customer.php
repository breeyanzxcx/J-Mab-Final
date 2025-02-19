<?php
// Database connection
$host = 'localhost';
$db = 'business-jmab';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch users from the database
$sql = "SELECT id, first_name, last_name, address, email FROM users WHERE roles != 'admin'";  
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($users);

$conn->close();
?>