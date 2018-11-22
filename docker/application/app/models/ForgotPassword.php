<?php

class ForgotPassword extends \Phalcon\Mvc\Model
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
     * @var string
     * @Column(column="data_create", type="string", nullable=false)
     */
    public $data_create;

    /**
     *
     * @var string
     * @Column(column="data_end", type="string", nullable=false)
     */
    public $data_end;

    /**
     *
     * @var string
     * @Column(column="temp_key", type="string", length=200, nullable=true)
     */
    public $temp_key;

    /**
     *
     * @var string
     * @Column(column="active", type="string", length=1, nullable=false)
     */
    public $active;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
          $this->setSource("forgotPassword");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'forgotPassword';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return ForgotPassword[]|ForgotPassword|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return ForgotPassword|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
