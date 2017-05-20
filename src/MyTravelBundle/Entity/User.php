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
     * @ORM\OneToMany(targetEntity="MyTravelBundle\Entity\UserInfo", mappedBy="user")
     */
    private $userInfo;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }




    /**
     * Add userInfo
     *
     * @param \MyTravelBundle\Entity\UserInfo $userInfo
     * @return User
     */
    public function addUserInfo(\MyTravelBundle\Entity\UserInfo $userInfo)
    {
        $this->userInfo[] = $userInfo;

        return $this;
    }

    /**
     * Remove userInfo
     *
     * @param \MyTravelBundle\Entity\UserInfo $userInfo
     */
    public function removeUserInfo(\MyTravelBundle\Entity\UserInfo $userInfo)
    {
        $this->userInfo->removeElement($userInfo);
    }

    /**
     * Get userInfo
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUserInfo()
    {
        return $this->userInfo;
    }
}
