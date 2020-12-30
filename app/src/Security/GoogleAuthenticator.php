<?php


namespace App\Security;


use App\Entity\Role;
use App\Entity\User;
use KnpU\OAuth2ClientBundle\Client\OAuth2Client;
use KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class GoogleAuthenticator extends OAuthAuthenticator
{

    /**
     * @param ResourceOwnerInterface $oauthUser
     *
     * @return User|null
     */
    protected function oauthReturningUser(ResourceOwnerInterface $oauthUser): ?User
    {
        /** @var User $user */
        $user = $this->userRepo->findOneBy(['googleId' => $oauthUser->getId()]);

        return $user;
    }

    /**
     * @param ResourceOwnerInterface $oauthUser
     *
     * @return User|null
     */
    protected function internalReturningUser(ResourceOwnerInterface $oauthUser): ?User
    {
        /** @var User $user */
        $user = $this->userRepo->findOneBy(['email' => $oauthUser->getEmail()]);
        if ($user) {
            // Associate the user with their Google account
            $user->setGoogleId($oauthUser->getId());

            return $user;
        } else {
            return null;
        }
    }

    /**
     * This user is new to the site.
     *
     * @param ResourceOwnerInterface $oauthUser
     *
     * @return User
     */
    protected function newUser(ResourceOwnerInterface $oauthUser): ?User
    {
        $user = new User();
        $user->setGoogleId($oauthUser->getId())
          ->setEmail($oauthUser->getEmail())
          ->activate();
        $roleRepo = $this->em->getRepository(Role::class);
        $userRole = $roleRepo->findOneBy(['slug' => 'user']);
        $user->addRole($userRole);

        return $user;
    }


    /**
     * @return OAuth2Client
     */
    protected function getClient(): OAuth2ClientInterface
    {
        return $this->oauth->getClient('google');
    }

    protected function checkRouteName(): string
    {
        return 'connect_google_check';
    }
}
