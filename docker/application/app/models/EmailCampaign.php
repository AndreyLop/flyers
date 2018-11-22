<?php

class EmailCampaign extends \Phalcon\Mvc\Model
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
     * @Column(column="flyer_id", type="integer", length=11, nullable=false)
     */
    public $flyer_id;

    /**
     *
     * @var string
     * @Column(column="campaign_create", type="string", nullable=false)
     */
    public $campaign_create;

    /**
     *
     * @var string
     * @Column(column="campaign_name", type="string", length=255, nullable=true)
     */
    public $campaign_name;

    /**
     *
     * @var string
     * @Column(column="campaign_subject", type="string", length=255, nullable=true)
     */
    public $campaign_subject;

    /**
     *
     * @var integer
     * @Column(column="campaign_send", type="integer", length=1, nullable=false)
     */
    public $campaign_send;

    /**
     *
     * @var string
     * @Column(column="campaign_send_date", type="string", nullable=true)
     */
    public $campaign_send_date;

    /**
     *
     * @var string
     * @Column(column="campaign_price", type="string", length=10, nullable=false)
     */
    public $campaign_price;

    /**
     *
     * @var string
     * @Column(column="campaign_list", type="string", nullable=true)
     */
    public $campaign_list;

	public $sent_date;
    /**
     *
     * @var integer
     * @Column(column="status", type="integer", length=1, nullable=false)
     */
    public $status;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSource("emailCampaign");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'emailCampaign';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return EmailCampaign[]|EmailCampaign|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return EmailCampaign|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
