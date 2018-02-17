<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
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
