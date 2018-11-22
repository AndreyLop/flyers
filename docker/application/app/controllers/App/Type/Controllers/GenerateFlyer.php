<?php
namespace App\Type\Controllers;
use mikehaertl\wkhtmlto\Pdf;
use mikehaertl\wkhtmlto\Image;

class GenerateFlyer extends \ControllerBase
{	
	
	public $option;
    public $flyer_name;
	
	/**
	 *  @brief (Generate pdf flyer)
	 *  @param [in] $id id user
	 *  @param [in] $flyer_id id flyer
	 *  @param [in] $flyer_name flyer name
	 *  @return int
	 */
	public function generatePdf($id, $flyer_id, $flyer_name)
	{
		$this->flyer_name = $flyer_name;

        $pdf = new Pdf();
		$globalOptions = array(
			'no-outline',         // Make Chrome not complain
			'print-media-type',
			'encoding' 		=> 'UTF-8', 
			// Default page options
			'page-size' 	=> 'a4',
			'orientation'	=> 'Portrait', // Set orientation to Landscape or Portrait
			'margin-left' 	=> 0,
			'margin-right'	=> 0,
			'margin-top' 	=> 0,
			'margin-bottom' => 0
		);

		$pdf->setOptions($globalOptions);
		$pdf->addPage($this->dirsTemplates($flyer_id, 1));
		$pdf->binary = $this->config->wkhtmlto->binaryPdf;
		
		
		if (!$pdf->saveAs(BASE_PATH."/public/upload/flyers_thumbnails_users/{$id}/template/{$flyer_name}.pdf")) {
			
			$this->logging($pdf->getError(),2);
			//throw new Exception('Could not create PDF: '.$pdf->getError());
			return false;
		} 
		else {
			
			return true;
		}
	}
	
	/**
	 *  @brief (Generate img flyer)
	 *  @param [in] $id id user
	 *  @param [in] $flyer_id id flyer
	 *  @param [in] $flyer_name flyer name
	 *  @return int
	 */
	public function generateImage($id, $flyer_id, $flyer_name)
	{
        $this->flyer_name = $flyer_name;

        $image = new Image($this->dirsTemplates($flyer_id));

        $this->config->compressionImageFlyer = (!$this->config->compressionImageFlyer) ? 100 : (100-$this->config->compressionImageFlyer);

		$globalOptions = array(
			//'height'=>1000
            'quality'=>$this->config->compressionImageFlyer,
			'width' =>600
		);
		$image->setOptions($globalOptions);

		$image->binary = $this->config->wkhtmlto->binaryImage;

		if (!$image->saveAs(BASE_PATH."/public/upload/flyers_thumbnails_users/{$id}/template/{$flyer_name}.png")) {
			
			$this->logging($image->getError(),2);
			//throw new Exception('Could not create image: '.$image->getError());
			return false;
		} 
		else 
		{
			 
			$setFile = BASE_PATH."/public/upload/flyers_thumbnails_users/{$id}/template/{$flyer_name}.png";
			$files = BASE_PATH."/public/upload/flyers_thumbnails_users/{$id}/template/{$flyer_name}_min.png";
			$information=getimagesize($setFile);
			
			$mywidth=$information[0];
			$myheight=$information[1];

			$newwidth=$mywidth;
			$newheight=$myheight;

			while(($newwidth > 140) || ($newheight > 220 )) {
				$newwidth = $newwidth-ceil($newwidth/100);
				$newheight = $newheight-ceil($newheight/100);
			} 
			
			$tmp=imagecreatetruecolor($newwidth,$newheight);
			$src=imagecreatefrompng($setFile);
			
			imagealphablending($tmp, false);
			imagesavealpha($tmp,true);
			
			$transparent = imagecolorallocatealpha($tmp, 255, 255, 255, 127);
			
			imagefilledrectangle($tmp, 0, 0, $newwidth, $newheight, $transparent);
			imagecopyresampled($tmp, $src, 0, 0, 0, 0, $newwidth, $newheight, $mywidth, $myheight);
			imagepng($tmp, $files);
			imagedestroy($tmp);
			imagedestroy($src);
						
			return true;
		}
	}
	
	/**
	 *  @brief ()
	 *  @param [in] $flyer_id id flyer
	 *  @return String
	 */
	private function dirsTemplates($flyer_id, $pdf = 0)
	{

        $this-> accessDirs();

        $flyer = $this->modelsManager->executeQuery("SELECT * FROM Flyers LEFT JOIN FlyerTemplate ON Flyers.template_id = FlyerTemplate.id WHERE Flyers.id ={$flyer_id}");

			foreach ($flyer[0]->flyers as $key=>$var) {
				
				 if (in_array($key, $this->properties) ) { 

					$var= unserialize ($var); 
					if ($key =='flyer_photo' ) {

						foreach ($var as $k=>$t) {
							$var[$k] = $this->dirsImg ($t, 2);
						}
					}  
					
					if (isset($var['companyPhotoName']))  $var['companyPhotoName'] = $this->dirsImg ($var['companyPhotoName'], 2);
					if (isset($var['realtorPhotoName']))  $var['realtorPhotoName'] = $this->dirsImg ($var['realtorPhotoName'], 2);	
				} 
				
				$this->option[$key] = $var;
			}
			
		$template = BASE_PATH."/public/templates/flyer-{$flyer[0]->flyers->template_id}/index.php";
		
		if ($pdf){
			if (file_exists(BASE_PATH."/public/templates/flyer-{$flyer[0]->flyers->template_id}/pdf.php")) {
				$template = BASE_PATH."/public/templates/flyer-{$flyer[0]->flyers->template_id}/pdf.php";
			}
		}

        $qr = $this->dirsImg('qr'.$flyer_id.'.png',2);

        if (!$pdf) {

        \QRcode::png( $this->config->siteProtocol."://".$_SERVER['SERVER_NAME']."/share/{$this->option['user_id']}/template/{$this->flyer_name}.png",
                           $qr, 'L', 4, 2);
        }

        $this->option['qr'] = $qr;
		$this->option['base'] = BASE_PATH."/public/";
		
		if($this->option['company_info']['state']=='Not selected') $this->option['company_info']['state'] = '';
	  	
		ob_start();
			include  $template;
			
			$html = ob_get_contents();
		ob_end_clean();
		
		return $html;
	}
}

