<?php

namespace App\Type;

use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;

/**
 * Class DistributionType
 *
 * Тип DistributionTypeдля GraphQL
 *
 * @package App\Type\Forms
 */
class DistributionType extends ObjectType
{
   public function __construct()
   {
        $config = [
            'description' => 'Штат',
            'fields' => function() {
                return [
					'id' => [
                        'type' => Types::int(),
                        'description' => 'id'
                    ],
					'state' => [
                        'type' => Types::string(),
                        'description' => 'Штат'
                    ],
					
					'region_list' => [
                        'type' => Types::listOf(Types::distribution()),
                        'description' => 'Region',
                        'resolve' => function ($root) {
													
						$output	=  $this->sql()->selectJoin("SELECT *  FROM State, Region WHERE State.id={$root->id} AND State.id= Region.state_id", ['region']);
						   return $output;
                        }
                    ],
						'region_name' => [
                        'type' => Types::string(),
                        'description' => 'Названия региона'
						],
					
						'distribution_list' => [
							'type' => Types::listOf(Types::distribution()),
							'description' => 'Distribution',
							'resolve' => function ($root) {
														
							   $output	=  $this->sql()->selectJoin("SELECT *  FROM Region, Distribution WHERE Region.id={$root->id} AND Region.id= Distribution.region_id", ['distribution']);
										
							   return $output;
							}
						],
							'distribution_id' => [
								'type' => Types::int(),
								'description' => 'distribution id'
							],
							'distribution' => [
								'type' => Types::string(),
								'description' => ''
							],
							'price' => [
								'type' => Types::string(),
								'description' => 'Цена'
							],
					 
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