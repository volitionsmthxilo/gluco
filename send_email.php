
<?php
// Checking submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Initialize variables
    $name = $email = $message = "";
    $error = "";

    // Validate input
    if (empty($_POST["name"])) {
        $error .= "Name is required.<br>";
    } else {
        $name = test_input($_POST["name"]);
    }

    if (empty($_POST["email"])) {
        $error .= "Email is required.<br>";
    } else {
        $email = test_input($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error .= "Invalid email format.<br>";
        }
    }

    if (empty($_POST["message"])) {
        $error .= "Message is required.<br>";
    } else {
        $message = test_input($_POST["message"]);
    }

    // If no errors, send email
    if ($error == "") {
        $to_email = "gluco.zw@gmail.com"; // Your email
        $subject = "GLUCO Enquiry";
        $body = "Name: $name\nEmail: $email\nMessage: $message";

        if (mail($to_email, $subject, $body)) {
            echo "<script>alert('Thank you for contacting us!');</script>";
            echo "<script>window.location.href = 'index.html';</script>"; // Redirect to home page
        } else {
            echo "<script>alert('Error sending email. Please try again.');</script>";
        }
    } else {
        echo "<script>alert('$error');</script>";
    }
}

// Function to validate input
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>