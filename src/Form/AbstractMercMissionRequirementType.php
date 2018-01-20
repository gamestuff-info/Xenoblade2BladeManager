<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class AbstractMercMissionRequirementType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'count',
          IntegerType::class,
          [
            'attr' => [
              'min' => 1,
              'max' => 6,
              'class' => 'form-control mb-2 mr-sm-2',
              'placeholder' => '#',
            ],
            'label_attr' => ['class' => 'sr-only'],
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'label' => false,
            'attr' => ['class' => 'form-inline'],
          ]
        );
    }
}
