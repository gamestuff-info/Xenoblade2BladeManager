<?php


namespace App\Security;


use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface;
use KnpU\OAuth2ClientBundle\Security\Authenticator\SocialAuthenticator;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;
use League\OAuth2\Client\Token\AccessToken;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;

abstract class OAuthAuthenticator extends SocialAuthenticator
{

    /**
     * @var ClientRegistry
     */
    protected $oauth;

    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var UserRepository;
     */
    protected $userRepo;

    /**
     * @var RouterInterface
     */
    protected $router;

    /**
     * @var Session
     */
    protected $session;

    /**
     * OAuthAuthenticator constructor.
     *
     * @param ClientRegistry $clientRegistry
     * @param EntityManagerInterface $em
     * @param RouterInterface $router
     * @param SessionInterface $session
     */
    public function __construct(ClientRegistry $clientRegistry, EntityManagerInterface $em, RouterInterface $router, SessionInterface $session)
    {
        $this->oauth = $clientRegistry;
        $this->em = $em;
        $this->userRepo = $em->getRepository(User::class);
        $this->router = $router;
        $this->session = $session;
    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    public function supports(Request $request)
    {
        return $request->getPathInfo() == $this->router->generate($this->checkRouteName());
    }

    /**
     * @param Request $request
     *
     * @return AccessToken|mixed
     */
    public function getCredentials(Request $request)
    {
        return $this->fetchAccessToken($this->getClient());
    }

    /**
     * Returns a response that directs the user to authenticate.
     *
     * This is called when an anonymous request accesses a resource that
     * requires authentication. The job of this method is to return some
     * response that "helps" the user start into the authentication process.
     *
     * Examples:
     *  A) For a form login, you might redirect to the login page
     *      return new RedirectResponse('/login');
     *  B) For an API token authentication system, you return a 401 response
     *      return new Response('Auth header required', 401);
     *
     * @param Request $request The request that resulted in an AuthenticationException
     * @param AuthenticationException $authException The exception that started the authentication process
     *
     * @return Response
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new RedirectResponse($this->router->generate('user_login'));
    }

    /**
     * Called when authentication executed, but failed (e.g. wrong username password).
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the login page or a 403 response.
     *
     * If you return null, the request will continue, but the user will
     * not be authenticated. This is probably not what you want to do.
     *
     * @param Request $request
     * @param AuthenticationException $exception
     *
     * @return Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new RedirectResponse($this->router->generate('user_login'));
    }

    /**
     * Called when authentication executed and was successful!
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the last page they visited.
     *
     * If you return null, the current request will continue, and the user
     * will be authenticated. This makes sense, for example, with an API.
     *
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey The provider (i.e. firewall) key
     *
     * @return Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return new RedirectResponse($this->router->generate('main'));
    }

    /**
     * Return a UserInterface object based on the credentials.
     *
     * This will call OAuthAuthenticator::oauthReturningUser,
     * OAuthAuthenticator::internalReturningUser, or
     * OAuthAuthenticator::newUser depending on how the user has authenticated
     * with this site previously.
     *
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     *
     * @throws AuthenticationException
     *
     * @return User|null
     */
    public function getUser($credentials, UserProviderInterface $userProvider): ?User
    {
        $oauthUser = $this->getClient()->fetchUserFromToken($credentials);

        if ($user = $this->oauthReturningUser($oauthUser)) {
            return $user;
        } elseif ($user = $this->internalReturningUser($oauthUser)) {
            // Switch the user from using the email/password form to using oauth.
            $user->setPassword(null);
            $this->em->persist($user);
            $this->em->flush();
            $this->session->getFlashBag()->add('warning', 'You have now authenticated with an external provider.  Your old credentials have been removed.  From now on, always use this external provider to login.');

            return $user;
        } elseif ($user = $this->newUser($oauthUser)) {
            $this->em->persist($user);
            $this->em->flush();
            
            return $user;
        }

        return null;
    }

    /**
     * The name of the route that the OAuth provider will redirect to.
     *
     * @return string
     */
    abstract protected function checkRouteName(): string;

    /**
     * This user has authenticated with OAuth before.
     *
     * @param ResourceOwnerInterface $oauthUser
     *
     * @return User
     */
    abstract protected function oauthReturningUser(ResourceOwnerInterface $oauthUser): ?User;

    /**
     * This user has not authenticated with OAuth before, but HAS authenticated
     * using the same e-mail address.
     *
     * @param ResourceOwnerInterface $oauthUser
     *
     * @return User
     */
    abstract protected function internalReturningUser(ResourceOwnerInterface $oauthUser): ?User;

    /**
     * This user is new to the site.
     *
     * @param ResourceOwnerInterface $oauthUser
     *
     * @return User
     */
    abstract protected function newUser(ResourceOwnerInterface $oauthUser): ?User;

    /**
     * Get the OAuth Client this Authenticator uses.
     *
     * @return OAuth2ClientInterface
     */
    abstract protected function getClient(): OAuth2ClientInterface;
}
