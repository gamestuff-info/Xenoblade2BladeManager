<?php

namespace App\Form;

use App\Entity\BladeClass;
use App\Entity\MercMissionRequirementClass;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionRequirementClassType extends AbstractMercMissionRequirementType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add(
          'class',
          EntityType::class,
          [
            'class' => BladeClass::class,
            'label_attr' => ['class' => 'sr-only'],
            'attr' => ['class' => 'form-control mb-2 mr-sm-2'],
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults(
          [
            'data_class' => MercMissionRequirementClass::class,
          ]
        );
    }
}
