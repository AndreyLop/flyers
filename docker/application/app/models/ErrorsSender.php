<?php

class ErrorsSender extends \Phalcon\Mvc\Model
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
     * @Column(column="date", type="string", nullable=false)
     */
    public $date;

    /**
     *
     * @var integer
     * @Column(column="campaign_id", type="integer", length=11, nullable=false)
     */
    public $campaign_id;

    /**
     *
     * @var string
     * @Column(column="error", type="string", length=255, nullable=true)
     */
    public $error;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
   
        $this->setSource("errorsSender");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'errorsSender';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return ErrorsSender[]|ErrorsSender|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return ErrorsSender|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
