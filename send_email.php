
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';
require 'phpmailer/SMTP.php';

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
        $mail = new PHPMailer(true);

        try {
            // Server settings - Gmail SMTP with App Password
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'gluco.zw@gmail.com';
            $mail->Password = 'YOUR_GMAIL_APP_PASSWORD'; // Replace with Gmail app password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('gluco.zw@gmail.com', 'GLUCO Contact Form');
            $mail->addAddress('gluco.zw@gmail.com'); // Your email

            // Content
            $mail->isHTML(false);
            $mail->Subject = 'GLUCO Enquiry';
            $mail->Body = "Name: $name\nEmail: $email\nMessage: $message";

            $mail->send();
            echo "<script>alert('Thank you for contacting us!');</script>";
            echo "<script>window.location.href = 'index.html';</script>"; // Redirect to home page
        } catch (Exception $e) {
            echo "<script>alert('Error sending email. Please try again. Mailer Error: {$mail->ErrorInfo}');</script>";
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
