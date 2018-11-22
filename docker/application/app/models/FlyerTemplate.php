<?php

class FlyerTemplate extends \Phalcon\Mvc\Model
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
     * @Column(column="template_name", type="string", length=250, nullable=true)
     */
    public $template_name;

    /**
     *
     * @var string
     * @Column(column="template_photo", type="string", length=250, nullable=true)
     */
    public $template_photo;

    /**
     *
     * @var string
     * @Column(column="template_properties", type="string", nullable=true)
     */
    public $template_properties;

    /**
     *
     * @var integer
     * @Column(column="template_active", type="integer", length=1, nullable=false)
     */
    public $template_active;

	public $template_photo_prop;
	
    /**
     * Initialize method for model.
     */
    public function initialize()
    {
 
        $this->setSource("flyerTemplate");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'flyerTemplate';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return FlyerTemplate[]|FlyerTemplate|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return FlyerTemplate|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
