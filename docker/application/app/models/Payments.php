<?php

class Payments extends \Phalcon\Mvc\Model
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
     * @Column(column="payment_method_id", type="integer", length=11, nullable=false)
     */
    public $payment_method_id;

    /**
     *
     * @var integer
     * @Column(column="campaign_id", type="integer", length=11, nullable=false)
     */
    public $campaign_id;

    /**
     *
     * @var string
     * @Column(column="payment_date", type="string", nullable=false)
     */
    public $payment_date;

    /**
     *
     * @var string
     * @Column(column="payment", type="string", length=10, nullable=true)
     */
    public $payment;

    /**
     *
     * @var string
     * @Column(column="payment_transaction", type="string", length=200, nullable=true)
     */
    public $payment_transaction;

    /**
     *
     * @var integer
     * @Column(column="payment_status", type="integer", length=1, nullable=false)
     */
    public $payment_status;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
 
        $this->setSource("payments");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'payments';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Payments[]|Payments|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Payments|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
