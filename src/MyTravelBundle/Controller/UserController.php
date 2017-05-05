<?php
/**
 * Created by PhpStorm.
 * User: kruku
 * Date: 05.05.17
 * Time: 19:05
 */

namespace MyTravelBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

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
}