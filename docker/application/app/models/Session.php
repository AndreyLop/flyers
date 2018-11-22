<?php

class Session extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(column="session_id", type="integer", length=11, nullable=false)
     */
    public $session_id;

    /**
     *
     * @var string
     * @Column(column="session_date", type="string", nullable=false)
     */
    public $session_date;

    /**
     *
     * @var string
     * @Column(column="session_ip", type="string", length=15, nullable=false)
     */
    public $session_ip;

    /**
     *
     * @var string
     * @Column(column="user_email", type="string", length=50, nullable=false)
     */
    public $user_email;

    /**
     *
     * @var string
     * @Column(column="session_deviсу", type="string", length=1000, nullable=false)
     */
    public $session_deviсу;

    /**
     *
     * @var string
     * @Column(column="session_result", type="string", length=1, nullable=false)
     */
    public $session_result;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSource("session");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'session';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Session[]|Session|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Session|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
