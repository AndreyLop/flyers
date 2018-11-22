<?php
use Phalcon\Mvc\Controller;


class ControllerBase extends Controller
{
   public $lang;

   public $option;
   
   public $properties = ['flyer_photo','flyer_photo_transform', 'property_info', 'extra_info', 'realtor_info', 'company_info'];
	
   public function initialize()
   {
		$this->addLang();
        $this->view->setTemplateAfter('main');
   }

    /**
     * @brief ()
     * @param [string] $uri
     * @return array
     */
    public function forward($uri)
    {
        $uriParts = explode('/', $uri);
        $params = array_slice($uriParts, 2);

        return $this->dispatcher->forward(
            [
                'controller' => $uriParts[0],
                'action'     => $uriParts[1],
                'params'     => $params
            ]
        );
    }

    /**
     * @brief (Looks for and connects localization files)
     */
    public function addLang()
    {
		$file= APP_PATH.'/messages/languages/en.ini';
	
		if (file_exists($file)) 
		{
			 $mes = parse_ini_file($file);			 
		}
		$this->lang = $mes;
    }

    /**
     * @brief (Return messages)
     * @param [string] $messages
     * @return string
     */
	public function _e($messages)
    {
		
		if (empty($this->lang)) $this->addLang();
		
		if (!isset ($this->lang[$messages]))  {
			$messages = 'Not found! '.$messages;
		}
		else{
			$messages = $this->lang[$messages];
		}
	
		return $messages;
    }
	
	/**
	 * @brief (Error logging in log)
	 * @param [int] $test  (0 - mail.log 1 - webhooks.log 2 -wkhtmlto.log)
	 * @param [int] $typ
	 */
	public function logging($test, $typ = 0)
	{
		$file = BASE_PATH.'/log/';

    	switch ($typ){
			case 0:
				$file.='mail.log';
				break;
			case 1:
				$file.='webhooks.log';
				break;		
			case 2:
				$file.='wkhtmlto.log';
				break;
			case 3:
				$file.='paypal.log';
				break;
			default:
				$file.='wkhtmlto.log';
		}

		$current = file_get_contents($file);
		ob_start();
		
		echo PHP_EOL.date("Y-m-d H:i:s").PHP_EOL;
		print_r ($test);
		
		$current .= ob_get_contents();
		ob_end_clean();
	
		file_put_contents($file, $current);
	}
	
	/**
	 * @brief (Returns the full path to img)
     * @param [string] $var
	 * @return string
	 */
	protected  function dirsImg ($var, $protocol = 0) 
	{
        if($protocol == 0) {			
			$protocol = '';
		} 
		elseif ($protocol == 2){
			$protocol = BASE_PATH."/public/";
		}
		
		else {			
			$protocol = $this->config->siteProtocol.'://'. $this->config->siteName;
		}

        $var = str_replace(' ', '-', $var);

        $img = $protocol."/upload/flyers_thumbnails_users/{$this->option['user_id']}/".$var;

		if (empty($var) || $var==null) $img = '';
		
		return $img;
	}

    /**
     * @brief (est and change file mode)
     */
    public function accessDirs()
    {

        $file = BASE_PATH.'/public/upload/flyers_thumbnails_users';
        $octal = true;

        if (!file_exists($file)) {
            mkdir($file, 0777);
        }

        $perms = fileperms($file);

        $cut = $octal ? 2 : 3;

        if (substr(decoct($perms), $cut) != 777) {

            $this->fsmodifyr($file);
        }
    }

    /**
     * @brief (Changes file mode).
     * @param [string] $obj
     */
    protected  function fsmodify($obj) {
        $chunks = explode('/', $obj);
        chmod($obj, 0777);
        //chown($obj, $chunks[2]);
        //chgrp($obj, $chunks[2]);
    }

    /**
     * @brief (Search files in dir)
     * @param [string] $dir
     * @return string
     */
    protected function fsmodifyr($dir)
    {
        if($objs = glob($dir."/*")) {
            foreach($objs as $obj) {
                $this->fsmodify($obj);
                if(is_dir($obj)) $this->fsmodifyr($obj);
            }
        }
        return $this->fsmodify($dir);
    }



}
