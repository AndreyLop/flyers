<?php

namespace App\Type;

use App\Types;

use GraphQL\Type\Definition\ObjectType;

/**
 * Class UserType
 *
 * Тип User для GraphQL
 *
 * @package App\Type
 */
class UserType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Пользователь',
            'fields' => function() {
                return [
                    'id' => [
                        'type' => Types::string(),
                        'description' => 'Идентификатор пользователя'
                    ],
					'user_typ' => [
                        'type' => Types::int(),
                        'description' => 'Тип аккаунта (1 - Google, Facebook; 0 - регистрация через сайт)'
                    ],
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
					'user_active' => [
                        'type' => Types::int(),
                        'description' => 'Заблокирован пользователь или нет'
                    ],				
					'user_registered' => [
                        'type' => Types::string(),
                        'description' => 'Дата регистрации пользователя'
                    ],
					'user_last_update' => [
                        'type' => Types::string(),
                        'description' => 'Дата последнего обновления данных пользователя'
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
                        'description' => 'Логотип компании'
                    ],		
					'company_phone' => [
                        'type' => Types::string(),
                        'description' => 'Телефон компании'
                    ],		
					'company_fax' => [
                        'type' => Types::string(),
                        'description' => 'Факс  компании'
                    ],		
					'company_adress1' => [
                        'type' => Types::string(),
                        'description' => 'Адрес1  компании'
                    ],		
					'company_adress2' => [
                        'type' => Types::string(),
                        'description' => 'Адрес2  компании'
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