<?php

namespace App\Form;

use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints as Recaptcha;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

class LoginType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
          ->add(
            'email', EmailType::class, [
              'label' => 'E-Mail',
              'required' => true,
            ]
          )->add(
            'password', PasswordType::class, [
              'label' => 'Password',
              'required' => true,
            ]
          )->add(
            'remember_me', CheckboxType::class, [
              'label' => 'Remember me for 30 days',
              'value' => false,
              'required' => false,
            ]
          )->add(
            'recaptcha',
            EWZRecaptchaType::class,
            [
              'mapped' => false,
              'label' => false,
              'constraints' => [
                new Recaptcha\IsTrue(),
              ],
            ]
          )->add(
            'submit',
            SubmitType::class,
            [
              'label' => 'Login',
            ]
          );
    }
}
