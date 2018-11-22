<?php
namespace App;


/**
 * Class Ql
 *
 * Связывание адаптера БД Phalcon и grafQl
 *
 * @package App
 */
class Ql extends \ControllerBase
{
  
	public  function select($query, $more = null)
    {
		
		$output_sql=$this->modelsManager->executeQuery($query);
				
			$output=[];
			$count  = count($output_sql);
							
			foreach ($output_sql as $st) {
				$cols=(object)'';
				  foreach ($st as $k=>$t) {
					  
					  $cols->$k=$t;
				  }
				
				 if ($count>1 || $more) {
					 $output[] = $cols;
				 }
				 else {
					 $output = $cols;
				 }
				
			}
			return $output;
    }
	
	
	public  function selectOne($query)
    {
		
			return $this->select($query);
    }
	
	
	public  function selectSerialize($query, array $properties=['flyer_photo','flyer_photo_transform', 'property_info', 'extra_info', 'realtor_info', 'company_info'])
    {
		$output_sql=$this->modelsManager->executeQuery($query);
				
			$output = [];
			$count  = count($output_sql);
	
			foreach ($output_sql as $st) {
				
				$cols = (object)'';
				
				  foreach ( $st as $k=>$t) {
				
						 if (in_array($k, $properties) ) { 

							
							  $property = unserialize ($t); 
							 								
															
							  if (is_array($property)) {

								  $t= array_values($property);
								  $cols->{$k.'_key'}=array_keys($property);
							  }
								
					  } 
					  
					  $cols->$k=$t;
				 }
				 
				 if ($count>1) {
					 $output[] = $cols;
				 }
				 else {
					 $output = $cols;
				 }
				
			}
			return $output;
    }
	
	
	
	public  function selectJoin($query, $join=array())
    {
		
		$output_sql=$this->modelsManager->executeQuery($query);
		
			$output=[];
			
			foreach ($output_sql as $st) {
			
				$cols=(object)'';
				
				foreach ($join as  $count=>$ob) {
				
					foreach ($st->{$ob} as $k=>$t) {
					
					  $cols->$k=$t;
					}
				}
				
				$output[] = $cols;
			}
			return $output;
    }
	

	
	public  function affectingStatement($query)
    {
        $output_sql=$this->modelsManager->executeQuery($query);
			
        return count($output_sql);
    }
	
}
