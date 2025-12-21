<?php
// Simulate form data
$_POST['name'] = 'Test User';
$_POST['email'] = 'test@example.com';
$_POST['message'] = 'This is a test message from the contact form.';
$_SERVER["REQUEST_METHOD"] = "POST";

// Include the send_email.php logic
include 'send_email.php';
?>
