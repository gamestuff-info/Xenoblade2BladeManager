<?php

namespace App\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class GoogleController extends AbstractController implements ConnectInterface
{

    /**
     * Redirect to Google's login page.
     *
     * @param ClientRegistry $oauth
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/connect/google", name="connect_google_connect", schemes={"https"})
     */
    public function connectAction(ClientRegistry $oauth)
    {
        return $oauth->getClient('google')->redirect();
    }

    /**
     * @param Request $request
     *
     * @Route("/connect/google/check", name="connect_google_check", schemes={"https"})
     */
    public function connectCheckAction(Request $request)
    {
        // Method intentionally left blank, as the actual logic for this will
        // be performed by the GoogleAuthenticator class.
    }
}
