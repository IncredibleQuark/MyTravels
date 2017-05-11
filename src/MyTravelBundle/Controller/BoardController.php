<?php

namespace MyTravelBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BoardController extends Controller
{


    /**
     * @Route("/Board")
     * @Template(":Board:show_board.html.twig")
     */
    public function ShowTravelsAction()
    {

        $travels = $this->getDoctrine()->getRepository('MyTravelBundle:Travel')->sortById();

        if (!$travels) {
            return $this->redirectToRoute('mytravel_map_showmap');
        }

        return ['travels' => $travels];
    }
}
