<?php
namespace App\Type\Controllers;

use Mailgun\Mailgun;
use Bogardo\Mailgun\Mail\Message;
use App\Type\Controllers\Filter;
use App\Type\Controllers\Paypal;
use App\Type\Controllers\SendingCampaign;

class Campaign extends \ControllerBase
{

	public $args;

	public $option;
	
	public $sql;
	
	public $_errors;
	
	/*
	* @brief (Filter the Campaign)
    * @return array
	*/
	public function filterCampaign ()
	{
		$this->args['draftFlyers']=$this->args['resentFlyers'] = '';
		
		$filter = new Filter();	
		$filter ->args = $this->args;	

		$sqlSort = $filter ->filterElements('campaign');	

		$output	=  $this->sql->selectJoin("SELECT * FROM EmailCampaign left join Flyers  ON EmailCampaign.flyer_id = Flyers.id 
						WHERE 
							{$sqlSort->search} Flyers.user_id={$this->args['access']['id']} 
							{$sqlSort->orderBy} LIMIT {$this->args['limit']} OFFSET {$this->args['firstEl']} ", ['flyers','emailCampaign']);	

			if (isset($output[0])) 	$output[0]->allPosts = $this->sql->affectingStatement("SELECT * FROM EmailCampaign left join Flyers  ON EmailCampaign.flyer_id = Flyers.id
						WHERE
							{$sqlSort->search} Flyers.user_id={$this->args['access']['id']}", ['emailCampaign']);
		

		return $output;
	}

    /*
    * @brief (Returns the data for Campaign report)
    * @return array
    */
	public function reportCampaign ()
	{

		$output	=  $this->sql->selectJoin("SELECT * FROM EmailCampaign left join Flyers  ON EmailCampaign.flyer_id = Flyers.id 
						WHERE 
							 Flyers.user_id={$this->args['access']['id']} AND  EmailCampaign.id={$this->args['campaign_id']}", ['flyers','emailCampaign']);	
	
		$distributions = unserialize($output[0]->campaign_list);
		
		if (count($distributions)) {
			
			$distributions = implode(",", 	$distributions);
			$campaign_list = [];
			
			$result = $this->modelsManager->executeQuery("SELECT distribution FROM Distribution WHERE distribution_id IN ({$distributions })");	
		
			foreach ($result as $t){
				
				$campaign_list[] = $t->distribution;
			}
		}
		
		$output[0]->campaign_list = $campaign_list;

        $transaction = $this->modelsManager->executeQuery("SELECT payment_transaction FROM Payments WHERE campaign_id={$this->args['campaign_id']}");
        $output[0]->transaction = (count($transaction)) ? $transaction[0]->payment_transaction : '';
			
		return $output;
	}

	/* 
	* @brief (Create a new campaign when ordering)
	* @return int
	*/
	public function newCampaign ()
	{
		$transactionId = ( $this->config->payments['development']) ? "00000000000000000" : $this->paymentCampaign();
				
		
		if (empty($this->_errors)) {
				
			if (!empty ($this->args['campaign']['campaign_list']))  $this->args['campaign']['campaign_list'] = serialize ($this->args['campaign']['campaign_list']);
			if ($this->args['campaign']['campaign_send_date']>9999999999) $this->args['campaign']['campaign_send_date'] = time();
			
			$this->args['campaign']['campaign_send'] = (!empty($this->args['campaign']['campaign_send_date'])) ? 0 : 1 ;
		

			
			$insertVar = $insertValue = '';
			$i = 1;
			$stat =["flyer_id"	=> $this->args['campaign']['flyer_id']];
							
			foreach ($this->args['campaign'] as $key=>$var) { 
		
				($i==1) ? $t='' : $t=',';
				
				$insertVar.= $t.$key;
				$insertValue.= $t.':'.$key.':';
				$stat[$key] = $var;
			
				$i++;
			}
								
			$newCampaign = "INSERT INTO EmailCampaign ({$insertVar}, status) VALUES ({$insertValue}, 1)";	

		 	$this->modelsManager->executeQuery( $newCampaign, $stat );
		
			$output = $this->modelsManager->executeQuery("SELECT id FROM EmailCampaign WHERE flyer_id={$this->args['campaign']['flyer_id']} ORDER BY id DESC LIMIT 1");
		
			$plsql = "INSERT INTO Payments (campaign_id, payment, payment_transaction, payment_status) VALUES (:campaign_id:, :payment:, :payment_transaction:, :payment_status:)";
			$this->modelsManager->executeQuery($plsql,
							   [
									"campaign_id" => $output[0]->id, 
									"payment"  => $this->args['campaign']['campaign_price'], 
									"payment_transaction"  => $transactionId, 
									"payment_status" =>  1
							   ]
			   );
            $this->_errors = 0;
			
			/**Send email now 
			*/
			if ($this->args['campaign']['campaign_send']) {
				$sendCampaign = new SendingCampaign();
				$sendCampaign -> sendingСampaign($output[0]->id);
			}
						
		}	
	
		return json_encode(['errors' =>$this->_errors]);
	}

	/* 
	* @brief (Payment campaing via PayPal)
	* @return int
	*/
	protected function paymentCampaign ()
	{
		
		$user = $this->modelsManager->executeQuery("SELECT * FROM Users WHERE user_active = 1 AND id ={$this->args['access']['id']}");		
		
		if (count($user)) {
						
			$user = $user[0];
			
			$state = $this->modelsManager->executeQuery("SELECT code FROM State WHERE state = '{$user->state}'");	
			$state = (count($state)) ? $state[0]->code : '';
			
			$distribution_id = implode(",", $this->args['campaign']['campaign_list']);
			$price = $this->modelsManager->executeQuery("SELECT sum(price) as price FROM Distribution WHERE distribution_id IN({$distribution_id})");	
			$price = $this->args['campaign']['campaign_price'] = (count($price)) ? $price[0]->price : 0;
			
				if (!$price) {
					$this->_errors[] =  $this->_e('Invalid data in the distribution lists');
					return false;
				}
			
			$requestParams = array(
			   'IPADDRESS' => $_SERVER['REMOTE_ADDR'],
			   'PAYMENTACTION' => 'Sale'
			);

			$creditCardDetails = array(
			   'CREDITCARDTYPE' => $this->args['payments']['creditcardtype'],
			   'ACCT' => $this->args['payments']['card'],
			   'EXPDATE' => $this->args['payments']['expdate'],
			   'CVV2' => $this->args['payments']['cvv2']
			);

			$payerDetails = array(
			   'FIRSTNAME' => $user->user_first_name,
			   'LASTNAME' =>  $user->user_last_name,
			   'COUNTRYCODE' => 'US',
			   'STATE' => $state,
			   'CITY' => $user->company_city,
			   'STREET' => $user->company_adress1,
			   'STREET2' => $user->company_adress2,
			   'ZIP' => $this->args['payments']['zip_code'],
			   'EMAIL' =>$user->user_email
			);

			$orderParams = array(
			   'AMT' => $price,
			   'ITEMAMT' => $price,
			   'CURRENCYCODE' => 'USD'
			);

			$item = array(
			   'L_NAME0' => $this->args['campaign']['campaign_subject'],
			   'L_AMT0' => $price,
			);

			$paypal = new Paypal();
			$response = $paypal -> request('DoDirectPayment',
			   $requestParams + $creditCardDetails + $payerDetails + $orderParams + $item
			);

			if( is_array($response) && $response['ACK'] == 'Failure') { 
				
				foreach ($response as $key=>$mesError) {
					
					if (strripos($key, 'L_LONGMESSAGE')!==false){
						$this->_errors[] = $mesError;
					}
				}
			
			}

			if( is_array($response) && $response['ACK'] == 'Success') { 
				
			   $transactionId = $response['TRANSACTIONID'];		  
			   
			   return $transactionId;
			}
			
		}
		else{
			$this->_errors[] =  $this->_e('Пользователь заблокирован');
			return false;
		}
		
	}

}