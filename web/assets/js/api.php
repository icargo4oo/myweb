<?php
header('Content-Type: application/json');

$action = $_POST['action'];
$email = $_POST['email'];
$password = $_POST['password'];
$username = $_POST['username'];

$file = 'users.txt'; // File to store user data

if ($action === 'register') {
    // Check if user already exists
    $users = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($users as $user) {
        list($savedEmail, $savedPassword, $savedUsername) = explode('|', $user);
        if ($savedEmail === $email) {
            echo json_encode(['status' => 'error', 'message' => 'Email already exists.']);
            exit;
        }
    }
    // Register new user
    $newUser = $email . '|' . $password . '|' . $username . PHP_EOL;
    file_put_contents($file, $newUser, FILE_APPEND);
    echo json_encode(['status' => 'success', 'message' => 'Account created successfully.']);
} elseif ($action === 'login') {
    // Check if user exists
    $users = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($users as $user) {
        list($savedEmail, $savedPassword, $savedUsername) = explode('|', $user);
        if ($savedEmail === $email && $savedPassword === $password) {
            echo json_encode(['status' => 'success', 'username' => $savedUsername]);
            exit;
        }
    }
    echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
}
?>
