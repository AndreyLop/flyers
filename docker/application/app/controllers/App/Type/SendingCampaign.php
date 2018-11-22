<?php
namespace App\Type\Controllers;

use Mailgun\Mailgun;
use Bogardo\Mailgun\Mail\Message;

class SendingCampaign extends \ControllerBase
{

	public $args;

	public $option;
	
	
	/**
	 * @brief (Mailing via Mailgun service)
     * @param [int] $id
	 * @return int
	 */
    public function sendingСampaign ($id)
	{
		$campaign = $this->modelsManager->executeQuery("SELECT * FROM EmailCampaign WHERE id ={$id}");
		
			if (count($campaign)) {
				
				$campaign = $campaign[0];	
					
				if (!$campaign->campaign_send && $campaign->campaign_send_date>time()) {
					
					return true;
				}			
				
			}
			else {
				
				$this->addErrorSender(intval($id), 'Email campaign not found!');
				
				return false;
			}

		$campaign_list =implode(",", 	unserialize($campaign->campaign_list));
			
		$senderName =(empty($campaign->campaign_name)) ? $user[0]->user_first_name.' '.$user[0]->user_last_name : $campaign->campaign_name;
		
		$flyer = $this->modelsManager->executeQuery("SELECT * FROM Flyers LEFT JOIN FlyerTemplate ON Flyers.template_id = FlyerTemplate.id WHERE Flyers.id ={$campaign->flyer_id}");
	
		if (!count($flyer)) {
			$this->addErrorSender(intval($id), "Error sending email to distributor <{$t->email}>! Template flyer not found!");
			
			return 0;
		}
		
			foreach ($flyer[0]->flyers as $key=>$var) {
				
				 if (in_array($key, $this->properties) ) { 

					$var= unserialize ($var); 
					if ($key =='flyer_photo' ) {
					//	$var = array_map( array($this, 'dirsImg'),$var, 1);
						foreach ($var as $k=>$t) {
							$var[$k] = $this->dirsImg ($t, 1);
						}
						
					}  
					
					
					if (isset($var['companyPhotoName']))  $var['companyPhotoName'] = $this->dirsImg ($var['companyPhotoName'], 1);
					if (isset($var['realtorPhotoName']))  $var['realtorPhotoName'] = $this->dirsImg ($var['realtorPhotoName'], 1);	
				} 
				
				$this->option[$key] = $var;
			
			}
				
		$user = $this->modelsManager->executeQuery("SELECT user_email FROM Users WHERE id ={$this->option['user_id']}");

		ob_start();
				
			include  BASE_PATH."/public/templates/flyer-{$flyer[0]->flyerTemplate->id}/index.php";

			$html = ob_get_contents();

		ob_end_clean();
		
		//$mg = Mailgun::create($this->config->emailTracing->apiKey);

		$distribution = $this->modelsManager->executeQuery("SELECT email FROM Distribution WHERE distribution_id IN({$campaign_list})");
		
		$sent = 0;
		$recipientVariablesList = $recipientList = [];
		
			foreach ($distribution as $key=>$t) {
				
				$recipientVariablesList[$t->email] = ['id'=>$key];
				$recipientList[] = $t->email;
			}
	
				try {
					
					$data = [
					  'from'		 => "{$senderName} <{$user[0]->user_email}>",
					
					  'to'			 => $recipientList,
					  'subject' 	 => $campaign->campaign_subject,
					  'o:tracking'   => true,
					  'v:id-campaign' => $id,
					  'html'   		 => $html,
					  'recipient-variables' => json_encode($recipientVariablesList)
					  ];
					
					$result = $mg->messages()->send($this->config->emailTracing->domailName, $data );

					$sent++; 
		
					$result = $this->modelsManager->executeQuery("UPDATE EmailCampaign SET status=2, sent=:sent:, sent_date=:sent_date: WHERE id='{$id}'", ['sent'=>$sent, 'sent_date'=>date('Y-m-d H:i:s')]);	
		
				} 
				catch (\Exception $e) {
		
					unset ($data['html']);
					
					$this->logging(['data' => $data,'error' => $e->getMessage()]);
					
					$this->addErrorSender(intval($id), "Error sending email to distributor <{$t->email}>!");
				}
	
		return $sent;
	}

	/**
	 * @brief (Add error in db)
     * @param [int] $id
     * @param [string] $error
     * @return object
	 */
	private function addErrorSender($id, $error)
	{
		$this->modelsManager->executeQuery("INSERT INTO ErrorsSender (campaign_id, error) VALUES (:id:, :error:)", ['id'=>$id, 'error'=>$error]);
	}

}