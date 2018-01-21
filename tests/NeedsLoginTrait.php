<?php


namespace App\Tests;


use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;

trait NeedsLoginTrait
{

    /**
     * @param Client $client
     * @param User|string $user
     *
     * @return User
     *   The user that is logged in.
     */
    protected function login(Client &$client, $user)
    {
        // This is adapted from the Symfony documentation at
        // http://symfony.com/doc/current/testing/http_authentication.html#creating-the-authentication-token

        $session = $client->getContainer()->get('session');

        // Get the user if specified as a string
        if (is_string($user)) {
            $userRepo = $client->getContainer()->get('doctrine')->getRepository(User::class);
            $user = $userRepo->findOneBy(['username' => $user]);
            if (!$user) {
                throw new UsernameNotFoundException();
            }
        }

        // The firewall name from config/packages/security.yaml
        $firewallContext = 'main';

        // Generate the user token
        $token = new UsernamePasswordToken($user, null, $firewallContext, $user->getRoles());
        $session->set('_security_'.$firewallContext, serialize($token));
        $session->save();

        // Set the session cookie
        $cookie = new Cookie($session->getName(), $session->getId());
        $client->getCookieJar()->set($cookie);

        return $user;
    }
}
