<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


class SendMailer extends ControllerBase
{
	
	/**
	 * @brief (Build mail)
     * @param [int] $options array
	 * @return array
	 */
	public function sendMail(array $options = null)
	{
			
		if (file_get_contents($this->config->application->viewsDir."layouts/mailsForms/".$options['template'].".phtml")) {
		  
			$this->option=$options['options']; 
		  
			ob_start();

			include $this->config->application->viewsDir."layouts/mailsForms/".$options['template'].".phtml";
		
			$message = ob_get_clean();
		}
		else {
			$message = $options['body'];
		}
	  		
			 $options=[
						'from'      =>$this->config->mail->serviceEmail,
						'to'        =>$options['to'],
						'userName'  =>'=?utf-8?B?'.base64_encode($options['title']).'?=',
						'title'     =>'=?utf-8?B?'.base64_encode($options['title']).'?=',
						'body'      =>$message
					 ];

		  if ($this->config->mail->smtpOn) { 

				return $this->sendSmtp($options);
		  }
		  else {

				return $this->sendMailPhp($options);
		  }
	}
	
	/**
	 * @brief (Send SMTPD)
	 * @param [array] $options array
     * @return strind
	 */
	protected function sendSmtp(array $options = null)
	{
				   $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
			try {
				//Server settings
				if ($this->config->mail->language!='en') {
					$mail->setLanguage($this->config->mail->language, 'PHPMailer/phpmailer/phpmailer/language/'); // Перевод 
				}
				
				$mail->SMTPDebug = $this->config->mail->smtpDebug;             // Enable verbose debug output
				$mail->isSMTP();                                  			    // Set mailer to use SMTP
				$mail->SMTPAuth = $this->config->mail->smtpAuth;                // Enable SMTP authentication
				$mail->SMTPSecure = $this->config->mail->smtoSecure;            // Enable TLS encryption, `ssl` also accepted
				$mail->Port = $this->config->mail->port;                        // TCP port to connect to
				$mail->Host = $this->config->mail->host;                       // Specify main and backup SMTP servers
				$mail->Username = $this->config->mail->username;               // SMTP username
				$mail->Password = $this->config->mail->password;               // SMTP password

				//Recipients
				$mail->setFrom($options['from'], $options['userName']);
				$mail->addAddress($options['to']);              // Name is optional

				if (!empty($options['files'])){

					foreach ($options['files'] as $file) {
						$mail->addAttachment($file[0], $file[1]);
					}
				}

				$mail->isHTML(true);                                  // Set email format to HTML
				$mail->Subject = $options['title'];

				if (empty($options['body'])) $options['body'] =	'';

				$mail->Body    = $options['body'];
				$mail->send();

				return $masseng = '';
			} catch (Exception $e) {
				$masseng = 'Error send '.$mail->ErrorInfo;
				return $masseng;
			}
	}
	
	/**
	 * @brief (Send mail())
	 * @param [array] $options
     * @return string
	 */
	protected function sendMailPhp(array $options = null)
	{
				
		 $boundary = "--".md5(uniqid(time())); // генерируем разделитель

         $headers = "From: ".$options['title']." <".$options['from'].">\r\n";
         $headers .="Content-Type: multipart/mixed; boundary=\"$boundary\"\n";

         $multipart = "--$boundary\n";
         $multipart .= "Content-Type: text/html; charset=utf-8\n";
         $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n";
         $multipart .= $options['body']."\n\n";
		
		 $success = mail("<".$options['to'].">", $options['title'], $multipart, $headers);
		 
		if (!$success) {
			return error_get_last()['message'];
		}

	}

}