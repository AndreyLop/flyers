<?php
namespace App\Type\Controllers;

class Profile extends \ControllerBase
{

	public  $args;

	/* 
	* @brief (Save user profile)
	* @return int
	*/
	public function saveProfile ()
	{
		$updateVar = '';
		$stat =["user_last_update"	=> date('Y-m-d H:i:s')];
						
		foreach ($this->args['profile'] as $key=>$var) {
			
			$updateVar.= ','.$key.'=:'.$key.':';

            if ($key == 'user_photo' )  $var = str_replace(' ', '-', $var);
            if ($key == 'company_logo' )  $var = str_replace(' ', '-', $var);

			$stat[$key] = $var;
		}
							
		$saveProfile = "UPDATE Users SET user_last_update=:user_last_update: {$updateVar}  WHERE id='{$this->args['access']['id']}'";	
		
		$result = $this->modelsManager->executeQuery( $saveProfile, $stat );		

		return 	$result->success();
	}

}