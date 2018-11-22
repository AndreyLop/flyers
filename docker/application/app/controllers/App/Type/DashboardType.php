<?php

namespace App\Type;

use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;
use App\Type\Controllers\Flyer;
/**
 * Class DashboardType
 *
 * Тип User для GraphQL
 *
 * @package App\Type\Forms
 */
class DashboardType extends ObjectType
{
   
   public  $args;

   public function __construct()
   {
        $config = [
            'description' => 'Dashboard',
            'fields' => function() {
                return [
					 'user' => [
                        'type' => Types::user(),
                        'description' => 'Пользователь',
                        'resolve' => function ($root) {

							if (!isset($root->id)) $root= (object) ['id'=>0];
							
							$output	=  $this->sql()->selectOne("SELECT * from Users  WHERE id = {$root->id}");

							return $output;
                        }],
						'flyerTemplate' => [
                        'type' => Types::flyerTemplate(),
                        'description' => 'Шаблоны флаеров',
                        'resolve' => function ($root) {
														
							if (isset($root->id)) {
								$root->id = " WHERE id = {$root->id}";
							}
							else{
								$root= (object) ['id'=>""];
							}

									
							$output	=  $this->sql()->selectSerialize("SELECT * from FlyerTemplate {$root->id}", ['template_properties']);

							
							return $output;
                        }],
						
						'myFlyers' => [
                        'type' => Types::listOf(Types::flyer()),
                        'description' => 'Флаера пользователя',
                        'resolve' => function ($root,$args) {

							if (!isset($root->id)) $root= (object) ['id'=>0];
									
							$output	=  $this->sql()->selectSerialize("SELECT * from Flyers WHERE flyer_status!=0 AND user_id={$this->args['id']}");
									
							
							return $output;
                        }],
						
						
						'infoFlyer' => [
                        'type' => Types::flyer(),
                        'description' => 'infoFlyer',
                        'resolve' => function ($root,$args) {

							if (!isset($root->id)) $root= (object) ['id'=>0];
							if ($this->args['typ']==0) $this->args['flyer_id']=0;
									
							$output	=  $this->sql()->selectSerialize("SELECT * From Flyers WHERE flyer_status!=0 AND id={$this->args['flyer_id']} AND  user_id={$this->args['id']}");
									
							
							return $output;
                        }],
						'errorFlyer' => [
						'type' => Types::string(),
                        'description' => 'infoFlyer',
                        'resolve' => function ($root,$args) {

							if ($this->args['typ']==0) $this->args['flyer_id']=0;

							$flyer = new Flyer();
							$flyer->args = $this->args;	
							$flyer->sql  = $this->sql();	 

							return $flyer->searchErrorsFlyer();
                        }],
						
                ];
            }
        ];
        parent::__construct($config);
    }
		
		
	protected function sql() 
	{
		return  new  Ql();
	}	
	
	
}