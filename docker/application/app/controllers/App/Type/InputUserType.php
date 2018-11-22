<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Class InputUserType
 *
 * Тип InputUser для GraphQL
 *
 * @package App\Type
 */
class InputUserType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Пользователь',
            'fields' => function() {
                return [

                    'user_first_name' => [
                        'type' => Types::string(),
                        'description' => 'Имя пользователя'
                    ],
					 'user_last_name' => [
                        'type' => Types::string(),
                        'description' => 'Имя пользователя'
                    ],
                    'user_email' => [
                        'type' => Types::string(),
                        'description' => 'E-mail пользователя'
                    ],
					'user_phone' => [
                        'type' => Types::string(),
                        'description' => 'Телефон пользователя'
                    ],
					'user_photo' => [
                        'type' => Types::string(),
                        'description' => 'Аватарка'
                    ],
					'website' => [
                        'type' => Types::string(),
                        'description' => 'website'
                    ],
					'slogan' => [
                        'type' => Types::string(),
                        'description' => 'slogan'
                    ],

					
                ];
            }
        ];
        parent::__construct($config);
    }
}