<?php

namespace App\Type;

use App\Types;

use GraphQL\Type\Definition\ObjectType;

/**
 * Class FlyerTemplateType
 *
 * Тип FlyerTemplateType для GraphQL
 *
 * @package App\Type
 */
class FlyerTemplateType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Пользователь',
            'fields' => function() {
                return [
                    'id' => [
                        'type' => Types::int(),
                        'description' => 'Идентификатор шаблона'
                    ],
                    'template_name' => [
                        'type' => Types::string(),
                        'description' => 'Имя шаблона'
                    ],
					 'template_photo' => [
                        'type' => Types::string(),
                        'description' => 'Изображение шаблона '
                    ],
	                'template_photo_prop' => [
                        'type' => Types::string(),
                        'description' => 'Сетка шаблона'
                    ],		
                    'template_properties' => [
                        'type' => Types::listOf(Types::string()),
                        'description' => 'Настроки вывода изображений'
                    ],	
					'template_inputs' => [
                        'type' => Types::string(),
                        'description' => 'Ограничения полей ввода'
                    ],	
                    'template_properties_key' => [
                        'type' => Types::listOf(Types::string()),
                        'description' => 'Настроки вывода изображений'
                    ],							
					
					
                ];
            }
        ];
        parent::__construct($config);
    }
		
}