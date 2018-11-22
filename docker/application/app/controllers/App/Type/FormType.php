<?php

namespace App\Type;

use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class FormType
 *
 * Тип User для GraphQL
 *
 * @package App\Type\Forms
 */
class FormType extends ObjectType
{
   public function __construct()
   {
        $config = [
            'description' => 'Форма',
            'fields' => function() {
                return [

					 'result' => [
                        'type' => Types::string(),
                        'description' => 'Результат авторизации'
                    ],
					 'error' => [
                        'type' => Types::string(),
                        'description' => 'Ошибка'
                    ],
					'accessToken' => [
                        'type' => Types::string(),
                        'description' => 'Токен доступа'
                    ],

					 'user' => [
                        'type' => Types::user(),
                        'description' => 'Пользователь',
                        'resolve' => function ($root) {
						if (isset($root->id)) {
							 $output	=  $this->sql()->selectOne("SELECT * from Users  WHERE id = {$root->id}");
						}	
						else{
							 $output	= '';
						}
							
						   return $output;
                        }],
					 
                ];
            }
        ];
        parent::__construct($config);
    }
		
	public function sql() 
	{
		return  new  Ql();
	}	

}