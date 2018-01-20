<?php

namespace App\Form;

use App\Entity\MercMissionRequirementWeaponClass;
use App\Entity\WeaponClass;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionRequirementWeaponClassType extends AbstractMercMissionRequirementType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add(
          'weapon_class',
          EntityType::class,
          [
            'class' => WeaponClass::class,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('wc')
                  ->orderBy('wc.name');
            },
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
            'data_class' => MercMissionRequirementWeaponClass::class,
          ]
        );
    }
}
