<?php

namespace App\Form;

use App\Entity\AffinityNode;
use App\Entity\MercMissionRequirementFieldSkill;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionRequirementFieldSkillType extends AbstractMercMissionRequirementType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add(
          'field_skill',
          EntityType::class,
          [
            'class' => AffinityNode::class,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('fs')
                  ->orderBy('fs.sort');
            },
            'label_attr' => ['class' => 'sr-only'],
            'attr' => ['class' => 'form-control mb-2 mr-sm-2'],
          ]
        )->add(
          'level',
          IntegerType::class,
          [
            'attr' => [
              'min' => 0,
              'max' => 5,
              'class' => 'form-control mb-2 mr-sm-2',
              'placeholder' => 'Lv.',
            ],
            'label_attr' => ['class' => 'sr-only'],
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults(
          [
            'data_class' => MercMissionRequirementFieldSkill::class,
          ]
        );
    }
}
