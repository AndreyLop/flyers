<?php
namespace App\Type\Controllers;

class Paypal  extends \ControllerBase
{
   /**
    * Последние сообщения об ошибках
    * @param array
    */
   protected $_errors = array();

   /**
    * @brief (Сформировываем запрос)
    * @param [string] $method Данные о вызываемом методе перевода
    * @param [array] $params Дополнительные параметры
    * @return array / boolean Response array / boolean false on failure
    */
   public function request($method,$params = array())
   {
      $this -> _errors = array();
      if( empty($method) ) { 
         $this -> _errors []= 'No transfer method specified';
         return false;
      }

      /* Параметры  запроса*/
      $requestParams = array(
         'METHOD' => $method,
         'VERSION' => $this->config->payments->paypal->version
      ) + array(
				  'USER' => $this->config->payments->paypal->username,
				  'PWD'  => $this->config->payments->paypal->password,
				  'SIGNATURE' => $this->config->payments->paypal->signature,
			   );

       /* Сформировываем данные для NVP*/
      $request = http_build_query($requestParams + $params);

       /* Настраиваем cURL*/
      $curlOptions = array (
         CURLOPT_URL => $this->config->payments->paypal->endPoint,
         CURLOPT_VERBOSE => 1,
         CURLOPT_SSL_VERIFYPEER => true,
         CURLOPT_SSL_VERIFYHOST => 2,
         CURLOPT_CAINFO => APP_PATH . '/config/paypal/cacert.pem', // Файл сертификата
         CURLOPT_RETURNTRANSFER => 1,
         CURLOPT_POST => 1,
         CURLOPT_POSTFIELDS => $request
      );

      $ch = curl_init();
      curl_setopt_array($ch,$curlOptions);

      $response = curl_exec($ch);

      /* Проверяем, нету ли ошибок в инициализации cURL */
      if (curl_errno($ch)) {
         $this -> _errors = curl_error($ch);
         curl_close($ch);
		 
         return false;
      } 
	  else  {
         curl_close($ch);
         $responseArray = array();
         parse_str($response,$responseArray);
		 
         return $responseArray;
      }
   }
}