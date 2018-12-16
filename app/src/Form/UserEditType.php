<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\UserEdit;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserEditType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'newEmail',
          EmailType::class,
          [
            'label' => 'Email',
          ]
        )->add(
          'oldPassword',
          PasswordType::class,
          [
            'label' => 'Current password',
          ]
        )->add(
          'changePassword',
          CheckboxType::class,
          [
            'mapped' => false,
            'required' => false,
          ]
        )->add(
          'plainPassword',
          RepeatedType::class,
          [
            'type' => PasswordType::class,
            'options' => [
              'required' => false,
              'attr' => [
                'disabled' => true,
              ],
            ],
            'first_name' => 'newPassword',
            'second_name' => 'repeatPassword',
            'required' => false,
          ]
        )->add(
          'submit',
          SubmitType::class,
          [
            'label' => 'Save',
          ]
        );

        $builder->addEventListener(
          FormEvents::PRE_SET_DATA, [
            $this,
            'fillEmail',
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'data_class' => User::class,
            'allow_extra_fields' => true,
            'validation_groups' => [$this, 'validationGroups'],
          ]
        );
    }

    /**
     * Callback function to determine the validation groups to use.
     *
     * @param FormInterface $form
     *
     * @return array
     */
    public function validationGroups(FormInterface $form)
    {
        $validationGroups = ['edit'];
        if ($form->get('changePassword')->getData()) {
            $validationGroups[] = 'passwordChange';
        }

        return $validationGroups;
    }

    /**
     * Copy the user's current email into the new email field.
     *
     * @param FormEvent $event
     */
    public function fillEmail(FormEvent $event)
    {
        /** @var User $user */
        $user = $event->getData();
        $user->setNewEmail($user->getEmail());
    }
}
