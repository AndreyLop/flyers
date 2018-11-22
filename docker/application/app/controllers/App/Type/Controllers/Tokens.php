<?php
namespace App\Type\Controllers;
use Phalcon\Crypt;

class Tokens extends \ControllerBase
{

   /**
    * @brief (Generate new token)
    * @param [int] $user
    * @return string
    */
   public function refreshToken ($user = null)
   {

        $token ='{"alg": "HS256", "typ": "JW", "iss": "auth.service.com", "aud": "service.com", "exp": '.(time()+$this->config->payload->tokenLifetime).', "userName": "'.$user->user_first_name.'"'.'}';
        
		$token = $this->crypt->encryptBase64($this->crypt->encrypt($token));

		if ($user)  {
			$this->modelsManager->executeQuery("UPDATE Users SET token='{$token}'  WHERE id='{$user->id}'");
		}

		return $token;
   }

   /**
    * @brief (Checks for the presence of an access token and its validity)
    * @param [string] $query
    * @param [string] $variables
    * @return array
    */
   public function checkToken ($query  = null, $variables = null) 
   {

	  if (!empty($variables['access'])){

		  if (isset($variables['access']['accessToken']))  $accessToken = $variables['access']['accessToken'];
	  }
	  else {
		  if (isset($variables['accessToken']))  $accessToken = $variables['accessToken'];
	  }

	  if (isset($accessToken)) {
		
		  $output_sql=$this->modelsManager->executeQuery("SELECT id FROM Users   WHERE token='".$variables['accessToken']."'");
		   
		  if (count($output_sql)) {
			   
			$tokenArray=json_decode($this->crypt->decrypt($this->crypt->decryptBase64($variables['accessToken'])), true);
			
			if ($tokenArray['exp']<=time()) {
				
				$return = ['result'=>1, 'accessToken'=>$this->refreshToken ($output_sql[0]) ];
			}
			else {
				$return = ['result'=>1];
			}
		  }  
		  else {
			    $return =['result'=>0];
		  }
	  }
	  else {
		  /**
		   *  Регистрация/Авторизация
		   */
		  $return =['result'=>2];
		    
	  }
	    return $return;
   }

}

