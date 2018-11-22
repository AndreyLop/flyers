<?php

namespace App\Type;

use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;
use App\Type\Controllers\Flyer;
use App\Type\Controllers\Campaign;

class QueryType extends ObjectType
{
    public function __construct()
    {
      
	   $config = [
            'fields' => function() {
			
                return [
                    'user' => [
                        'type' => Types::user(),
                        'description' => 'Возвращает пользователя по id',
                        'args' => array(
                            'id' => Types::int(),
							'accessToken' 	 => Types::string()
                        ),
                        'resolve' => function ($root, $args) {
                            
						$output	=  $this->sql()->selectOne("SELECT *  FROM Users WHERE id = {$args['id']}");
							
						return  $output;
                        }
                    ],
					
					'flyers'=> [
                        'type' => Types::listOf(Types::flyer()),
                        'description' => 'Список флаеров',
                        'args' => [
							'accessToken' 	 => Types::string(),
							'userId'	 	 => Types::nonNull(Types::int()),
							'allFlyers'	 	 => [ 'type' => Types::boolean(), 'defaultValue' => false	],
							'resentFlyers'	 => [ 'type' => Types::boolean(), 'defaultValue' => false	],
							'draftFlyers'	 => [ 'type' => Types::boolean(), 'defaultValue' => false	],
							'listingProperty'=> [ 'type' => Types::boolean(), 'defaultValue' => false	],
							'sortBy'		 => [ 'type' => Types::int(),     'defaultValue' => 0	],
							'searchText'	 => Types::string(),						
							'firstEl'	     => [ 'type' => Types::int(),   'defaultValue' => 0			],
							'limit' 	     => [ 'type' => Types::int(),	'defaultValue' => 4			]
                        ],
					 
                        'resolve' => function ($root, $args) {		
						
							$filter = new Flyer();
							$filter->args =  $args;
							$filter->sql =  $this->sql();
							
							$output = $filter -> filterFlyer ();
							
                            return $output;
                        },
                    ],
									
					'flyerTemplate'=> [
                        'type' => Types::listOf(Types::flyerTemplate()),
                        'description' => 'Список шаблонов флаеров',
                        'args' => [

							'accessToken' 	 => Types::string()
                        ],
					 
                        'resolve' => function ($root, $args) {		

						  $output	=  $this->sql()->selectSerialize("SELECT *  FROM FlyerTemplate WHERE template_active=1  ORDER BY id ASC", ['template_properties']);

                          return $output;
                        },
                    ],
					
					'openFlyer'=> [
                        'type' => Types::dashboard(),
                        'description' => 'Создать/показать флаер пользователя',
                        'args' => [
							'id' 		=>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id пользователя' ],
							'accessToken' => Types::string(),
							'flyer_id'	=>  Types::nonNull(Types::int()),
							'typ' 		=>  [ 'type' => Types::int(), 'defaultValue' => 7, 'description' => '0 - новый, 1 - старый' ]

                        ],
					 
                        'resolve' => function ($root, $args) {		
						
							Types::dashboard()->args=$args;
							
							if (!$args['typ']) {
								$sql = "SELECT id  FROM FlyerTemplate WHERE   id = {$args['flyer_id']}";
							}
							else {
								$sql = "SELECT template_id as id  FROM Flyers WHERE  flyer_status!=0 AND id = {$args['flyer_id']}";
							}
							
							$output	=  $this->sql()->selectOne($sql);
							
                            return $output;
                        },
                    ],	
					
					'state'=> [
                        'type' => Types::listOf(Types::distribution()),
                        'description' => 'Масив для Select distribution',
                        'args' => [
							'access' 	=> Types::access(),
							'state'		=>  [ 'type' => Types::int(), 'description' => 'id штата 1-50 (не обезательно)', 'defaultValue' =>0 ],
                        ],
					 
                        'resolve' => function ($root, $args) {		
							
							$where = ($args['state']) ?  "WHERE id={$args['state']}" :  ''; 
							
							$output	=  $this->sql()->select("SELECT *  FROM State {$where}", true);
							
                            return $output;
                        },
                    ],
					
					'dashboard'=> [
                        'type' => Types::dashboard(),
                        'description' => 'Личный кабинет',
                        'args' => [
							'id' =>  [ 'type' => Types::int(), 'description' => 'id пользователя' ],
							'accessToken' 	 => Types::string()
                        ],
					 
                        'resolve' => function ($root, $args) {		

							$output	=  $this->sql()->selectOne("SELECT id  FROM Users WHERE id = {$args['id']}");
	
                            return $output;
                        },
                    ],
					
					'myCampaigns'=> [
                        'type' => Types::listOf(Types::campaign()),
                        'description' => 'Список компаний пользователя',
                        'args' => [
							'access' 		 => Types::access(),
							'sortBy'		 => [ 'type' => Types::int(),   'defaultValue' => 0	],
							'searchText'	 => Types::string(),						
							'firstEl'	     => [ 'type' => Types::int(),   'defaultValue' => 0	],
							'limit' 	     => [ 'type' => Types::int(),	'defaultValue' => 4	]
                        ],
					 
                        'resolve' => function ($root, $args) {		
						
							$filter = new Campaign();
							$filter->args =  $args;
							$filter->sql  =  $this->sql();
								
							$output = $filter -> filterCampaign ();

                            return $output;
                        },
                    ],
			
					'reportCampaign'=> [
                        'type' => Types::listOf(Types::campaign()),
                        'description' => 'Отчет о кампании',
                        'args' => [
							'access' 		 => Types::access(),
							'campaign_id'	 => [ 'type' => Types::int(), 'description' => 'id кампании' ],
                        ],
					 
                        'resolve' => function ($root, $args) {		
						
							$filter = new Campaign();
							$filter->args =  $args;
							$filter->sql  =  $this->sql();
								
							$output = $filter -> reportCampaign ();

                            return $output;
                        },
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