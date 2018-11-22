<?php

namespace App;

use App\Type\QueryType;
use App\Type\MutationType;
use App\Type\UserType;
use App\Type\LoginType;
use App\Type\FormType;
use App\Type\FlyerType;
use App\Type\CampaignType;
use App\Type\DashboardType;
use App\Type\FlyerTemplateType;

use App\Type\InputUserType;
use App\Type\AccessType;
use App\Type\UpdateProfileType;
use App\Type\UpdateCampaignType;
use App\Type\DistributionType;
use App\Type\PaymentsType;

//use App\Type\Scalar\EmailType;
use GraphQL\Type\Definition\Type;
use App\Ql;

/**
 * Class Types
 *
 * Реестр и фабрика типов для GraphQL
 *
 * @package App
 */
 
class Types
{
    /**
     * @var QueryType
     */
    private static $query;
	
   /**
     * @var MutationType
     */
    private static $mutation;

    /**
     * @var UserType
     */
    private static $user;
	
	/**
     * @var FormType
     */
	private static $form;
	
    /**
     * @var LoginType
     */
    private static $login;
    /**
     * @var InputUserType
     */
    private static $inputUser;	
    /**
     * @var accessType
     */
    private static $access;		
	
    /**
     * @return QueryType
     */
    public static function query()
    {
        return self::$query ?: (self::$query = new QueryType());
    }
	
	 /**
     * @return MutationType
     */
    public static function mutation()
    {
        return self::$mutation ?: (self::$mutation = new MutationType());
    }

    /**
     * @return UserType
     */
    public static function user()
    {
        return self::$user ?: (self::$user = new UserType());
    }
	
	/**
     * @return  FormType
     */
    public static function form()
    {
        return self::$form ?: (self::$form = new FormType());
    }
	/**
     * @return LoginType
     */
    public static function login()
    {
        return self::$login ?: (self::$login = new LoginType());
    }
		
    /**
     * @return InputUserType
     */
    public static function inputUser()
    {
        return self::$inputUser ?: (self::$inputUser = new InputUserType());
    }
	
	    /**
     * @return accessType
     */
    public static function access()
    {
        return self::$access ?: (self::$access = new AccessType());
    }
	
    /**
     * @return \GraphQL\Type\Definition\IntType
     */
    public static function int()
    {
        return Type::int();
    }

    /**
     * @return \GraphQL\Type\Definition\StringType
     */
    public static function string()
    {
        return Type::string();
    }
	
	
    // Let's add internal types as well for consistent experience

    public static function boolean()
    {
        return Type::boolean();
    } 


    /**
     * @param \GraphQL\Type\Definition\Type $type
     * @return \GraphQL\Type\Definition\ListOfType
     */
    public static function listOf($type)
    {
        return Type::listOf($type);
    }
	
    /**
     * @param \GraphQL\Type\Definition\Type $type
     * @return \GraphQL\Type\Definition\NonNull
     */
    public static function nonNull($type)
    {
        return Type::nonNull($type);
    }

	/**
     * @var FlyerType
     */
	private static $flyer;
	
	/**
     * @return  FormType
     */
    public static function flyer()
    {
       
	   return self::$flyer ?: (self::$flyer = new FlyerType());
    }
	
  	/**
     * @var CampaignType
     */
	private static $campaign;
	
	/**
     * @return  CampaignType
     */
    public static function campaign()
    {
        return self::$campaign ?: (self::$campaign = new CampaignType());
    }
	

//-------------------------////	
	/**
     * @var DashboardType
    */
	private static $dashboard; 
	
	/**
     * @return  DashboardType
     */
    public static function dashboard()
    {
        return self::$dashboard ?: (self::$dashboard = new DashboardType());
    }	
//-------------------------////	
		/**
     * @var FlyerTemplateType
    */
	private static $flyerTemplate; 
	
	/**
     * @return  FlyerTemplateType
     */
    public static function flyerTemplate()
    {
        return self::$flyerTemplate ?: (self::$flyerTemplate = new FlyerTemplateType());
    }	 

	private static $updateProfile;
	  /**
     * @return UpdateProfileType
     */
    public static function updateProfile()
    {
        return self::$updateProfile ?: (self::$updateProfile = new UpdateProfileType());
    }
	

	private static $updateCampaign;
	  /**
     * @return UpdateCampaignType
     */
    public static function updateCampaign()
    {
        return self::$updateCampaign ?: (self::$updateCampaign = new UpdateCampaignType());
    }
	
	
	private static $distribution;
	
	  /**
     * @return DistributionType
     */
    public static function distribution()
    {
        return self::$distribution ?: (self::$distribution = new DistributionType());
    }	
	
	private static $payments;
	
	  /**
     * @return PaymentsType
     */
    public static function payments()
    {
        return self::$payments ?: (self::$payments = new PaymentsType());
    }	
	
		
}