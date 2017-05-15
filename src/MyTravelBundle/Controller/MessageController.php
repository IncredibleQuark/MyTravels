<?php

namespace MyTravelBundle\Controller;

use MyTravelBundle\Entity\Message;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class MessageController extends Controller
{

    private function convertJson($dataToConvert)
    {
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());

        $serializer = new Serializer($normalizers, $encoders);
        $data = $serializer->serialize($dataToConvert, 'json');
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');

        return $response;
    }

    /**
     * @Route("/Message/new/send", name="message_new")
     * @Method({"POST"})
     */
    public function newMessageAction(Request $request)
    {

        $data = json_decode($request->getContent(), true);

        $message = new Message();

        $form = $this->createForm('MyTravelBundle\Form\MessageType', $message);

        //Adding current date
        $currDate = new \DateTime('now');
        $formatDate = $currDate->format('Y-m-d H:i:s');
        $message->setDate(new \DateTime($formatDate));

        $form->submit($data);

        if ($form->isSubmitted()) {

            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();

            return $this->convertJson($message);
        }

        $result = ['error'=>'Access denied!'];
        return $this->convertJson($result);
    }

    /**
     * @Route("/Message/showall")
     * @Template(":Messages:show_all.html.twig")
     */
    public function showAllMessagesAction()
    {
        $id = $this->getUser()->getId();
        $messages = $this->getDoctrine()->getRepository('MyTravelBundle:Message')->findByReceiverId($id);

        if (!$messages) {
            //TODO: Correct exception handling
            $result = "Messages not found";
            return ['result' => $result];
        }

        return ['messages' => $messages];
    }
}
