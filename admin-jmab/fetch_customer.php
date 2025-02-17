<?php

// fetch_customers.php

$host = 'localhost';
$db = 'business-jmab';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch customers from the database (!!!!!!!!!ADD ID IF NEEDED!!!!!!!!
$sql = "SELECT first_name, last_name, email, password, roles, address FROM users WHERE roles !='admin'";
$result = $conn->query($sql);

$customers = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($customers);

$conn->close();
?>