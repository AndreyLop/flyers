<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Class UpdateProfileType
 *
 * Тип UpdateProfileType для GraphQL
 *
 * @package App\Type
 */
class UpdateProfileType extends InputObjectType 
{
      public function __construct()
    {
        $config = [
            'description' => 'Profile',
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
					'state' => [
                        'type' => Types::string(),
                        'description' => 'Штат'
                    ],
					'company_name' => [
                        'type' => Types::string(),
                        'description' => 'Название компании'
                    ],
					'company_logo' => [
                        'type' => Types::string(),
                        'description' => 'Лого компании'
                    ],
					'company_phone' => [
                        'type' => Types::string(),
                        'description' => 'Телефон компании'
                    ],
					'company_fax' => [
                        'type' => Types::string(),
                        'description' => 'Факс компании'
                    ],
					'company_adress1' => [
                        'type' => Types::string(),
                        'description' => 'Адрес компании'
                    ],
					'company_adress2' => [
                        'type' => Types::string(),
                        'description' => 'Адрес компании'
                    ],
					'company_city' => [
                        'type' => Types::string(),
                        'description' => 'Город'
                    ],	
					'company_code' => [
                        'type' => Types::string(),
                        'description' => 'ZIP code'
                    ],					
                ];
            }
        ];
        parent::__construct($config);
    }
}