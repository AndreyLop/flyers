<?php

namespace App\Type;

use App\Types;
use GraphQL\Type\Definition\InputObjectType;

/**
 * Class UpdateCampaignType
 *
 * Тип UpdateCampaignType для GraphQL
 *
 * @package App\Type
 */
class UpdateCampaignType extends InputObjectType
{
      public function __construct()
    {
        $config = [
            'description' => 'Поля для email flyer',
            'fields' => function() {
                return [

                    'campaign_name' => [
                        'type' => Types::string(),
                        'description' => 'имя отправителя'
                    ],
                    'campaign_subject' => [
                        'type' => Types::string(),
                        'description' => 'Тема письма/Название компании'
                    ],
                    'campaign_send_date' => [
                        'type' => Types::string(),
                        'description' => 'График отправки'
                    ],
                    'campaign_price' => [
                        'type' => Types::string(),
                        'description' => 'Сума к оплате'
                    ],
                    'campaign_list' => [
                        'type' => Types::listOf(Types::int()),
                        'description' => 'Список Агентов'
                    ],	
					'flyer_id' => [
                        'type' => Types::nonNull(Types::int()),
                        'description' => 'id флаера'
                    ],				
					
                ];
            }
        ];
        parent::__construct($config);
    }
}