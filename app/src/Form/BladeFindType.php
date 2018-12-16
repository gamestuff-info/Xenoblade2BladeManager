<?php

namespace App\Form;

use App\Entity\BladeFind;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BladeFindType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'queries',
          CollectionType::class,
          [
            'entry_type' => BladeFindQueryType::class,
            'entry_options' => [
              'label' => false,
            ],
            'label' => false,
            'prototype' => true,
            'allow_add' => true,
            'allow_delete' => true,
          ]
        )->add(
          'submit',
          SubmitType::class,
          [
            'label' => 'Find',
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
              // uncomment if you want to bind to a class
              //'data_class' => BladeFind::class,
          ]
        );
    }
}
