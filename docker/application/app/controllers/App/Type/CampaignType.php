<?php

namespace App\Type;

use App\Types;

use GraphQL\Type\Definition\ObjectType;

/**
 * Class CampaignType
 *
 * Тип Campaign для GraphQL
 *
 * @package App\Type
 */
class CampaignType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Campaign',
            'fields' => function() {
				   return [
                    'id' => [
                        'type' => Types::int(),
                        'description' => 'Идентификатор компании'
                    ],
					'campaign_create' => [
                        'type' => Types::string(),
                        'description' => 'Дата создания'
                    ],
					'campaign_subject' => [
                        'type' => Types::string(),
                        'description' => 'Email subject Or Campaign subject'
                    ],
					'campaign_name' => [
                        'type' => Types::string(),
                        'description' => 'Campaign_name'
                    ],
					'campaign_list' => [
                        'type' => Types::listOf(Types::string()),
                        'description' => 'Список Агентов'
                    ],	
                    'sent' => [
                        'type' => Types::int(),
                        'description' => 'Количество отправленных писем'
                    ],
					'opened' => [
                        'type' => Types::int(),
                        'description' => 'Количество открытых писем'
                    ],
					'clicks' => [
                        'type' => Types::int(),
                        'description' => 'Количество переходов'
                    ],
					'status' => [
                        'type' => Types::int(),
                        'description' => 'Статус компании 0 - не оплачена и не отправлена; 1 - оплачена; 2 - выполнена'
                    ]	,
					'sent_date' => [
                        'type' => Types::string(),
                        'description' => 'Дата рассылки'
                    ]	,
	
					'flyer_preview' => [
                        'type' => Types::string(),
                        'description' => 'Img сгенерированного флаера '
                    ]	,
					'flyer_id' => [
                        'type' => Types::int(),
                        'description' => 'id'
                    ],
					'allPosts' => [
                        'type' => Types::int(),
                        'description' => 'Количество элементов'
                    ],
                     'transaction' => [
                           'type' => Types::string(),
                           'description' => 'Transaction number'
                     ],
					
                ];		
				
            }
        ];
        parent::__construct($config);
    }
	
}