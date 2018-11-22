<?php

namespace App\Type;

use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class LoginType
 *
 * @package App\Type
 */
class LoginType extends ObjectType
{
   /* public function __construct()
    {
        $config = [
            'description' => 'Авторизация пользователя',
            'fields' => function() {
                return [
				'login'=>[
                    'email' => [
                        'type' => Types::string(),
                        'description' => 'E-mail пользователя'
                    ],
                    'password' => [
                        'type' => Types::string(),
                        'description' => 'Пароль пользователя'
                    ],
                     'resolve' => function ($root) {
							
						$output	=  $this->sql()->select("SELECT * from User");
						return $output;
                     }
				  ] 
                ];
            }
        ];
        parent::__construct($config);
    }
	*/
	    public function __construct()
    {
      


	   $config = [
            'fields' => function() {
			
                return [
                    'login' => [
                        'type' => Types::login(),
                        'description' => 'Авторизация пользователя',
                        'args' => array(
                            'id' => Types::int()
                        ),
                        'resolve' => function ($root, $args) {
                            
					//	$output	=	DB::selectOne("SELECT * from users WHERE id = {$args['id']}");
						$output	=  $this->sql()->select("SELECT *  FROM User WHERE id = {$args['id']}");
						
												
						return  $output;
                        }
                    ],

                ];
            }
        ];
        parent::__construct($config);
    }
		
	public function sql() {
		
		$sql = new  Ql();
		return $sql;	
	}
}