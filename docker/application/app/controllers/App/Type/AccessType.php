<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Class AccessType
 *
 * Тип Access для GraphQL
 *
 * @package App\Type
 */
class AccessType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Access',
            'fields' => function() {
                return [
                    'accessToken' => [
                        'type' => Types::string(),
                        'description' => 'Токен доступа'
                    ],
					 'id' => [
                        'type' => Types::nonNull(Types::int()),
                        'description' => 'id пользователя'
                    ]	
                ];
            }
        ];
        parent::__construct($config);
    }
}