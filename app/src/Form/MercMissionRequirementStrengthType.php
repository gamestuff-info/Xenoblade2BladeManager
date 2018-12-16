<?php

namespace App\Form;

use App\Entity\MercMissionRequirementStrength;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionRequirementStrengthType extends AbstractMercMissionRequirementType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add(
          'strength',
          IntegerType::class,
          [
            'attr' => [
              'min' => 1,
              'class' => 'form-control mb-2 mr-sm-2',
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
            'data_class' => MercMissionRequirementStrength::class,
          ]
        );
    }
}
