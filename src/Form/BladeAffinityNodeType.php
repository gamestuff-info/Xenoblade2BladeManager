<?php

namespace App\Form;

use App\Entity\AffinityNode;
use App\Entity\BladeAffinityNode;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BladeAffinityNodeType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'affinityNode',
          EntityType::class,
          [
            'class' => AffinityNode::class,
            'label' => 'Field Skill',
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('affinityNode')
                  ->orderBy('affinityNode.sort', 'ASC');
            },
            'attr' => [
              'class' => 'form-control mb-2 mr-sm-2',
            ],
            'label_attr' => [
              'class' => 'sr-only',
            ],
          ]
        )->add(
          'level',
          IntegerType::class,
          [
            'label' => 'Level',
            'attr' => [
              'class' => 'form-control mb-2 mr-sm-2',
              'min' => 0,
              'max' => 5,
              'placeholder' => 'Lv.',
            ],
            'label_attr' => [
              'class' => 'sr-only',
            ],
          ]
        )->add(
          'maxLevel',
          IntegerType::class,
          [
            'label' => 'Max',
            'attr' => [
              'class' => 'form-control mb-2 mr-sm-2',
              'min' => 1,
              'max' => 5,
              'placeholder' => 'Max',
            ],
            'label_attr' => [
              'class' => 'sr-only',
            ],
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'data_class' => BladeAffinityNode::class,
            'attr' => ['class' => 'form-inline'],
          ]
        );
    }
}
