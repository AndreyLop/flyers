<?php

class EmailStatistic extends \Phalcon\Mvc\Model
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
     * @Column(column="id_campaign", type="integer", length=11, nullable=true)
     */
    public $id_campaign;

    /**
     *
     * @var string
     * @Column(column="recipient", type="string", length=200, nullable=true)
     */
    public $recipient;

    /**
     *
     * @var string
     * @Column(column="timestamp", type="string", length=610, nullable=true)
     */
    public $timestamp;

    /**
     *
     * @var string
     * @Column(column="event", type="string", length=10, nullable=true)
     */
    public $event;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSource("emailStatistic");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'emailStatistic';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return EmailStatistic[]|EmailStatistic|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return EmailStatistic|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
