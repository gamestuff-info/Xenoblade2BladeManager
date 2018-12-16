<?php

namespace App\Form;

use App\Entity\AffinityNode;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;

class BladeFindQueryFieldSkillType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'affinityNode',
          EntityType::class,
          [
            'class' => AffinityNode::class,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('an')
                  ->orderBy('an.sort');
            },
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'fieldSkill']),
            ],
          ]
        )->add(
          'comparison',
          ChoiceType::class,
          [

            'choices' => [
              '≥' => 'gte',
              '=' => 'eq',
              '≤' => 'lte',
            ],
            'data' => 'gte',
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'fieldSkill']),
            ],
          ]
        )->add(
          'level',
          IntegerType::class,
          [
            'data' => 1,
            'attr' => [
              'min' => 1,
              'max' => 5,
            ],
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'fieldSkill']),
              new GreaterThanOrEqual(['value' => 1, 'groups' => 'fieldSkill']),
              new LessThanOrEqual(['value' => 5, 'groups' => 'fieldSkill']),
            ],
          ]
        );
    }
}
