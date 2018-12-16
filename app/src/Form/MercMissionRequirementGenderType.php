<?php

namespace App\Form;

use App\Entity\Gender;
use App\Entity\MercMissionRequirementGender;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionRequirementGenderType extends AbstractMercMissionRequirementType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add(
          'gender',
          EntityType::class,
          [
            'class' => Gender::class,
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
            'data_class' => MercMissionRequirementGender::class,
          ]
        );
    }
}
