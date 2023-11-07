<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'email-smtp.us-east-2.amazonaws.com'; // Set the Amazon SES server
    $mail->SMTPAuth = true;
    $mail->Username = getenv('AKIA3WSR3A3OZFRVWWXT'); // Your SMTP username from AWS SES
    $mail->Password = getenv('BMcs9Gz9XLOYcuG52eSbcRc4A1PGhL7ZEU2MEfbxwE4z'); // Your SMTP password from AWS SES
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587; // TLS only

    // Recipients
    $mail->setFrom('your_verified_email@example.com', 'Mailer');
    $mail->addAddress('jxnnyzhang@gmail.com', 'Jenny Zhang'); // Add a recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
