<?php

namespace MyTravelBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapController extends Controller
{
    /**
     * @Route("/Map")
     */
    public function ShowMapAction()
    {
        return $this->render(':Map:show_map.html.twig', array(
            // ...
        ));
    }
}
