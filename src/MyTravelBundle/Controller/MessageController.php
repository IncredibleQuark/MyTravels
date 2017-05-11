<?php

namespace MyTravelBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MessageController extends Controller
{
    /**
     * @Route("/Message/new")
     * @Template(":Messages:send_message.html.twig")
     */
    public function showSendMessageFormAction()
    {

    }
}
