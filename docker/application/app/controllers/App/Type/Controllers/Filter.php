<?php
namespace App\Type\Controllers;

class Filter extends \ControllerBase
{

	public  $args;

	/*
	* @brief (Creates sql for filtering)
	* @param [sting] $typ
	* @return object
	*/
	public function filterElements ($typ)
	{
		
		$status = $search= "";
		
		if ($this->args["draftFlyers"]) $status = "AND flyer_status = 2";
		if ($this->args["resentFlyers"]) $status = "AND flyer_status = 1";
		
		if (isset($this->args['searchText'])) $search = "{$typ}_name LIKE '%".$this->args['searchText']."%' AND";
						
			switch ($this->args["sortBy"]) {

				case 1:
					$orderBy = "ORDER BY {$typ}_create ASC";
					break;
				case 2:
					$orderBy = "ORDER BY {$typ}_create DESC";
					break;
				case 3:
					$orderBy = "ORDER BY flyer_update ASC";
					break;	
				case 4:
					$orderBy = "ORDER BY {$typ}_name ASC";
					break;	
				case 5:
					$orderBy = "ORDER BY {$typ}_name DESC";
					break;	
				default:
					$orderBy = ($typ=='flyer') ? "ORDER BY id DESC": "ORDER BY EmailCampaign.id DESC";
			}		
	
		return (object)["orderBy"=>$orderBy, "status"=>$status, "search" =>$search ];
	}

}	