<?php

namespace MyTravelBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FriendController extends Controller
{

    /**
     * @Route("/friends")
     * @Template(":Friends:show_all_friends.html.twig")
     */
    public function showAllUsersAction()
    {
        $friends = $this->getDoctrine()->getRepository('MyTravelBundle:User')->findAll();
        return ['friends' => $friends];
    }

    /**
     * @Route("/friends/showFriend/{id}")
     * @Template(":Friends:show_friend.html.twig")
     */
    public function showUserById($id)
    {
        $friend = $this->getDoctrine()->getRepository('MyTravelBundle:User')->find($id);

        return ['friend' => $friend];
    }
}
