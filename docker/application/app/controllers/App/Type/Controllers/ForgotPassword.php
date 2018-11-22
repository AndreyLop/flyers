<?php
namespace App\Type\Controllers;

use App\Type\Controllers\Tokens;
use Phalcon\Crypt;

/**
 * Class ForgotPassword
 *
 *	Forgot password
 * 
 * @package App\Controllers
 */
 
class ForgotPassword extends \ControllerBase
{
	
	public $args;
	
	/*
	* @brief (Check if such user exists)
	* @return array
	*/
	public function verificationUser () 
	{
			
		 $output_sql = $this->modelsManager->executeQuery("SELECT id FROM Users  WHERE user_email='{$this->args['email']}'");
			 
			if (count($output_sql)) {
				$return = 1;
				$error  = null;
				$success = $this->generateKeyPassword($output_sql[0]->id);
				
				if ($success) {
					$return = 0;
					$error  = $success;
				}
			
			}
			else{
				$return = 0;
				$error  = $this->_e('Пользователя не существует');
			}
		
	  return ['result'=>$return, 'error'=>$error];
		   
	}

   	/*
	* @brief (Check the key and save a new password)
   	* @return array
	*/
	public function verificationNewPassword () 
	{
			
		 $output_sql = $this->modelsManager->executeQuery("SELECT user_id,id FROM ForgotPassword  WHERE active=1 AND data_end>='".date('Y-m-d H:i:s')."' AND  temp_key='{$this->args['key']}'");
		
			if (count($output_sql)) {
				
				$success = $this-> checkingPasswords ();
				
				if (isset($success->error)) {
					$return = 0;
					$error  = $success->error;
				}
				else {
				
					$this->modelsManager->executeQuery("UPDATE ForgotPassword SET active=0  WHERE id='{$output_sql[0]->id}'");
					$this->modelsManager->executeQuery("UPDATE Users SET user_pass='{$success->password}'  WHERE id='{$output_sql[0]->user_id}'");
				
					$return = 1;
					$error  = null;
				}
			}
			else {
				$return = 0;
				$error  = $this->_e('Код подтверждения не найден или устарел');
			}
		
	  return ['result'=>$return, 'error'=>$error];
		   
	}

    /*
    * @brief (Generates and sends a link for password recovery)
    * @return int
    */
	protected function generateKeyPassword ($user)
	{
		
		$temp_id = str_replace('$','',password_hash($this->args['email'], PASSWORD_BCRYPT));
		
		$password_key = "INSERT INTO ForgotPassword (user_id,  data_end, temp_key) 
					     VALUES (:user_id:, :data_end:,:temp_key:)";
	
		$this->modelsManager->executeQuery( $password_key,
								[
									"user_id"    =>	$user,
									"data_end"	 => date('Y-m-d H:i:s', strtotime(($this->config->forgotTime*3600).' seconds')),
									"temp_key"   => $temp_id,
								]
							  );	
							  
		return $this->phpmailer->sendMail([
									'to'        => $this->args['email'],
									'title'     => $this->_e('Восстановление пароля'),
									'template'		=> 'forgotPassword',
									'options'	=> [
											'time_life_tempid' => $this->config->forgotTime,
											'user_url_form'	   => $this->config->siteProtocol.'://'.$_SERVER['HTTP_HOST'].'/change-password/?key='.$temp_id								
										]
								  ]);				  
			
	}

    /*
    * @brief (Checking password user)
    * @return object
    */
	public function checkingPasswords ()
	{
			
		if ($this->args['password'] != $this->args['confirmPassword'] || empty($this->args['password'])) { 
			
			$return = (object)['error' => $this->_e('Пороли не совпадают')];
		}
		else {
			$return = (object)['password' => password_hash($this->args['password'], PASSWORD_BCRYPT)];
			
		}
	
		return $return;
	}
	
	/*
	* @brief (Change password from  user the profile)
   	* @return array
	*/
	public function changePassword ()
	{
		 $output_sql = $this->modelsManager->executeQuery("SELECT user_pass FROM Users  WHERE user_active=1 AND id={$this->args['access']['id']}");
		 
		 if (!count($output_sql)) {
			 
			 return   ['result'=>0, 'error'=>  $this->_e('Пользователь заблокирован')];
		 }
		 
		 if (!password_verify($this->args['curentPassword'], $output_sql[0]->user_pass)) {
			 
			 return   ['result'=>0, 'error'=>  $this->_e('Неверный пароль')];
		 }
		 
		 $success = $this-> checkingPasswords ();
		 
		 if (isset($success->error)) {

			 return   ['result'=>0, 'error'=>  $success->error];
		 }		
				
		 $result = $this->modelsManager->executeQuery("UPDATE Users SET user_pass='{$success->password}'  WHERE id='{$this->args['access']['id']}'");		
		 
		 return ['result'=>$result->success(), 'error'=>null];
	}
}

