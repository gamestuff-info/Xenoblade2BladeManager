<?php

namespace App\Controller;

use App\Entity\Role;
use App\Entity\User;
use App\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Translation\TranslatorInterface;


class SecurityController extends Controller
{

    /**
     * @param Request $request
     * @param AuthenticationUtils $authUtils
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/login", name="user_login")
     */
    public function loginAction(Request $request, AuthenticationUtils $authUtils, TranslatorInterface $translator)
    {
        // get the login error if there is one
        $error = $authUtils->getLastAuthenticationError();
        if ($error) {
            $this->addFlash(
              'danger',
              $translator->trans(
                $error->getMessageKey(),
                $error->getMessageData(),
                'security'
              )
            );
        }

        // last username entered by the user
        $lastUsername = $authUtils->getLastUsername();

        return $this->render(
          'security/login.html.twig',
          [
            'title' => 'Login',
            'last_username' => $lastUsername,
          ]
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface $passwordEncoder
     * @param \Swift_Mailer $mailer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/register", name="user_register")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $passwordEncoder, \Swift_Mailer $mailer)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $user = $this->createNewUser($user, $passwordEncoder);
                $this->sendRegistrationMail($user, $mailer);

                $this->addFlash(
                  'primary',
                  'Check your email at '.$user->getEmail().' for instructions.'
                );

                return $this->redirectToRoute('main');
            } else {
                foreach ($form->getErrors(true) as $error) {
                    $this->addFlash('danger', $error->getMessage());
                }
            }
        }

        return $this->render(
          'security/register.html.twig',
          [
            'title' => 'Register',
            'form' => $form->createView(),
          ]
        );
    }

    /**
     * @param User $user
     * @param \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface $passwordEncoder
     *
     * @return \App\Entity\User
     */
    private function createNewUser(User $user, UserPasswordEncoderInterface $passwordEncoder): User
    {
        $em = $this->getDoctrine()->getManager();

        $password = $passwordEncoder->encodePassword(
          $user,
          $user->getPlainPassword()
        );
        $user->setPassword($password);
        $user->newActivateCode();

        $roleRepo = $em->getRepository(Role::class);
        $userRole = $roleRepo->findOneBy(['slug' => 'user']);
        $user->addRole($userRole);

        $em->persist($user);
        $em->flush();

        return $user;
    }

    /**
     * @param $user
     * @param \Swift_Mailer $mailer
     */
    private function sendRegistrationMail($user, \Swift_Mailer $mailer): void
    {
        $message = new \Swift_Message('User activation');
        $message->setTo($user->getEmail())
          ->setBody(
            $this->renderView(
              'email/registration.html.twig',
              ['user' => $user]
            ),
            'text/html'
          )->addPart(
            $this->renderView(
              'email/registration.txt.twig',
              ['user' => $user]
            ),
            'text/plain'
          );
        $mailer->send($message);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \App\Entity\User $user
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/activate/{user}", name="user_activate")
     * @ParamConverter(
     *     "user",
     *     class="App\Entity\User",
     *     options={"mapping":{"user": "username"}}
     *     )
     */
    public function activateAction(Request $request, User $user)
    {
        $activationCode = $request->get('key');
        if (is_null($activationCode)) {
            throw new NotFoundHttpException();
        }

        $expirationTime = new \DateInterval('PT2H');
        $codeExpired = new \DateTime() >= $user->getActivateCodeTime()->add(
            $expirationTime
          );
        if ($user->getActivateCode() == $activationCode) {
            if (!$codeExpired) {
                $user->activate();

                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();

                $this->addFlash(
                  'success',
                  'Your account has been activated.  You may now login.'
                );

                return $this->redirectToRoute('user_login');
            } else {
                $this->addFlash('danger', 'This activation code is expired.');
            }
        } else {
            $this->addFlash('danger', 'This is the wrong activation code.');
        }

        return $this->redirectToRoute('main');
    }
}
