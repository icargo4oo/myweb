<?php

if (empty($_POST['token'])) {
    echo '<span class="notice">Error!</span>';
    exit;
}

if ($_POST['token'] != 'FsWga4&@f6aw') {
    echo '<span class="notice">Error!</span>';
    exit;
}

$name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
$from = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars(nl2br($_POST['subject']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(nl2br($_POST['message']), ENT_QUOTES, 'UTF-8');

$headers = "From: Form Contact <$from>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";

ob_start();
?>
Hi imransdesign!<br /><br />
<?php echo ucfirst($name); ?> has sent you a message via contact form on your website!
<br /><br />

Name: <?php echo ucfirst($name); ?><br />
Email: <?php echo $from; ?><br />
Phone: <?php echo $phone; ?><br />
Subject: <?php echo $subject; ?><br />
Message: <br /><br />
<?php echo $message; ?>
<br />
<br />
============================================================
<?php
$body = ob_get_clean();

$to = 'infinite.services.uae@gmail.com';

if (mail($to, $subject, $body, $headers)) {
    echo '<div class="success"><i class="fas fa-check-circle"></i><h3>Thank You!</h3>Your message has been sent successfully.</div>';
} else {
    echo '<div>Your message sending failed!</div>';
}

?>
