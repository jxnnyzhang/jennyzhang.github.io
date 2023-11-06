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
    $mail->Host = 'arn:aws:ses:us-east-2:804404266717:identity/jxnnyzhang@gmail.com'; // Set the Amazon SES server
    $mail->SMTPAuth = true;
    $mail->Username = 'AKIA3WSR3A3OUBL42N7I'; // Your SMTP username from AWS SES
    $mail->Password = 'BDPBwpur+e+zslyT2k28TWWqnMtkDgBa3v0N4MjpZxBp'; // Your SMTP password from AWS SES
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
