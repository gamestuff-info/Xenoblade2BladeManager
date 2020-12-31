<?php

namespace App\Controller;

use App\Entity\Blade;
use App\Entity\Role;
use App\Entity\User;
use App\Form\UserEditType;
use App\Form\UserProgressType;
use App\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Contracts\Translation\TranslatorInterface;


class SecurityController extends AbstractController
{

    /**
     * @param AuthenticationUtils $authUtils
     * @param TranslatorInterface $translator
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/login", name="user_login")
     */
    public function loginAction(AuthenticationUtils $authUtils, TranslatorInterface $translator)
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
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \App\Entity\User $user
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/activate/{user}", name="user_activate")
     * @ParamConverter(
     *     "user",
     *     class="App\Entity\User",
     *     options={"mapping":{"user": "id"}}
     *     )
     */
    public function activateAction(Request $request, User $user)
    {
        $activationCode = $request->get('key');
        if (is_null($activationCode)) {
            throw new NotFoundHttpException();
        }

        try {
            $expirationTime = new \DateInterval('PT2H');
        } catch (\Exception $e) {
            throw new \LogicException('Interval is not valid', 0, $e);
        }
        $codeExpired = new \DateTime() >= $user->getActivateCodeTime()->add(
            $expirationTime
          );
        if (strtoupper($user->getActivateCode()) == strtoupper($activationCode)) {
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

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/profile", name="user_show")
     * @Security("is_granted('ROLE_USER')")
     */
    public function showAction()
    {
        /** @var User $user */
        $user = $this->getUser();

        $bladeRepo = $this->getDoctrine()->getRepository(Blade::class);
        $blades = $bladeRepo->findBy(['user' => $user]);

        return $this->render(
          'pages/user/show.html.twig', [
            'title' => $user->getUsername(),
            'user' => $user,
            'blades' => $blades,
          ]
        );
    }

    /**
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/profile/edit", name="user_edit")
     * @Security("is_granted('ROLE_USER')")
     */
    public function editAction(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        /** @var User $user */
        $user = $this->getUser();

        if ($user->usesOAuth()) {
            throw new NotFoundHttpException('OAuth users cannot edit their profile.');
        }

        $form = $this->createForm(UserEditType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            /** @var User $user */
            $user = $form->getData();
            $user->setEmail($user->getNewEmail());

            if ($form->get('changePassword')->getData()) {
                $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
                $user->setPassword($password);
                $this->addFlash('success', 'Your password has been changed.');
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', 'Your profile has been changed.');

            return $this->redirectToRoute('user_show');
        }

        return $this->render(
          'pages/user/edit.html.twig', [
            'title' => $user->getUsername(),
            'user' => $user,
            'form' => $form->createView(),
          ]
        );
    }

    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/user/profile/progress", name="user_progress")
     * @Security("is_granted('ROLE_USER')")
     */
    public function progressAction(Request $request)
    {
        /** @var User $user */
        $user = $this->getUser();

        $form = $this->createForm(UserProgressType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            /** @var User $user */
            $user = $form->getData();

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', 'Your game progress has been updated.');

            return $this->redirectToRoute('user_show');
        }

        return $this->render(
          'pages/user/progress.html.twig', [
            'title' => $user->getUsername(),
            'user' => $user,
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
     * @param User $user
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
}
