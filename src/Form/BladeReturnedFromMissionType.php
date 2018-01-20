<?php

namespace App\Form;

use App\Entity\Blade;
use App\Entity\TrustRank;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BladeReturnedFromMissionType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'affinity',
          IntegerType::class,
          ['required' => true, 'attr' => ['min' => 0, 'max' => 50]]
        )->add(
          'affinityTotal',
          IntegerType::class,
          ['required' => true, 'attr' => ['min' => 1, 'max' => 50]]
        )->add(
          'trust',
          EntityType::class,
          [
            'class' => TrustRank::class,
            'required' => true,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('tr')
                  ->orderBy('tr.sort', 'DESC');
            },
          ]
        )->add(
          'affinityNodes',
          CollectionType::class,
          [
            'entry_type' => BladeAffinityNodeType::class,
            'entry_options' => ['label' => false],
            'by_reference' => false,
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'data_class' => Blade::class,
          ]
        );
    }
}
