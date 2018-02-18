<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;

class BladeFindQueryRarityType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'min',
          IntegerType::class,
          [
            'label' => false,
            'required' => false,
            'attr' => [
              'min' => 1,
              'max' => 5,
            ],
            'constraints' => [
              new NotBlank(['groups' => 'rarity']),
              new GreaterThanOrEqual(['value' => 1, 'groups' => 'rarity']),
              new LessThanOrEqual(['value' => 5, 'groups' => 'rarity']),
            ],
          ]
        )->add(
          'max',
          IntegerType::class,
          [
            'label' => false,
            'required' => false,
            'attr' => [
              'min' => 1,
              'max' => 5,
            ],
            'constraints' => [
              new NotBlank(['groups' => 'rarity']),
              new GreaterThanOrEqual(['value' => 1, 'groups' => 'rarity']),
              new LessThanOrEqual(['value' => 5, 'groups' => 'rarity']),
            ],
          ]
        );
    }
}
