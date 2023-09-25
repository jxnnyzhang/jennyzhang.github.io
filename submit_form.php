<?php
// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Create an email message
    $subject = "New Form Submission";
    $messageBody = "Name: $name\nEmail: $email\nMessage: $message";

    // Set the recipient email address
    $to = "jennyzhang564@gmail.com"; // Replace with your email address

    // Set additional headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Attempt to send the email
    if (mail($to, $subject, $messageBody, $headers)) {
        // Email sent successfully
        echo json_encode(array("message" => "Email sent successfully"));
    } else {
        // Email sending failed
        echo json_encode(array("message" => "Email sending failed"));
    }
} else {
    // Form was not submitted
    echo json_encode(array("message" => "Form was not submitted"));
}
?>
