<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PercentType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;

class BladeFindQueryAffinityType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'min',
          PercentType::class,
          [
            'label' => false,
            'data' => 0,
            'attr' => [
              'min' => 0,
              'max' => 100,
            ],
            'constraints' => [
              new NotBlank(['groups' => 'affinity']),
              new GreaterThan(['value' => 0, 'groups' => 'affinity']),
              new LessThanOrEqual(['value' => 1, 'groups' => 'affinity']),
            ],
          ]
        )->add(
          'max',
          PercentType::class,
          [
            'label' => false,
            'data' => 1,
            'attr' => [
              'min' => 0,
              'max' => 100,
            ],
            'constraints' => [
              new NotBlank(['groups' => 'affinity']),
              new GreaterThan(['value' => 0, 'groups' => 'affinity']),
              new LessThanOrEqual(['value' => 1, 'groups' => 'affinity']),
            ],
          ]
        );
    }
}
