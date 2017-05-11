<?php
/**
 * Created by PhpStorm.
 * User: kruku
 * Date: 05.05.17
 * Time: 19:05
 */

namespace MyTravelBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class UserController
{
    /**
     * @Route("/")
     * @Template("base.html.twig")
     */
    public function testAction() {
        $user = 'luki';

        return ['user' => $user];
    }

    /**
     * @Route("/searchResult")
     * @Template(":search_result.html.twig")
     * @Method("POST")
     */
    public function searchUserAction(Request $request)
    {
        $word = $request->request->get('search');

        $users = $this->$this->container->get('doctrine')->getRepository('MyTravelBundle:User')->findByUsername($word);
        return ['users' => $users];
    }
}