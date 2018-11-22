<?php

class Flyers extends \Phalcon\Mvc\Model
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
     * @var integer
     * @Column(column="user_id", type="integer", length=11, nullable=false)
     */
    public $user_id;

    /**
     *
     * @var integer
     * @Column(column="template_id", type="integer", length=11, nullable=false)
     */
    public $template_id;

    /**
     *
     * @var string
     * @Column(column="flyer_name", type="string", length=255, nullable=true)
     */
    public $flyer_name;

    /**
     *
     * @var string
     * @Column(column="flyer_create", type="string", nullable=true)
     */
    public $flyer_create;

    /**
     *
     * @var string
     * @Column(column="flyer_update", type="string", nullable=true)
     */
    public $flyer_update;

	public $flyer_preview;
    /**
     *
     * @var string
     * @Column(column="flyer_photo", type="string", nullable=true)
     */
    public $flyer_photo;

    /**
     *
     * @var string
     * @Column(column="flyer_photo_transform", type="string", nullable=true)
     */
    public $flyer_photo_transform;

    /**
     *
     * @var integer
     * @Column(column="flyer_status", type="integer", length=4, nullable=false)
     */
    public $flyer_status;

    /**
     *
     * @var string
     * @Column(column="property_info", type="string", nullable=true)
     */
    public $property_info;

    /**
     *
     * @var string
     * @Column(column="extra_info", type="string", nullable=true)
     */
    public $extra_info;

    /**
     *
     * @var string
     * @Column(column="realtor_info", type="string", nullable=true)
     */
    public $realtor_info;

    /**
     *
     * @var string
     * @Column(column="company_info", type="string", nullable=true)
     */
    public $company_info;
	

    public $flyer_error;
	
	public $realtor_error;
	  
	public $company_error;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSource("flyers");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'flyers';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Flyers[]|Flyers|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Flyers|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
