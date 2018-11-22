<?php //session_start();
/*
 * Modified: prepend directory path of current file, because of this file own different ENV under between Apache and command line.
 * NOTE: please remove this comment.
 */
defined('BASE_PATH') || define('BASE_PATH', getenv('BASE_PATH') ?: realpath(dirname(__FILE__) . '/../..'));
defined('APP_PATH') || define('APP_PATH', BASE_PATH . '/app');

return new \Phalcon\Config([
    'database' => [
        'adapter'     => 'Mysql',
        'host'        => 'mysql',
        'username'    => 'customsh_iq7',
        'password'    => '2u3at47s',
        'dbname'      => 'customsh_iq7db',
        'charset'     => 'utf8',
    ],
    'application' => [
        'appDir'         => APP_PATH . '/',
        'controllersDir' => APP_PATH . '/controllers/',
        'modelsDir'      => APP_PATH . '/models/',
        'migrationsDir'  => APP_PATH . '/migrations/',
        'viewsDir'       => APP_PATH . '/views/',
        'formsDir'       => APP_PATH . '/forms/',
        'libraryDir'     => APP_PATH . '/library/',
		'pluginsDir'     => APP_PATH . '/plugins/',
        'cacheDir'       => BASE_PATH . '/cache/',
        'baseUri'        => preg_replace('/public([\/\\\\])index.php$/', '', $_SERVER["PHP_SELF"]),
    ],
	'blockedTime'       => 1200,   //seconds
	'countAttempts'     => 100,    //quantity
    'forgotTime'        => 12,     // hour
	'siteProtocol'		=> 'https',
	'siteName'			=> 'www.iqflyer.com',
    'compressionPng'	=> 6,      //Compression level: from 0 (no compression) to 9.
    'compressionJpg'	=> 75,     //Compression level: from 0 (no compression) to 100.
    'compressionImageFlyer'	=> 75, //Compression level: from 0 (no compression) to 100.

    "mail" => [
		'language'      => 'en',
        'smtpOn'        => 0,					// 0 - send mail() 1 or smtp
        'smtpDebug'     => 0,					// Enable verbose debug output
        'smtpAuth'      => true, 				// Enable SMTP authentication
        'smtoSecure'    => 'tlc',  				// Enable TLS encryption, `ssl` also accepted. tlc or ssl
        'port'          => 465,  				// TCP port to connect to  587 or 465
        'host'          => 'smtp.gmail.com', 	// Specify main and backup SMTP servers
        'username'      => '',					// SMTP username
        'password'      => '',					// SMTP password
		'serviceEmail'	=> 'sales@iq7flyer.com.ua'
    ],	
	'emailTracing' =>[                          // app.mailgun.com
		'apiKey'		=>'key-d12ff94d32ecfeb8c0842be6d904172c',
		'domailName'	=>'mg.iq7marketing.com'
	],	
	'payload'	=> [
		'tokenLifetime'	=> 3600000,	//seconds
		'tokenKey'		=>	'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhZDQ0NzM5NTc2NDg1ZWMzMGQyMjg4NDJlNzNhY2UwYmMzNjdiYzQifQ'
	],
	'payments' 	=> [
		'paypal'	=> [                        // paypal.com
			'username'	=> 'zwo-facilitator_api1.online.ua',
			'password'	=> 'PT5JE5KFW82F7ENN',
			'signature'	=> 'A76bwlv2Z01mOclk1JxeCgsePvJ8Afw9yT7QGD5L4QJGNCWfGX7Qqx9F',
			'endPoint'	=> 'https://api-3t.sandbox.paypal.com/nvp',		//Sandbox  - https://api-3t.sandbox.paypal.com/nvp	 https://api-3t.paypal.com/nvp
			'version'	=> '74.0'
		],
		'development' => 1   //1 or 0; 1 - Disable payment
	],
	'wkhtmlto'	=> [
		  'binaryPdf'	=> '/wkhtmltox/bin/wkhtmltopdf',	  // wkhtmltopdf
		  'binaryImage'	=> '/wkhtmltox/bin/wkhtmltoimage'	 // wkhtmltoimg
	],

]);
