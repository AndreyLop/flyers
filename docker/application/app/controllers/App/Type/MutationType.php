<?php

namespace App\Type;

use App\DB;
use App\Types;
use App\Ql;
use GraphQL\Type\Definition\ObjectType;
use App\Type\Controllers\Authorization;
use App\Type\Controllers\Registration;
use App\Type\Controllers\ForgotPassword;
use App\Type\Controllers\Flyer;
use App\Type\Controllers\Profile;
use App\Type\Controllers\Campaign;
/**
 * Class MutationType
 *
 * Root Mutation Type for GraphQL
 *
 * @package App\Type
 */
 
class MutationType extends ObjectType
{
    public function __construct()
    {
   		   
	    $config = [
            'fields' => function() {
                return [
				
					'authorization'=> [
                        'type' => Types::form(),
                        'description' => 'Авторизация пользователя',
                        'args' => [
                            'password' 	=> Types::nonNull(Types::string()),
                            'email' 	=> Types::nonNull(Types::string())
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$authorization = new Authorization();
						
                            return (object)$authorization ->login($args);
                        }
                    ],
					
					'quickAuthorization'=> [
                        'type' => Types::form(),
                        'description' => 'Быстрая авторизация пользователя',
                        'args' => [
                            'email' => Types::nonNull(Types::string()),
							'firstName'  => [ 'type' => Types::string(),    'defaultValue' => '' ],
							'lastName' 	 => [ 'type' => Types::string(),    'defaultValue' => '' ],
							"state"		 => [ 'type' => Types::string(),    'defaultValue' => '' ]
							
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$authorization = new Authorization();
						
                            return (object)$authorization ->quickLogin($args, 1);
                        }
                    ],
					
					'loginByToken'=> [
                        'type' => Types::form(),
                        'description' => 'Авторизация пользователя по токену',
                        'args' => [
							'accessToken' => Types::string()
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$authorization = new Authorization();
						
                             return (object)$authorization ->loginByToken($args);
                        }
                    ],
					
					'newAccount'=> [
                        'type' => Types::form(),
                        'description' => 'Регистрация пользователя',
                        'args' => [
							'email' 	=>	[ 'type' => Types::string(),     'defaultValue' => '' ],
							'firstName'	=>	[ 'type' => Types::string(),     'defaultValue' => '' ],
							'lastName'	=>	[ 'type' => Types::string(),     'defaultValue' => '' ],
							'state'		=>	[ 'type' => Types::string(),     'defaultValue' => 'Not selected' ],
							'password'	=>	[ 'type' => Types::string(),     'defaultValue' => '' ],
							'confirmPassword'=>	[ 'type' => Types::string(), 'defaultValue' => '' ],
                        ],
					 
                        'resolve' => function ($root, $args) {
							
						$newUser = new Registration();
						$newUser->args = $args;
						
                           $output = $newUser ->registrationUser();
						  
						   return $output;
                        }
                    ],
					'forgotPassword1'=> [
                        'type' => Types::form(),
                        'description' => 'Восстановление пароля ф.1',
                        'args' => [
							'email'			=>	Types::nonNull(Types::string())
                        ],
					 
                        'resolve' => function ($root, $args) {
					
							$verificationUser = new ForgotPassword();				
							$verificationUser->args= $args;
							
							$output = $verificationUser ->verificationUser();
							
							return $output;
                        }
                    ],
					
					'forgotPassword2'=> [
                        'type' => Types::form(),
                        'description' => 'Восстановление пароля ф.2',
                        'args' => [
							'key'				=>	Types::nonNull(Types::string()),
							'password'			=>	[ 'type' => Types::string(),     'defaultValue' => '' ],
							'confirmPassword'	=>	[ 'type' => Types::string(),	 'defaultValue' => '' ]
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$verificationUser = new ForgotPassword();		
							$verificationUser->args= $args;
							
							$output = $verificationUser ->verificationNewPassword();	
						
						   return $output;
                        }
                    ],
					/*
					 * Change Password (on page profile)
					*/
					'changePassword'=> [
                        'type' => Types::form(),
                        'description' => 'Изменение пароля в профиле пользователя',
                        'args' => [
							'curentPassword'	=>	[ 'type' => Types::nonNull(Types::string()),     'defaultValue' => ''],
							'password'			=>	[ 'type' => Types::nonNull(Types::string()),     'defaultValue' => ''],
							'confirmPassword'	=>	[ 'type' => Types::nonNull(Types::string()),     'defaultValue' => ''],
							'access' => Types::access(),
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$verificationUser = new ForgotPassword();		
							$verificationUser->args= $args;
							
							$output = $verificationUser ->changePassword();	
		
						   return $output;
                        }
                    ],	
					
					'saveFlyer'=> [
                        'type' => Types::int(),
                        'description' => 'Сохранения флаера',
                        'args' => [
							'id' 		  =>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id пользователя' ],
							'accessToken' =>  Types::string(),
							'flyer_id'    =>  [ 'type' => Types::nonNull(Types::int()), 'description' => '' ],
							'typ' 		  =>  [ 'type' => Types::int(), 'description' => 'Step 1-7' ],
							'flyer_name' 				=>  [ 'type' => Types::string(), 'description' => 'Название шаблона step 6','defaultValue' =>'New Flyer -'.date("F j, Y, g:i a") ],
							'flyer_photo'				=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'step 1','defaultValue' => null ],
							'flyer_photo_key'			=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'step 1','defaultValue' => null ],
							'flyer_photo_transform'		=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'step 1','defaultValue' => null ],
							'flyer_photo_transform_key'	=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'step 1','defaultValue' => null ],
							'property_info' 			=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Данные step 2','defaultValue' => null ],
							'property_info_key' 		=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Ключи step 2','defaultValue' => null ],
							'extra_info' 				=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Данные step 3','defaultValue' => null ],
							'extra_info_key' 			=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Ключи step 3','defaultValue' => null ],
							'realtor_info' 				=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Данные step 4','defaultValue' => null ],
							'realtor_info_key' 			=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Ключи step 4' ,'defaultValue' => null],
							'company_info' 				=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Данные step 5','defaultValue' => null ],
							'company_info_key'  		=>  [ 'type' => Types::listOf(Types::string()), 'description' => 'Ключи step 5','defaultValue' => null ],
							'company_error_photo'  		=>  [ 'type' => Types::int(), 'description' => 'Ошибка изображения step 5','defaultValue' => 0 ],
							'realtor_error_photo'  		=>  [ 'type' => Types::int(), 'description' => 'Ошибка изображения step 4','defaultValue' => 0 ],
							'flyer_error_photo'  		=>  [ 'type' => Types::listOf(Types::int()), 'description' => 'Ошибка изображения step 1','defaultValue' => null ],
                        ],
					 
                        'resolve' => function ($root, $args) {



							$flyer = new Flyer();
							$flyer->args = $args;
					
							$output = $flyer ->saveFlyer();
			
		
						   return $output;
                        }
                    ],
					
					'newFlyer'=> [
                        'type' => Types::int(),
                        'description' => 'Создание флаера',
                        'args' => [
							'id' 		  =>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id пользователя' ],
							'accessToken' =>  Types::string(),
							'template_id' =>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id шаблона' ],
							'flyer_name'  =>  [ 'type' => Types::string(), 'description' => 'Название шаблона step 6','defaultValue' =>'New Flyer -'.date("F j, Y, g:i a") ],
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$flyer = new Flyer();
							$flyer->args = $args;
							
							$output = $flyer ->newFlyer();
							
						   return $output;
                        }
                    ],
					
					'copyFlyer'=> [
                        'type' => Types::int(),
                        'description' => 'Копирует данные из сохраненного флаера',
                        'args' => [
							'access' 	=> Types::access(),							
							'flyer_id' =>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id текущего флаера' ],
							'copy_flyer_id' =>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id флаера для копирования' ],

                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$flyer = new Flyer();
							$flyer->args = $args;
							
							$output = $flyer ->copyFlyer();

						   return $output;
                        }
                    ],
					
					'deleteFlyer'=> [
                        'type' => Types::int(),
                        'description' => 'Удалить флаер',
                        'args' => [
							'access' 	=> Types::access(),							
							'flyer_id' =>  [ 'type' => Types::nonNull(Types::int()), 'description' => 'id текущего флаера' ],
                        ],
					 
                        'resolve' => function ($root, $args) {
							
							$flyer = new Flyer();
							$flyer->args = $args;
							
							$output = $flyer ->deleteFlyer();

						   return $output;
                        }
                    ],					

					'saveProfile'=> [
                        'type' => Types::int(),
                        'description' => 'Сохранения профиль пользователя',
                        'args' => [
							'access' 	=> Types::access(),
				    		'profile' 	=> Types::updateProfile()
							
                        ],
					 
                        'resolve' => function ($root, $args) {

							$profile = new Profile();
							$profile->args = $args;
						
							$output = $profile ->saveProfile();
						//	$output[] =1;
						   return $output;
                        }
                    ],		

					'placeOrder'=> [
                        'type' => Types::String(),
                        'description' => 'Оплатить заказ',
                        'args' => [
							'access' 	=> Types::access(),
				    		'campaign' 	=> Types::updateCampaign(),
							'payments'	=> Types::payments()
                        ],
					 
                        'resolve' => function ($root, $args) {

							$newCampaign = new Campaign();
							$newCampaign->args = $args;
							
							$output = $newCampaign->newCampaign();
			
						   return $output;
                        }
                    ],
                ];
            }
        ];

		
        parent::__construct($config);
    }
	
	protected function sql() 
	{
		return new  Ql();
	}
	
}
