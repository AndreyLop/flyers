<?php

use Phalcon\Cli\Task;
use App\Type\Controllers\SendingCampaign;

class MainTask extends Task
{
	
	/*
	* @brief (Mailing flyers)
	*/
    public function mainAction()
    {
		
	  $setDate = time();

	  $result = $this->modelsManager->executeQuery("SELECT * FROM EmailCampaign WHERE status=1 AND ((campaign_send = 0 AND campaign_send_date<={$setDate}) OR (campaign_send = 1 AND sent_date IS NULL ))");

		  if (count ($result)) {
			  
			  $this->pl;
			  $sendCampaign = new SendingCampaign();
			  
			  foreach ($result as $campaign) {
			
				$output = $sendCampaign -> sendingСampaign($campaign->id);
	
			  }
			  
		  }		
		  
	}
}

