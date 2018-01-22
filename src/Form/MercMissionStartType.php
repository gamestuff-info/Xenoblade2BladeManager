<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class MercMissionStartType extends AbstractType
{

    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'blades',
          CollectionType::class,
          [
            'entry_type' => MercMissionBladeType::class,
            'entry_options' => [
              'label' => false,
            ],
            'allow_add' => true,
            'allow_delete' => true,
            'prototype' => true,
            'label' => false,
            'attr' => [
              'class' => 'row no-gutters',
            ],
          ]
        )->add(
          'submit',
          SubmitType::class,
          [
            'label' => 'Start',
            'attr' => [
                // The start button starts disabled because there are no Blades
                // assigned.  It will later rbe enabled on the client-side.
              'disabled' => true,
            ],
          ]
        );
    }
}
