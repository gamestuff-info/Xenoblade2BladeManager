<?php

namespace App\Form;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionStopType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $blades = $options['blades'];

        $builder->add(
          'blades',
          CollectionType::class,
          [
            'entry_type' => BladeReturnedFromMissionType::class,
            'data' => new ArrayCollection($blades),
            'entry_options' => [
              'label' => false,
            ],
            'by_reference' => false,
              'label_attr' => ['class' => 'sr-only']
          ]
        )->add(
          'finish',
          SubmitType::class,
          ['label' => 'Finish']
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'blades' => [],
          ]
        );
    }
}
