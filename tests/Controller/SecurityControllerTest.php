<?php

namespace App\Tests\Controller;


use App\Entity\User;
use App\Tests\FixturesTestCase;
use Symfony\Bundle\SecurityBundle\DataCollector\SecurityDataCollector;
use Symfony\Bundle\SwiftmailerBundle\DataCollector\MessageDataCollector;
use Symfony\Component\DomCrawler\Crawler;

class SecurityControllerTest extends FixturesTestCase
{

    /**
     * @return User
     */
    public function testRegisterAction()
    {
        $this->loadFixturesFromFile();
        $client = $this->createClient();
        $client->enableProfiler();

        // Navigate to the registration page
        $crawler = $client->request('GET', '/');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Login")')->link());
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('#login-nav a:contains("Register")')->link());
        self::isSuccessful($client->getResponse());

        // Fill out the registration form
        $username = $this->faker->name;
        $email = $this->faker->email;
        $password = $this->faker->password();
        $form = $crawler->filter('form[name="user"]')->selectButton('Register!')->form();
        $form['user[username]'] = $username;
        $form['user[email]'] = $email;
        $form['user[plainPassword][first]'] = $password;
        $form['user[plainPassword][second]'] = $password;
        $client->submit($form);

        // Verify the user was created
        $userRepo = $this->doctrine->getRepository(User::class);
        $user = $userRepo->findOneBy(['username' => $username]);
        self::assertInstanceOf(User::class, $user, 'User not persisted.');
        self::assertFalse($user->isActive(), 'Newly-created user should not be active.');
        self::assertEquals($username, $user->getUsername(), 'Wrong username persisted.');
        self::assertEquals($email, $user->getEmail(), 'Wrong e-mail persisted.');
        self::assertTrue(password_verify($password, $user->getPassword()), 'Wrong password persisted or not hashed correctly.');

        // Store the plain password in the User object since it's been confirmed
        // good at this point; this helps in later tests.
        $user->setPlainPassword($password);

        // Verify the confirmation email was sent
        /** @var MessageDataCollector $mailCollector */
        $mailCollector = $client->getProfile()->getCollector('swiftmailer');
        self::assertEquals(1, $mailCollector->getMessageCount(), 'Confirmation e-mail not sent correctly.');
        /** @var \Swift_Message $message */
        $message = $mailCollector->getMessages()[0];
        self::assertEquals([$email], array_keys($message->getTo()), 'Confirmation e-mail sent to wrong recipient.');
        $messageCrawler = new Crawler($message->getBody());
        self::assertEquals($username, $messageCrawler->filter('dt:contains("Username") + dd')->html(), 'Wrong username in confirmation e-mail (HTML)');
        self::assertEquals($email, $messageCrawler->filter('dt:contains("E-Mail") + dd')->html(), 'Wrong e-mail in confirmation e-mail (HTML)');
        self::assertEquals($user->getActivateCode(), $messageCrawler->filter('h2:contains("Activation code") + p')->html(), 'Wrong activation code in confirmation e-mail (HTML)');
        $textMessage = null;
        foreach ($message->getChildren() as $child) {
            if ($child->getContentType() == 'text/plain') {
                $textMessage = $child;
            }
        }
        self::assertNotNull($textMessage, 'No text/plain part in the confirmation email.');
        self::assertRegExp('`Username:\s'.$username.'`m', $textMessage->getBody(), 'Wrong username in confirmation e-mail (Text)');
        self::assertRegExp('`E-Mail:\s'.$email.'`m', $textMessage->getBody(), 'Wrong e-mail in confirmation e-mail (Text)');
        self::assertRegExp('`Activation code:\s'.$user->getActivateCode().'`m', $textMessage->getBody(), 'Wrong activation code in confirmation e-mail (Text)');

        // Verify that registration with the same username/e-mail is impossible.
        $crawler = $client->request('GET', '/user/register');
        $form = $crawler->filter('form[name="user"]')->selectButton('Register!')->form();
        $form['user[username]'] = $username;
        $form['user[email]'] = $email;
        $form['user[plainPassword][first]'] = $password;
        $form['user[plainPassword][second]'] = $password;
        $crawler = $client->submit($form);
        self::assertEquals('/user/register', $client->getRequest()->getPathInfo(), 'Not redirected to registration page after bad registration');
        self::assertEquals(1, $crawler->filter('input[id="user_username"] + .invalid-feedback')->count(), 'Not showing error on duplicate username');
        self::assertEquals(1, $crawler->filter('input[id="user_email"] + .invalid-feedback')->count(), 'Not showing error on duplicate e-mail');

        return $user;
    }

    /**
     * @depends testRegisterAction
     *
     * @param User $user
     *
     * @return User
     */
    public function testActivateAction(User $user)
    {
        $client = $this->createClient();
        $client->followRedirects();
        $client->request('GET', '/user/activate/'.urlencode($user->getId()).'?key='.urlencode($user->getActivateCode()));
        self::isSuccessful($client->getResponse());
        self::assertEquals('/user/login', $client->getRequest()->getPathInfo(), 'Not redirected to the login page after activation');

        return $user;
    }

    /**
     * @depends testActivateAction
     *
     * @param User $user
     */
    public function testLoginAction(User $user)
    {
        $client = $this->createClient();
        $client->followRedirects();

        // Navigate to the login page
        $crawler = $client->request('GET', '/');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Login")')->link());
        self::isSuccessful($client->getResponse());

        // Login with username
        $form = $crawler->filter('form:contains("Username")')->selectButton('Login')->form();
        $form['_username'] = $user->getUsername();
        $form['_password'] = $user->getPlainPassword();
        $crawler = $client->submit($form);
        /** @var SecurityDataCollector $securityCollector */
        $profile = $client->getProfile();
        $securityCollector = $profile->getCollector('security');
        self::assertEquals($user->getUsername(), $securityCollector->getUser(), 'Not logged in using username');

        // Logout to try again
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Logout")')->link());
        self::isSuccessful($client->getResponse());

        // Login with email
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Login")')->link());
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form:contains("Username")')->selectButton('Login')->form();
        $form['_username'] = $user->getEmail();
        $form['_password'] = $user->getPlainPassword();
        $client->submit($form);
        /** @var SecurityDataCollector $securityCollector */
        $profile = $client->getProfile();
        $securityCollector = $profile->getCollector('security');
        self::assertEquals($user->getUsername(), $securityCollector->getUser(), 'Not logged in using e-mail');
    }
}
