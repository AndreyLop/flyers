<?php

class Users extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(column="id", type="integer", length=11, nullable=false)
     */
    public $id;

    /**
     *
     * @var string
     * @Column(column="user_first_name", type="string", length=100, nullable=true)
     */
    public $user_first_name;

    /**
     *
     * @var string
     * @Column(column="user_last_name", type="string", nullable=true)
     */
    public $user_last_name;

    /**
     *
     * @var string
     * @Column(column="user_pass", type="string", length=255, nullable=true)
     */
    public $user_pass;

    /**
     *
     * @var string
     * @Column(column="user_email", type="string", length=50, nullable=true)
     */
    public $user_email;

    /**
     *
     * @var string
     * @Column(column="user_phone", type="string", length=20, nullable=true)
     */
    public $user_phone;

    /**
     *
     * @var string
     * @Column(column="user_photo", type="string", length=255, nullable=true)
     */
    public $user_photo;

    /**
     *
     * @var string
     * @Column(column="user_registered", type="string", nullable=true)
     */
    public $user_registered;

    /**
     *
     * @var string
     * @Column(column="user_last_update", type="string", nullable=true)
     */
    public $user_last_update;

    /**
     *
     * @var integer
     * @Column(column="user_active", type="integer", length=1, nullable=true)
     */
    public $user_active;

    /**
     *
     * @var string
     * @Column(column="website", type="string", length=255, nullable=true)
     */
    public $website;

    /**
     *
     * @var string
     * @Column(column="slogan", type="string", length=500, nullable=true)
     */
    public $slogan;

    /**
     *
     * @var string
     * @Column(column="company_name", type="string", length=255, nullable=true)
     */
    public $company_name;

    /**
     *
     * @var string
     * @Column(column="company_logo", type="string", length=255, nullable=true)
     */
    public $company_logo;

    /**
     *
     * @var string
     * @Column(column="company_phone", type="string", length=30, nullable=true)
     */
    public $company_phone;

    /**
     *
     * @var string
     * @Column(column="company_fax", type="string", length=30, nullable=true)
     */
    public $company_fax;

    /**
     *
     * @var string
     * @Column(column="company_adress1", type="string", length=255, nullable=true)
     */
    public $company_adress1;

    /**
     *
     * @var string
     * @Column(column="company_adress2", type="string", length=255, nullable=true)
     */
    public $company_adress2;

    /**
     *
     * @var string
     * @Column(column="company_city", type="string", length=255, nullable=true)
     */
    public $company_city;

    /**
     *
     * @var string
     * @Column(column="company_code", type="string", length=50, nullable=true)
     */
    public $company_code;

    /**
     *
     * @var string
     * @Column(column="state", type="string", length=255, nullable=true)
     */
    public $state;

    /**
     *
     * @var string
     * @Column(column="token", type="string", nullable=true)
     */
    public $token;
	
	public $user_typ;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
   
        $this->setSource("users");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'users';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Users[]|Users|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Users|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
