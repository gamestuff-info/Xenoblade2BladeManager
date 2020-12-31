<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class IndexController extends AbstractController
{

    /**
     * @Route("/", name="main")
     */
    public function index()
    {
        return $this->render(
          'pages/index.html.twig',
          [
            'title' => 'Xenoblade Chronicles 2: Management Simulator',
          ]
        );
    }
}
