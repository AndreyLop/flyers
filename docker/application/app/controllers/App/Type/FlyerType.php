<?php

namespace App\Type;

use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class FlyerType
 *
 * Тип Flyer для GraphQL
 *
 * @package App\Type
 */
class FlyerType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Flyer',
            'fields' => function() {
                return [
                    'id' => [
                        'type' => Types::string(),
                        'description' => 'Идентификатор flyer'
                    ],
					'development' => [
                        'type' => Types::int(),
                        'description' => 'Development'
                    ],
                    'flyer_name' => [
                        'type' => Types::string(),
                        'description' => 'Имя flyer'
                    ],
					 'flyer_create' => [
                        'type' => Types::string(),
                        'description' => 'Дата создания'
                    ],
                    'flyer_update' => [
                        'type' => Types::string(),
                        'description' => 'Дата изменения'
                    ],
					 'flyer_preview' => [
                        'type' => Types::string(),
                        'description' => 'Изображение предварительного просмотра флаера'
                    ],
					'flyer_photo' => [
                        'type' => Types::listOf(Types::string()),
                        'description' => 'Масив данных картинок для step 1'
                    ],
					'flyer_photo_key' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Ключи массива картинок для step 1'
                    ],
					'flyer_photo_transform' => [
                        'type' => Types::listOf(Types::string()),
                        'description' => 'Масив данных поворота картинок для step 1'
                    ],	 
					'flyer_photo_transform_key' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Ключи массива поворота картинок для step 1'
                    ],					
					'flyer_status' => [
                        'type' => Types::int(),
                        'description' => '0 - удален 1 - заполнен 2 -черновик'
                    ],
					'property_info' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Масив данных для step 2'
                    ],
					
					'property_info_key' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Ключи массива для step 2'
                    ],
					
					'extra_info' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Масив данных для step 3'
                    ],
					
					'extra_info_key' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Ключи массива для step 3'
                    ],
					
					'realtor_info' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Масив данных для step 4'
                    ],
					'realtor_info_key' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Ключи массива для step 4'
                    ],
					
					'company_info' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Масив данных для step 5'
                    ],					
					'company_info_key' => [
                        'type' => Types::listOf(Types::string()),
						'description' => 'Ключи массива для step 5'
                    ],		
					
					'emailCamping' => [
                        'type' => Types::listOf(Types::campaign()),
                        'description' => 'Статистика компаний',
                        'resolve' => function ($root) {

						   $output	=  $this->sql()->selectJoin("SELECT * FROM EmailCampaign left join Flyers  ON EmailCampaign.flyer_id =Flyers.id  WHERE flyer_id = {$root->id} AND Flyers.user_id={$root->user_id} ORDER BY campaign_create DESC", ['emailCampaign']);	
													
						   return $output;
                        }
                    ],
					
					'allPosts' => [
                        'type' => Types::int(),
                        'description' => ''
                    ],
							
					
					'data' => [
                        'type' => Types::string(),
                        'description' => 'Статистика компаний',
                        'resolve' => function ($root) {
							
						$output	=  $this->sql()->select("SELECT * from Flyers WHERE user_id={$root->user_id}");
						$n= json_encode($root);
						  
						$outpu=$n;
						  
						   return $outpu;
                        }
                    ]
					
					
                ];
            }
        ];
        parent::__construct($config);
    }
	
	protected function sql() 
	{
		return new  Ql();
	}	
}