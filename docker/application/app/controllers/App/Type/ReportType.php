<?php

namespace App\Type;

use App\Types;

use GraphQL\Type\Definition\ObjectType;

/**
 * Class ReportType
 *
 * Тип Report для GraphQL
 *
 * @package App\Type
 */
class ReportType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Report',
            'fields' => function() {
                return [
                    'id' => [
                        'type' => Types::string(),
                        'description' => 'Идентификатор компании'
                    ],
					 'report_create' => [
                        'type' => Types::string(),
                        'description' => 'Дата создания'
                    ],
                    'report_send' => [
                        'type' => Types::int(),
                        'description' => 'report_send'
                    ],
					'report_opened' => [
                        'type' => Types::int(),
                        'description' => 'report_opened'
                    ],
					'report_click' => [
                        'type' => Types::int(),
                        'description' => 'report_click'
                    ],
					'report_subject' => [
                        'type' => Types::string(),
                        'description' => 'report_subject'
                    ],
					'report_status' => [
                        'type' => Types::int(),
                        'description' => 'Статус'
                    ],							
					
                ];
            }
        ];
        parent::__construct($config);
    }
	
}