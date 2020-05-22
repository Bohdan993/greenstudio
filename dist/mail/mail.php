<?php
if ( !empty($_POST['phone']) && !empty($_POST['subject']) ) {
  $return_message = "";



  $name           = trim(htmlspecialchars($_POST['name']));
  $phone          = trim(htmlspecialchars($_POST['phone']));
  $email          = trim(htmlspecialchars($_POST['email']));
  $subject        = trim(htmlspecialchars($_POST['subject']));
  $token          = '1060270866:AAH2igInCrtVMNK-xZ8kfWe97aDWOtU4Ufc';
  $chat_id        = '-407065945';

  require_once('./bitrix.php');
  
  $arr = array(
  'Тема: ' => $subject,
  'Имя клиента: ' => $name,
  'Телефон: ' => $phone,
  'Email: ' => $email,
  );

  foreach ($arr as $field => $value) {
    $txt .= '<b>'. $field . '</b>' . $value . '%0A';
  };
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
  $subject_letter = 'Заявка с сайта GreensStudio';

  $to = "bohdan1trush@gmail.com";

  $message = "
  <html> 
      <head> 
          <title>$subject_letter</title> 
      </head> 
      <body>
        <table>
          <tr><td><b>Тема:</b></td><td>$subject</td></tr>
          <tr><td><b>Имя:</b></td><td>$name</td></tr>
          <tr><td><b>Почта:</b></td><td>$email</td></tr>
          <tr><td><b>Телефон:</b></td><td>$phone</td></tr>
        </table>
      </body> 
  </html>"; 

  $headers  = "From: noreply@greens.studio\r\n";
  $headers .= "Content-type: text/html; charset=utf-8 \r\n";

  if (mail($to, $subject_letter, $message, $headers) && $sendToTelegram) {
    $return_message = "send_success";
  }
  else {
    $return_message = "send_error";
  }
  echo $return_message;
  exit();
}

?>
