<?php
namespace App\Type\Controllers;

use App\Type\Controllers\Filter;
use App\Type\Controllers\GenerateFlyer;

class Flyer extends \ControllerBase
{

	public  $args;

	public  $sql;

	/* 
	* @brief (Filter the Flyer)
	* @return array
	*/
	public function filterFlyer ()
	{
					
		$filter = new Filter();	
		$filter ->args = $this->args;	
		$sqlSort = $filter ->filterElements('flyer');	

        $output	=  $this->sql->select("SELECT * FROM Flyers
				WHERE
					{$sqlSort->search} user_id = {$this->args['userId']} {$sqlSort->status} {$sqlSort->orderBy} LIMIT {$this->args['limit']} OFFSET {$this->args['firstEl']} ", true);

        if (isset($output[0])) { 
			$output[0]->allPosts = $this->sql->affectingStatement("SELECT * FROM Flyers
				WHERE
					{$sqlSort->search} user_id = {$this->args['userId']} {$sqlSort->status}"); 

			foreach ($output as $key=>$t) {
				$output[$key]->development = $this->config->payments['development'];
			}
		}
					

		 return $output;
	}
	
	
	
	/*
	* @brief (Create new Flyer)
	* @return int
	*/
	public function newFlyer ()
	{
		$FlyerTemplate = $this->modelsManager->executeQuery("SELECT template_properties FROM FlyerTemplate WHERE id={$this->args['template_id']}  LIMIT 1");
		$user = $this->modelsManager->executeQuery("SELECT * FROM Users WHERE id={$this->args['id']}");
		
		$user = $user[0];
		
			$realtor_info_key = [ 'realtorName', 
								  'realtorSlogan', 
								  'realtorPhone', 
								  'realtorEmail', 
								  'realtorWebsite', 
								  'realtorPhotoName', 
								  'realtorPhotoRotationAngle'
								 ];
            $user->user_photo   = $this->copyImage($user->user_photo, $this->args['id']);
            $user->company_logo = $this->copyImage($user->company_logo, $this->args['id']);

			$realtor_info =[ $user->user_first_name." ".$user->user_last_name,
							 $user->slogan,
							 $user->user_phone,
							 $user->user_email,
							 $user->website,
							 $user->user_photo,
							 0
						   ];
			$realtor_info = serialize(array_combine($realtor_info_key, $realtor_info));		
										 
			$company_info_key  = [ 'companyName', 
								   'companyPhone', 
								   'companyFax', 
								   'addressLine1', 
								   'addressLine2', 
								   'city', 
								   'state', 
								   'zip', 
								   'companyPhotoName', 
								   'companyPhotoRotationAngle'
								 ];

			$company_info =[ $user->company_name,
							 $user->company_phone,
							 $user->company_fax,
							 $user->company_adress1,
							 $user->company_adress2,
							 $user->company_city,
							 $user->state,
							 $user->company_code,
							 $user->company_logo,
							 0
						   ];
			$company_info = serialize(array_combine($company_info_key, $company_info));							

			$saveFlyer = "INSERT INTO Flyers 
							(	flyer_name, 
								template_id,
								user_id,
								flyer_photo,
								flyer_photo_transform,
								property_info,
								extra_info,
								realtor_info,
								company_info
							) VALUES (	:flyer_name:, 
								:template_id:,
								:user_id:,
								:flyer_photo:,
								:flyer_photo_transform:,
								:property_info:,
								:extra_info:,
								:realtor_info:,
								:company_info:
							)";

			$stat =  [	"flyer_name"	 => $this->args['flyer_name'],	
						"template_id"	 => $this->args['template_id'],	
						"user_id"		 => $this->args['id'],
						"flyer_photo"	 => $FlyerTemplate[0]->template_properties,
						"flyer_photo_transform"	 => $FlyerTemplate[0]->template_properties,
						"property_info"	 => 'a:8:{s:12:"addressLine1";s:0:"";s:12:"addressLine2";s:0:"";s:4:"city";s:0:"";s:5:"state";s:0:"";s:3:"zip";s:0:"";s:5:"price";s:0:"";s:9:"mlsNumber";s:0:"";s:7:"website";s:0:"";}',
						"extra_info" 	 => 'a:2:{s:8:"headline";s:0:"";s:7:"content";s:0:"";}',
						"realtor_info"   =>	$realtor_info,
						"company_info"   => $company_info
					 ];
								 
			$this->modelsManager->executeQuery( $saveFlyer, $stat );	

			$output = $this->modelsManager->executeQuery("SELECT id FROM Flyers WHERE user_id={$this->args['id']} ORDER BY id DESC LIMIT 1");

            $flyerPreview = time().'-flyer';
            $flyerPreview = ((new GenerateFlyer())->generateImage($this->args['id'], $output[0]->id, $flyerPreview)) ? $flyerPreview : 'temp';
            $flyerPreview.='.png';

            $this->modelsManager->executeQuery( "UPDATE Flyers SET flyer_preview=:flyer_preview:  WHERE id='".$output[0]->id."'",
                                                ["flyer_preview"	=> $flyerPreview]
                                              );

        return $output[0]->id;
	}

	/*
	* @brief (Update Flyer)
	* @return int
	*/
	public function saveFlyer ()
	{

		foreach ($this->properties as $var) {
                    if (array_key_exists ($var, $this->args) && is_array($this->args[$var])) {
                    $array = array_combine($this->args[$var.'_key'],$this->args[$var]);
                    $this->args[$var] =$array;
                }
		}

        $this->option['user_id'] = $this->args['id'];

        if (isset($this->args['realtor_info'])) {

            $img = $this->args['realtor_info']['realtorPhotoName'];
            $this->args['realtor_info']['realtorPhotoName'] = $this-> rotateImage($this->dirsImg($img),  $this->args['realtor_info']['realtorPhotoRotationAngle'], $img);
            $this->args['realtor_info']['realtorPhotoRotationAngle'] = 0;
        }

        if (isset($this->args['company_info'])) {

            $img = $this->args['company_info']['companyPhotoName'];


            $this->args['company_info']['companyPhotoName'] = $this-> rotateImage($this->dirsImg($img),  $this->args['company_info']['companyPhotoRotationAngle'], $img);
            $this->args['company_info']['companyPhotoRotationAngle'] = 0;
        }

        if (isset($this->args['flyer_photo']))  {

            foreach ($this->args['flyer_photo'] as $key=>$img){

                    $this->args['flyer_photo'][$key] =  $this->rotateImage($this->dirsImg ($img),  $this->args['flyer_photo_transform'][$key], $img);
                    $this->args['flyer_photo_transform'][$key] = 0;
            }

        }
	
		
		if ($this->args['flyer_error_photo']!= null)  {
			$this->args['flyer_error_photo'] = serialize($this->args['flyer_error_photo']);
		}
		
		$stat = [	"flyer_name"	=> $this->args['flyer_name'],
					"flyer_photo"	=> serialize($this->args['flyer_photo']),
					"flyer_photo_transform"	 => serialize($this->args['flyer_photo_transform']),
					"property_info"	 => serialize($this->args['property_info']),
					"extra_info" 	 => serialize( $this->args['extra_info']),
					"realtor_info"   => serialize($this->args['realtor_info']),
					"company_info"   => serialize($this->args['company_info']),
					"flyer_error"	 => $this->args['flyer_error_photo'],						
					"realtor_error"  => $this->args['realtor_error_photo'],	
					"company_error"	 => $this->args['company_error_photo'],	
			   ];
		
			switch ($this->args['typ']){
				case 1:
				
					$updateVar = ', flyer_photo = :flyer_photo:,
								    flyer_photo_transform = :flyer_photo_transform:,
									flyer_error = :flyer_error:';
					break;
				case 2:
					$updateVar = ', property_info = :property_info:';
					
					break;
				case 3:
					$updateVar = ', extra_info = :extra_info:';
					
					break;	
				case 4:
					$updateVar = ', realtor_info = :realtor_info:,
									realtor_error = :realtor_error:';
					
					break;	
				case 5:
					$updateVar = ', company_info = :company_info:,
									company_error = :company_error:';
					
					break;
				case 6:
					$updateVar = ', flyer_name = :flyer_name:';
					
					break;	
				case 7:
					$updateVar = ', flyer_status = 1, 
								   flyer_name = :flyer_name:';		   
					/**
					*  Генерация флаера (pdf)
					*/
					$output	=  $this->modelsManager->executeQuery("SELECT * FROM Flyers WHERE flyer_status!=0 AND id={$this->args['flyer_id']}");
						if (count($output)) {
						
							$flyerPreview = str_replace(".png", "", $output[0]->flyer_preview);
							$flyerPreview = (new GenerateFlyer())->generatePdf($this->args['id'], $output[0]->id, $flyerPreview);
						}	
						
					break;	
				default	:
					$updateVar = '';
					
					break;					
			}
			
			$saveFlyer = "UPDATE Flyers SET flyer_update=:flyer_update: {$updateVar} WHERE id='{$this->args['flyer_id']}'";	
					 
			$stat = array_merge($stat, ["flyer_update"	=> date('Y-m-d H:i:s')]);	

			$result = $this->modelsManager->executeQuery( $saveFlyer, $stat );

			return $result->success();
	}

	/*
	* @brief (Copy Flyer)
	* @return int
	*/
	public function copyFlyer ()
	{
		$result = $this->modelsManager->executeQuery("SELECT * FROM Flyers WHERE user_id={$this->args['access']['id']}  AND  id={$this->args['copy_flyer_id']}");

            if (count($result)){

                $copy = $result[0];
                foreach ($this->properties as $var) {

                   $_temp =  unserialize($copy->{$var});

                    if ($var=='flyer_photo') {

                        foreach ($_temp as $key=> $img) {
                            $_temp[$key] = $this->copyImage($img);
                        }
                    }

                    if ($var=='realtor_info') {
                        $_temp['realtorPhotoName'] = $this->copyImage($_temp['realtorPhotoName']);
                    }

                    if ($var=='company_info') {
                        $_temp['companyPhotoName'] = $this->copyImage($_temp['companyPhotoName']);
                    }

                    $copy->{$var} = serialize($_temp);
                }
            }
		$saveFlyer = "UPDATE Flyers  SET 
						flyer_photo = :flyer_photo:,
						flyer_photo_transform = :flyer_photo_transform:,
						property_info = :property_info:,
						extra_info = :extra_info:,
						realtor_info = :realtor_info:,
						company_info = :company_info:,
						flyer_update=:flyer_update:
					 WHERE id='{$this->args['flyer_id']}' AND user_id='{$this->args['access']['id']}'";	
					
		$stat = [	"flyer_photo"	=> $copy->flyer_photo,
					"flyer_photo_transform"	=> $copy->flyer_photo_transform,
					"property_info"	 => $copy->property_info,
					"extra_info" 	 => $copy->extra_info,
					"realtor_info"   => $copy->realtor_info,
					"company_info"   => $copy->company_info,
					"flyer_update"	=> date('Y-m-d H:i:s')
			   ];		
		
		$result = $this->modelsManager->executeQuery( $saveFlyer, $stat );

        return $result->success();
	}

	/*
	* @brief (Delate Flyer)
	* @return int
	*/
	public function deleteFlyer ()
	{
		$result = $this->modelsManager->executeQuery("DELETE FROM Flyers WHERE user_id={$this->args['access']['id']}  AND  id={$this->args['flyer_id']}");
			
		return $result->success();
	}

    /**
     *  @brief (Generates a picture of the flyer from the template, looks for errors when filling the flyer fields)
     *  @return json
     */
	public function searchErrorsFlyer()
	{
		$output	=  $this->sql->selectSerialize("SELECT *
												  FROM Flyers 
												  WHERE flyer_status!=0 AND id={$this->args['flyer_id']} AND  user_id={$this->args['id']}");
							
		$filter = ['flyer_photo','property_info', 'extra_info','realtor_info','company_info'];
		$errorPhotoFilter = ['realtorPhotoName', 'companyPhotoName'];
		$errors = $warnings = [];
		
		foreach ($filter as $k=>$property) {
			
			if (is_array($output->{$property})) {
				$error = array_filter($output->{$property}, array($this, 'emptyFilter'));
				
				foreach ($error as $key=>$t) {
					
					if ($k==0 || in_array( $output->{$property.'_key'}[$key], $errorPhotoFilter)) {
						
						$errors[] = ['key'=> $output->{$property.'_key'}[$key], 'step'=>$k+1, 'typ'=>1];
					}
					else {
						
						$warnings[] = ['key'=> $output->{$property.'_key'}[$key], 'step'=>$k+1];
					}
				}
			}
				
		}	
			
		if($output->realtor_error)	$errors[] = ['key'=> 'realtorPhotoName', 'step'=>4, 'typ'=>2];
		if($output->company_error)	$errors[] = ['key'=> 'companyPhotoName', 'step'=>5, 'typ'=>2];
		if(!empty($output->flyer_error))	{
			$errorPhoto = unserialize($output->flyer_error);
			
			foreach ($errorPhoto as $k=>$photo) {
				if ($photo) {
					$errors[] = ['key'=> $k, 'step'=>1, 'typ'=>2];
				}
			}
			
		}
		
	
		/**
		 *  Генерация флаера (png)
		 */
		$flyerPreview = time().'-flyer';
		$flyerPreview = ((new GenerateFlyer())->generateImage($this->args['id'], $output->id, $flyerPreview)) ? $flyerPreview : 'temp';
		$flyerPreview.='.png';

		if (!empty($output->flyer_preview)) {
			
			$flyerPreviewOld = BASE_PATH."/public/upload/flyers_thumbnails_users/{$this->args['id']}/template/{$output->flyer_preview}";
			if (file_exists($flyerPreviewOld) && $output->flyer_preview!='temp.png') 	 unlink($flyerPreviewOld);  
		}

		$this->modelsManager->executeQuery( "UPDATE Flyers SET flyer_update=:flyer_update:, flyer_preview=:flyer_preview:  WHERE id='{$this->args['flyer_id']}'", 
											  [ "flyer_update"	=> date('Y-m-d H:i:s'),
												"flyer_preview"	=> $flyerPreview]);			
							
		return json_encode(['errors' =>$errors, 'warnings'=> $warnings, 'img'=>$flyerPreview]);
	}

	/**
	 *  @brief (Filter for function)
	 *  @param [int] $var
	 *  @return string 
	 */	
	protected function emptyFilter($var)
	{
		return(empty($var));
	}

    /**
     *  @brief (Rotate images)
     *  @param [sting] $var
     *  @param [int] $degrees
     *  @param [string] $name
     *  @return string
     */
    protected function rotateImage($var,  $degrees, $name)
    {

        $name = str_replace(' ', '-', $name);
        $var = str_replace(' ', '-', $var);
        $var = BASE_PATH.'/public'.$var;
        $degrees = $degrees*-1;

        if ($degrees!=0 && file_exists($var)){
           $size = getimagesize($var);
            switch ($size['mime']) {
                case "image/gif":
                    $img = imagecreatefromgif($var);
                    imagegif(imagerotate($img, $degrees, 0), $var);
                    $new_name = '.gif';
                    break;
                case "image/jpeg":
                    $img = imagecreatefromjpeg($var);
                    imagejpeg(imagerotate($img, $degrees, 0), $var, $this->config->compressionJpg);
                    $new_name = '.jpg';
                    break;
                case "image/png":
                    $img = imagecreatefrompng($var);
                    imagealphablending($img, false);
                    imagesavealpha($img, true);
                    $rotation = imagerotate($img, $degrees, imageColorAllocateAlpha($img, 0, 0, 0, 127));
                    imagealphablending($rotation, false);
                    imagesavealpha($rotation, true);
                    imagePng($rotation, $var, $this->config->compressionPng);
                    $new_name = '.png';

                    break;
                case "image/bmp":
                    $img = imagecreatefrombmp($var);
                    imagebmp(imagerotate($img, $degrees, 0), $var);
                    $new_name = '.bmp';
                    break;
            }
            $new_name = str_replace('.', '', microtime(true)).$new_name;
            rename ($var, str_replace($name, $new_name, $var));

            return $new_name;
        }
        else {
            return $name;
        }
    }

    /**
     *  @brief (Copy image for flyer)
     *  @param [sting] $file
     *  @param [int] $id
     *  @return string
     */
    protected function  copyImage($file, $id = 0)
    {

        $id = ($id) ? $id : $this->args['access']['id'];
        $newfile = 'copy_'.$file;
        $dir = BASE_PATH."/public/upload/flyers_thumbnails_users/{$id}/";

        if (file_exists($dir.$file) && !empty($file)) {
            copy($dir.$file, $dir.$newfile);
            return $newfile;
        }
        else {
           return $file;
        }
    }

}

