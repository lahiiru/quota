<?php
/**
 * Created by PhpStorm.
 * User: Lahiru
 * Date: 26/12/2015
 * Time: 5:11 PM
 */

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity
 * @ORM\Table(name="slave_payment")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\SlavePaymentRepository")
 */
class slave_payment
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @ORM\ManyToOne(targetEntity="slave_user", inversedBy="slave_payments")
     * @ORM\JoinColumn(name="slave_user", referencedColumnName="sid", onDelete="CASCADE")
     */
    protected $slave_user;
    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;
    /**
     * @ORM\Column(type="integer")
     */
    protected $fee;

    /**
     * slave_payment constructor.
     * @param $slave_user
     * @param $date
     * @param $fee
     */
    public function __construct()
    {
        $this->date = new \DateTime('now');
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return slave_payment
     */
    private function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }


    /**
     * Get fee
     *
     * @return integer
     */
    public function getFee()
    {
        return $this->fee;
    }

    /**
     * @return mixed
     */
    public function getSlaveUser()
    {
        return $this->slave_user;
    }

    /**
     * @param mixed $slave_user
     */
    public function setSlaveUser($slave_user)
    {
        $this->slave_user = $slave_user;
    }

    /**
     * @param mixed $fee
     */
    public function setFee($fee)
    {
        $this->fee = $fee;
    }

}
