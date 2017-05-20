<?php

namespace MyTravelBundle\Controller;

use MyTravelBundle\Entity\UserInfo;
use MyTravelBundle\Form\UserInfoType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UserInfoController extends Controller
{
    /**
     * @Route("profile/edit/newInfo/{id}")
     * @Template("FOSUserBundle:Profile:edit_info.html.twig")
     * @Method("GET")
     */
    public function showNewInfoFormAction($id)
    {
        $info = new UserInfo();

        $form = $this->createForm(UserInfoType::class, $info,
            ['action' => $this->generateUrl('mytravel_userinfo_createnewinfo')]);

        return ['form' => $form->createView()];
    }


    /**
     * @Route("/profile/edit/NewInfo/create/new")
     * @Template("@FOSUser/Profile/edit_info.html.twig")
     * @Method("POST")
     */
    public function createNewInfoAction (Request $request)
    {
        $info = new UserInfo();

        $form = $this->createForm(UserInfoType::class, $info);

//        $id = $this->getUser()->getId();
//        $user = $this->getDoctrine()->getRepository('MyTravelBundle:User')->find($id);



      //  $form->add('user', $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $em->persist($info);
            $em->flush();

            $id= $info->getId();

            return $this->redirectToRoute('mytravel_userinfo_shownewinfoform', array('id' => $id));
        }

        return ['form' => $form->createView()];
    }


//    /**
//     * @Route("/profile/editInfo/{id}")
//     * @Method("GET")
//     */
//    public function showEditFormAction($id)
//    {
//        $contact = $this->getDoctrine()->getRepository('MyTravelBundle:UserInfo')->find($id);
//
//        if (!$contact) {
//
//            $this->redirectToRoute('mytravel_userinfo_shownewinfoform', array('id' => $id));
//
//        }
//
//        $form = $this->createForm(UserInfoType::class, $contact);
//
//        return ['form' => $form->createView(), 'id' => $id];
//    }
}
