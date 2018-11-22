<?php

namespace App\Type;

use App\Types;

use GraphQL\Type\Definition\InputObjectType;

/**
 * Class PaymentsType
 *
 * Тип Payments для GraphQL
 *
 * @package App\Type
 */
class PaymentsType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Пользователь',
            'fields' => function() {
                return [
                    'card' => [
                        'type' => Types::nonNull(Types::string()),
                        'description' => 'Credit card'
                    ],
					'cvv2' => [
                        'type' => Types::nonNull(Types::string()),
                    ],
                    'expdate' => [
                        'type' => Types::nonNull(Types::string()),
                    ],
					'creditcardtype' => [
                        'type' => Types::nonNull(Types::string()),
						'defaultValue' =>'Visa'
                    ],
					'zip_code' => [
                        'type' => Types::nonNull(Types::string()),
						
                    ],
					
                ];
            }
        ];
	
        parent::__construct($config);
    }
		
}