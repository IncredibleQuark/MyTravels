<?php

namespace MyTravelBundle\Controller;

use MyTravelBundle\Entity\Travel;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class TravelController extends Controller
{
    /**
     * Creates a new travel entity.
     *
     * @Route("/Travel/new", name="travel_new")
     * @Method({"POST"})
     */
    public function newAction(Request $request)
    {
        //Pobranie danych przesłanych JSON-em
        $data = json_decode($request->getContent(), true);

        $travel = new Travel();
        $form = $this->createForm('MyTravelBundle\Form\TravelType', $travel);
        $form->submit($data);

        if ($form->isSubmitted()) {

            $em = $this->getDoctrine()->getManager();
            $em->persist($travel);
            $em->flush();

            return $this->convertJson($travel);
        }

        $result = ['error'=>'Brak dostępu'];
        return $this->convertJson($result);
    }

    private function convertJson($dataToConvert)
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());

        $serializer = new Serializer($normalizers, $encoders);
        $data = $serializer->serialize($dataToConvert, 'json');
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
//        $response->headers->set('Access-Control-Allow-Origin', '*');
//        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');

        return $response;
    }
}
