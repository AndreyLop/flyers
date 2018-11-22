<?php
namespace App\Type\Controllers;

use App\Type\Controllers\Tokens;

/**
 * Class Registration
 *
 *	Registers the new user to the system
 * 
 * @package App\Controllers
 */
 
class Registration extends \ControllerBase
{
	public $args;

    /**
     *  @brief (Registration of users)
     *  @return array
     */
    public function registrationUser ()
	{
	  $error = $this->checkingFields ();
	  $user_typ = 0;
	  
	  if (isset($this->args['quickAuthorization'])) { $error = ''; $user_typ = 1; }
	 
	  if (!empty($error))  return  ['result'=>0, 'error'=>$error];

	  $output_sql = $this->modelsManager->executeQuery("SELECT * FROM Users WHERE user_email = '{$this->args['email']}'");
		
	  if (count($output_sql)) 	return ['result'=>0, 'error'=>$this->_e('Такой E-mail уже зарегистрирован')];
		
	  $newUser = "INSERT INTO Users (user_first_name, user_last_name,user_pass, user_email, state,user_typ) 
				  VALUES (:user_first_name:, :user_last_name:,:user_pass:, :user_email:, :state:, :user_typ:)";
				
      $this->modelsManager->executeQuery( $newUser,
											[
												"user_first_name"=> $this->args['firstName'],
												"user_last_name" => $this->args['lastName'],
												"user_pass"		 => password_hash ($this->args['password'], PASSWORD_BCRYPT),
												"user_email"	 => $this->args['email'],
												"state"		 => $this->args['state'],
												"user_typ" 	 => $user_typ
											]
										 );	  
										 
	  $user = $this->modelsManager->executeQuery("SELECT id FROM Users WHERE user_email = '{$this->args['email']}'");										 

      if (!file_exists('upload/flyers_thumbnails_users/'.$user[0]->id)) {

        	mkdir("upload/flyers_thumbnails_users/".$user[0]->id, 0775);
			mkdir("upload/flyers_thumbnails_users/".$user[0]->id."/template", 0775);
            copy("img/temp.png", "upload/flyers_thumbnails_users/".$user[0]->id."/template/temp.png");
	  }													 
	
	  return ['result'=>1, 'error'=>null];
		   
	}

    /**
     *  @brief (Search for errors in the registration form)
     *  @return string
     */
    public function checkingFields ()
	{
	   	$error = '';
		
		if ($this->args['password'] != $this->args['confirmPassword']) $error = $this->_e('Пороли не совпадают');
		
		foreach ($this->args as $k=>$input) {
			if ( empty ($input)) $error = $this->_e('Не заполнены все поля');
		}
	
		return $error;
	}
	
}

