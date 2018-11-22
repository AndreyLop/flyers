<?php

class Distribution extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(column="distribution_id", type="integer", length=11, nullable=false)
     */
    public $distribution_id;

    /**
     *
     * @var integer
     * @Column(column="region_id", type="integer", length=11, nullable=false)
     */
    public $region_id;

    /**
     *
     * @var string
     * @Column(column="distribution", type="string", length=255, nullable=true)
     */
    public $distribution;

    /**
     *
     * @var string
     * @Column(column="price", type="string", length=10, nullable=true)
     */
    public $price;
	
	public $email;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSource("distribution");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'distribution';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Distribution[]|Distribution|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Distribution|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
