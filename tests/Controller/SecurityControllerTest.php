<?php

namespace App\Tests\Controller;


use App\Entity\Blade;
use App\Entity\Role;
use App\Entity\User;
use App\Tests\FixturesTestCase;
use App\Tests\NeedsLoginTrait;
use Symfony\Bundle\SecurityBundle\DataCollector\SecurityDataCollector;
use Symfony\Bundle\SwiftmailerBundle\DataCollector\MessageDataCollector;
use Symfony\Component\DomCrawler\Crawler;

class SecurityControllerTest extends FixturesTestCase
{

    use NeedsLoginTrait;

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

    public function testActivateAction()
    {
        $this->loadFixturesFromFile();
        $em = $this->getContainer()->get('doctrine')->getManager();
        $roleUser = $em->getRepository(Role::class)->findOneBy(['name' => 'ROLE_USER']);
        $user = new User();
        $user->setUsername($this->faker->userName)
          ->setEmail($this->faker->email)
          ->setPassword(password_hash($this->faker->password, PASSWORD_BCRYPT))
          ->addRole($roleUser);
        $user->newActivateCode();
        $em->persist($user);
        $em->flush();

        $client = $this->createClient();
        $client->followRedirects();
        $client->request('GET', '/user/activate/'.urlencode($user->getId()).'?key='.urlencode($user->getActivateCode()));
        self::isSuccessful($client->getResponse());
        self::assertEquals('/user/login', $client->getRequest()->getPathInfo(), 'Not redirected to the login page after activation');
    }

    public function testLoginAction()
    {
        $this->loadFixturesFromFile();
        $em = $this->getContainer()->get('doctrine')->getManager();
        $user = new User();
        $password = $this->faker->password;
        $roleUser = $em->getRepository(Role::class)->findOneBy(['name' => 'ROLE_USER']);
        $user->setUsername($this->faker->userName)
          ->setEmail($this->faker->email)
          ->setPassword(password_hash($password, PASSWORD_BCRYPT))
          ->addRole($roleUser);
        $user->activate();
        $em->persist($user);
        $em->flush();

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
        $form['_password'] = $password;
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
        $form['_password'] = $password;
        $client->submit($form);
        /** @var SecurityDataCollector $securityCollector */
        $profile = $client->getProfile();
        $securityCollector = $profile->getCollector('security');
        self::assertEquals($user->getUsername(), $securityCollector->getUser(), 'Not logged in using e-mail');
    }

    public function testShowAction()
    {
        $this->loadFixturesFromFile([], 'SecurityControllerTest/testShowAction.php');
        $client = $this->createClient();
        $user = $this->login($client, 'Test New Admin');

        $crawler = $client->request('GET', '/');
        $crawler = $client->click($crawler->filter('.dropdown-menu a:contains(Profile)')->link());
        self::isSuccessful($client->getResponse());

        $bladeRepo = $this->getContainer()->get('doctrine')->getRepository(Blade::class);
        $blades = $bladeRepo->findBy(['user' => $user]);

        // Verify profile information shown
        self::assertEquals($user->getCreated()->format('F d, Y'), $crawler->filter('dt:contains(User since) + dd')->text(), 'Wrong date displayed');
        self::assertEquals($user->getEmail(), $crawler->filter('dt:contains(E-Mail) + dd')->text(), 'Wrong email displayed');
        self::assertEquals(implode(', ', $user->getRoles()), $crawler->filter('dt:contains(Roles) + dd')->text(), 'Wrong roles displayed');
        self::assertEquals(count($blades), $crawler->filter('dt:contains(Blades) + dd')->text(), 'Wrong blade count displayed');

        // Verify roles not shown if only one.
        $this->login($client, 'Test User');
        $crawler = $client->request('GET', '/user/profile');
        self::assertEquals(0, $crawler->filter('dt:contains(Roles) + dd')->count());
    }

    public function testEditAction()
    {
        $this->loadFixturesFromFile([], 'SecurityControllerTest/testShowAction.php');
        $client = $this->createClient();
        $client->followRedirects();
        $this->login($client, 'Test New Admin');
        $em = $this->getContainer()->get('doctrine')->getManager();
        $userRepo = $em->getRepository(User::class);

        $crawler = $client->request('GET', '/user/profile/edit');
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form[name=user_edit]')->form();
        $newEmail = $this->faker->email;
        $form['user_edit[email]'] = $newEmail;
        $form['user_edit[oldPassword]'] = 'Wrong password';
        $crawler = $client->request($form->getMethod(), $form->getUri(), $form->getPhpValues());
        self::isSuccessful($client->getResponse());

        self::assertContains('is-invalid', explode(' ', $crawler->filter('#user_edit_oldPassword')->attr('class')), 'Invalid text not displayed');
        $form = $crawler->filter('form[name=user_edit]')->form();
        $form['user_edit[email]'] = $newEmail;
        $form['user_edit[oldPassword]'] = 'password_old';
        $crawler = $client->request($form->getMethod(), $form->getUri(), $form->getPhpValues());
        self::isSuccessful($client->getResponse());

        /** @var User $user */
        $user = $userRepo->findOneBy(['username' => 'Test New Admin']);
        // Make sure this comes from the database.
        $em->refresh($user);
        self::assertEquals($newEmail, $user->getEmail(), 'E-mail change not persisted');

        $crawler = $client->request('GET', '/user/profile/edit');
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form[name=user_edit]')->form();
        $formValues = $form->getPhpValues();
        $formValues['user_edit']['oldPassword'] = 'password_old';
        $formValues['user_edit']['changePassword'] = '1';
        $newPassword = $this->faker->password;
        $formValues['user_edit']['plainPassword']['newPassword'] = $newPassword;
        $formValues['user_edit']['plainPassword']['repeatPassword'] = $newPassword;
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        $em->refresh($user);
        self::assertTrue(password_verify($newPassword, $user->getPassword()), 'Password change not persisted');
    }
}
