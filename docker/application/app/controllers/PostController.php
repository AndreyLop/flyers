<?php session_start();
use Phalcon\Mvc\View;
use Phalcon\Mvc\Controller;

use App\Types;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL;
use GraphQL\Validator\DocumentValidator;
use GraphQL\Validator\Rules\QueryComplexity;
use GraphQL\Validator\Rules\QueryDepth;

use App\Type\Controllers\Tokens;
use App\Ql;

class PostController extends ControllerBase
{

    public function initialize()
    {
        $this->view->setRenderLevel(
            View::LEVEL_NO_RENDER
        );
    	
		$this->pl;
		
        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    }

	/**
	 *  @brief (Receiving a grafQL request)
	 *  @return (json)
	 */
	public function grafqlAction()
    {
		$checkToken= new Tokens();
		
		try {

		$rawInput = file_get_contents('php://input');

        //$this->logging($rawInput,2);
		
		
		$input = json_decode($rawInput, true);
		$query = $input['query'];
		$variables = isset($input['variables']) ? $input['variables'] : null;
		$checResult = $checkToken->checkToken($query, $variables);
		$result =[];

			if ($checResult['result']>0){
			

				   $schema = new Schema([ 
						'query' => Types::query(),
						'mutation' => Types::mutation()
					]);	
		 
				//	DocumentValidator::addRule( new QueryComplexity(100));
				//	DocumentValidator::addRule( new QueryDepth(10));
					
					$output =  GraphQL::executeQuery($schema, $query, null, null,  $variables);
					$result = $output->toArray();
			}
			
		} catch (\Exception $e) {
				$result = [
					'error' => [
						'message' => $e->getMessage()
					]
				]; 
		}

		$result['access']=$checResult;

		echo json_encode($result);
    }
		
	/**
	 *  @brief (Loading img)
	 *  @return (json)
	 */	
	public function uploadfileAction()
    {
		
        if ($this->request->hasFiles()) {

            $this-> accessDirs();

            if (!$this->request->getPost('userId'))	{

				echo json_encode(['result'=>0, 'error'=>'userId not found']);
				exit;
			}

			$files = $this->request->getUploadedFiles();
			$user = $this->request->getPost('userId');

			if (!file_exists('upload/flyers_thumbnails_users/'.$user)) {

				mkdir("upload/flyers_thumbnails_users/".$user, 0777);
				mkdir("upload/flyers_thumbnails_users/".$user."/template", 0777);
                copy("img/temp.png", "upload/flyers_thumbnails_users/".$user."/template/temp.png");
			}


            foreach ($files as $key=> $file) {

                if ($file->getSize()>16385000) {

                    echo json_encode(['result'=>0,'error'=>'File size is too large! Maximum download size 16Mb.']);
                    exit;
                }
                else {

                    if(!empty($file->getName())) {

                        $newfilename = str_replace(' ', '-', $file->getName());

                        $file->moveTo("upload/flyers_thumbnails_users/{$user}/{$newfilename}");
                    }
                }
            }
        }
		
		echo json_encode(['result'=>1]);
	}
	
	/**
	 *  @brief (Webhooks - фіксує відправлення розсилки)
	 */	
	public function deliveredAction()
    {
		$this->logging($this->request->getPost(),1);
	}
	
	/**
	 *  @brief (Webhooks - click from the sent mailing)
	 */
	public function clicksAction()
    {
		$this ->addCount('clicks');
	}
	
	/**
	 *  @brief (Webhooks - opening a letter from the mailing)
	 */
	public function opensAction()
    {
		$this ->addCount('opened');
	}
	
	/**
	 *  @brief (Writes an event in bd)
	 *  @param [string] $event 
	 */
	private  function addCount($event)
	{
		$post =  $this->request->getPost();
						
		if (isset($post['id-campaign'])) {
			
			$this->logging($post ,1);
			
			$result = $this->modelsManager->executeQuery("SELECT {$event} From EmailCampaign  WHERE id=:id:", ['id' => $post['id-campaign']] );	
			
			$Distribution = $this->modelsManager->executeQuery("SELECT id From EmailStatistic  WHERE recipient=:email: AND id_campaign=:id_campaign: AND event=:event:", 
								['email' => $post['recipient'], 'id_campaign'=>$post['id-campaign'], 'event'=>$event]);	
			
			if (count($result) && !count($Distribution)) {
				
				$EmailStatistic = new EmailStatistic;
				$EmailStatistic->id_campaign = $post['id-campaign'];
				$EmailStatistic->recipient = $post['recipient'];
				$EmailStatistic->timestamp = $post['timestamp'];
				$EmailStatistic->event = $event;
				$EmailStatistic->save();
				
				
				$count = $result[0]->{$event}+1;
				$this->modelsManager->executeQuery("UPDATE EmailCampaign SET {$event}={$count} WHERE id=:id:", ['id' => $post['id-campaign']]);					
			}
		}	
	}
 
}