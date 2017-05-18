<?php

namespace MyTravelBundle\Controller;

use MyTravelBundle\Entity\UserInfo;
use MyTravelBundle\Form\UserInfoType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserInfoController extends Controller
{
    /**
     * @Route("profile/edit/newInfo/{id}")
     * @Template("FOSUserBundle:Profile:info_form.html.twig")
     * @Method("GET")
     */
    public function showNewInfoFormAction($id)
    {
        $contact = new UserInfo();

        $form = $this->createForm(UserInfoType::class, $contact,
            ['action' => $this->generateUrl('mytravel_userinfo_showeditform')]);

        return ['form' => $form->createView()];
    }

    /**
     * @Route("/profile/edit/{id}")
     * @Template("FOSUserBundle:Profile:info_form.html.twig")
     * @Method("GET")
     */
    public function showEditFormAction($id)
    {
        $contact = $this->getDoctrine()->getRepository('MyTravelBundle:UserInfo')->find($id);

        if (!$contact) {

            $this->redirectToRoute('mytravel_userinfo_shownewinfoform', array('id' => $id));

        }

        $form = $this->createForm(UserInfoType::class, $contact);

        return ['form' => $form->createView(), 'id' => $id];
    }
}
