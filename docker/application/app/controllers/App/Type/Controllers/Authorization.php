<?php
namespace App\Type\Controllers;

use App\Type\Controllers\Tokens;

/**
 * Class Authorization
 *
 *
 * @package App\Controllers
 */
 
class Authorization extends \ControllerBase
{

    /*
    * @brief (Authorization through the site)
    * @param [sting] $args
    * @param [int] $google
    * @return array
    */
   public function login($args, $google = null)
   {
	   
	    $ip			 = $_SERVER['REMOTE_ADDR'];
        $user_deviсу = $_SERVER['HTTP_USER_AGENT'];
        $email 		 = $args['email'];
        $ban 	     = 0;
	    $select 	 = $this->modelsManager;
	   
		try {

			 $output_sql=$select->executeQuery("
			   SELECT * FROM Session 
			   WHERE session_result=0 AND session_ip='$ip' AND user_email='$email' AND session_date>'".date('Y-m-d H:i:s', strtotime('-'.$this->config->blockedTime.' seconds'))."' 
			   ORDER BY session_id DESC 
			   LIMIT ".$this->config->countAttempts
			 );		  

		} catch (\Exception $e) {
			$this->logging('Error DB '.$e->getMessage(),2); 
		}
	
	  $ban = count($output_sql);
	  
	    if ($ban==$this->config->countAttempts) {
            /*
				*Превышен лимит попыток авторизации
			*/
			 $error = $this->_e('Превышен лимит попыток авторизации');
        }
        else {
				
	       $session = "INSERT INTO Session (session_ip, user_email, session_date, session_result,session_devicy) 
					   VALUES (:session_ip:, :user_email:, :session_date:, :session_result:, :session_devicy:)";
					 
           $output_sql=$select->executeQuery("
			   SELECT * FROM Users 
			   WHERE user_email='$email'  
			");
			 
			if (count($output_sql)) {
				
			   $user = $output_sql[0];

			   if ($google) {
				   $password_verify = 1;
			   } 
			   else {
				   $password_verify = password_verify($args['password'], $user->user_pass);
			   }
			   				
               if ($password_verify) {

                    if (!$user->user_active) {
						/*
							*Пользователь заблокирован
						*/
					  $error = $this->_e('Пользователь заблокирован');
                    }
                    else {

						$select->executeQuery( $session,
												[
													"session_ip"     => $ip,
													"user_email"	 => $email,
													"session_date"   => date('Y-m-d H:i:s'),
													"session_result" => 1,
													"session_devicy" => $user_deviсу	
												]
											);	
						
						$checkToken = new Tokens();
						$newToken	= $checkToken ->refreshToken ($user);
							
						$output = ['id'=>$user->id, 'result'=>1, 'error'=>null, 'accessToken'=>$newToken];
                    }

                }
                else {
					/*
					* Неправильный пароль
					*/
                    $return = 0;
					$error  = $this->_e('Неверный пароль или логин');
                }
            }
            else {
                /*
				* Пользователя не существует
				*/
				$return = 0;
				$error  = $this->_e('Пользователя не существует');
            }
        }
		
		if (isset($return)) {
			
           	$output_sql = $select->executeQuery(
				$session,
				[
					"session_ip"     => $ip,
					"user_email"	 => $email,
					"session_date"   => date('Y-m-d H:i:s'),
					"session_result" => 0,
					"session_devicy" => $user_deviсу	
				]
			);
        }
		
		if (isset($error)) $output = ['id'=>null,  'result'=>0, 'error'=>$error];
		 
	   return $output;
   }

   /*
   * @brief (Authorization through the google or facebook)
   * @param [sting] $args
   * @param [int] $google
   * @return array
   */
   public function quickLogin ($args, $google = null) 
   {
	   $output_sql = $this->modelsManager->executeQuery("SELECT * FROM Users  WHERE user_email='{$args['email']}'");
			 
		if (count($output_sql)) {	
		
			$output = $this ->login($args, 1);
		}
		else {
			
			$paswword = $this->generatePassword();
			
			$newUser = new Registration();
			$newUser->args = [ 'email' 		=>	$args['email'],
							   'firstName'	=>	$args['firstName'],
							   'lastName'	=>	$args['lastName'],
							   'state'		=>	'Not selected',
							   'password'	=>	$paswword,
							   'confirmPassword'=>	$paswword,
							   'quickAuthorization' =>true
							 ];
			$output = $newUser ->registrationUser();

			if ($output['result']) {
					$output = $this ->login($args, 1);
			}
							 
		}		

		return $output;
   }

  /*
  * @brief (Prolongation of the access token)
  * @param [array] $variable
  * @return array
  */
   public function loginByToken ($variables)
   {
	   $output_sql=$this->modelsManager->executeQuery("SELECT * FROM Users   WHERE token='".$variables['accessToken']."'");
		   
		  if (count($output_sql)) {
			  
				$output = ['id'=>$output_sql[0]->id, 'result'=>1, 'error'=>null];

		  } 
		  else {
			 	$output = ['id'=>null, 'result'=>0, 'error'=>$this->_e('Токен не существует')];
		  }
	   
	   return $output;
	   
   }

  /*
  * @brief (Generate random password for quickLogin)
  * @param [int] $length
  * @return string
  */
   public  function generatePassword($length = 8)
   {
	  $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
	  $numChars = strlen($chars);
	  $string = '';
	  for ($i = 0; $i < $length; $i++) {
		$string .= substr($chars, rand(1, $numChars) - 1, 1);
	  }
	  return $string;
  }

}

