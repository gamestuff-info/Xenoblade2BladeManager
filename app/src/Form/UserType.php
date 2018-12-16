<?php

namespace App\Form;

use App\Entity\User;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints as Recaptcha;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
          ->add(
            'email',
            RepeatedType::class,
            [
              'type' => EmailType::class,
              'first_options' => ['label' => 'E-Mail'],
              'second_options' => ['label' => 'Confirm E-Mail'],
            ]
          )->add(
            'plainPassword',
            RepeatedType::class,
            [
              'type' => PasswordType::class,
              'first_options' => ['label' => 'Password'],
              'second_options' => ['label' => 'Confirm Password'],
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
              'label' => 'Register!',
            ]
          );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'data_class' => User::class,
            'validation_groups' => ['registration'],
          ]
        );
    }
}
