<?php


namespace MyTravelBundle\Entity;

// FOS\UserBundle\Model\User  (FOR FOSUSERBUNDLE VERSION 2.0. HERE 1.3 INSTALLED!)
use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="MyTravelBundle\Entity\Travel", mappedBy="user")
     */
    private $travels;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }



    /**
     * Add travels
     *
     * @param \MyTravelBundle\Entity\Travel $travels
     * @return User
     */
    public function addTravel(\MyTravelBundle\Entity\Travel $travels)
    {
        $this->travels[] = $travels;

        return $this;
    }

    /**
     * Remove travels
     *
     * @param \MyTravelBundle\Entity\Travel $travels
     */
    public function removeTravel(\MyTravelBundle\Entity\Travel $travels)
    {
        $this->travels->removeElement($travels);
    }

    /**
     * Get travels
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTravels()
    {
        return $this->travels;
    }
}
