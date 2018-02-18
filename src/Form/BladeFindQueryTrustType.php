<?php

namespace App\Form;

use App\Entity\TrustRank;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class BladeFindQueryTrustType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'min',
          EntityType::class,
          [
            'label' => false,
            'class' => TrustRank::class,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('tr')
                  ->orderBy('tr.sort', 'DESC');
            },
            'choice_value' => 'sort',
            'constraints' => [
              new NotBlank(['groups' => 'trust']),
            ],
          ]
        )->add(
          'max',
          EntityType::class,
          [
            'label' => false,
            'class' => TrustRank::class,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('tr')
                  ->orderBy('tr.sort', 'DESC');
            },
            'choice_value' => 'sort',
            'constraints' => [
              new NotBlank(['groups' => 'trust']),
            ],
          ]
        );
    }
}
