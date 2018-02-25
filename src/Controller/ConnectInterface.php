<?php


namespace App\Controller;


use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Interface for OAuth action controllers.
 */
interface ConnectInterface
{

    /**
     * Redirect to the provider's login page.
     *
     * The route defined by this method should be named connect_PROVIDER_connect.
     *
     * @param ClientRegistry $oauth
     *
     * @return RedirectResponse
     */
    public function connectAction(ClientRegistry $oauth);

    /**
     * Check the user's authentication.
     *
     * Most likely, this method should be used only for defining the route
     * and the actual check logic should be performed in a guard.
     *
     * The route defined by this method should be named connect_PROVIDER_check.
     *
     * @param Request $request
     */
    public function connectCheckAction(Request $request);
}
