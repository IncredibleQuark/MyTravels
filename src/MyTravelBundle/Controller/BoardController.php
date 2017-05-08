<?php

namespace MyTravelBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BoardController extends Controller
{
    /**
     * @Route("/Board")
     */
    public function ShowBoardAction()
    {
        return $this->render(':Board:show_board.html.twig', array(
            // ...
        ));
    }
}
