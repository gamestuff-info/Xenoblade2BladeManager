<?php

namespace App\Form;

use App\Entity\BattleRole;
use App\Entity\Blade;
use App\Entity\Driver;
use App\Entity\Element;
use App\Entity\Gender;
use App\Entity\TrustRank;
use App\Entity\WeaponClass;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BladeFormType extends AbstractType
{

    /**
     * Builds the form.
     *
     * This method is called for each type in the hierarchy starting from the
     * top most type. Type extensions can further modify the form.
     *
     * @see FormTypeExtensionInterface::buildForm()
     *
     * @param FormBuilderInterface $builder The form builder
     * @param array $options The options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'driver',
          EntityType::class,
          [
            'class' => Driver::class,
            'required' => true,
          ]
        )
          ->add(
            'name',
            TextType::class,
            ['required' => true]
          )
          ->add(
            'inParty',
            CheckboxType::class,
            [
              'required' => false,
              'help' => 'This blade is in the current party.',
            ]
          )
          ->add(
            'gender',
            EntityType::class,
            [
              'class' => Gender::class,
              'required' => true,
            ]
          )
          ->add(
            'battleRole',
            EntityType::class,
            [
              'class' => BattleRole::class,
              'required' => true,
            ]
          )
          ->add(
            'weaponClass',
            EntityType::class,
            [
              'class' => WeaponClass::class,
              'required' => true,
            ]
          )
          ->add(
            'element',
            EntityType::class,
            [
              'class' => Element::class,
              'required' => true,
            ]
          )
          ->add(
            'strength',
            IntegerType::class,
            ['required' => true, 'attr' => ['min' => 1]]
          )->add(
            'rarity',
            IntegerType::class,
            ['required' => true, 'attr' => ['min' => 1, 'max' => 5]]
          )->add(
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
            'canBeReleased',
            CheckboxType::class,
            [
              'required' => false,
              'help' => 'A few specific blades cannot be released.',
            ]
          )->add(
            'isMerc',
            CheckboxType::class,
            [
              'required' => false,
              'help' => 'Not all Blades can be sent on Merc Missions. Uncheck this box if this Blade cannot be sent out (usually for story reasons).',
            ]
          )
          ->add(
            'mercTeamName',
            TextType::class,
            [
              'required' => false,
              'help' => 'Leave this blank for common blades to use the default "Team [name]" format.',
            ]
          )->add(
            'affinityNodes',
            CollectionType::class,
            [
              'entry_type' => BladeAffinityNodeType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add('save', SubmitType::class);;
    }

    /**
     * Configures the options for this type.
     *
     * @param OptionsResolver $resolver The resolver for the options
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'data_class' => Blade::class,
          ]
        );
    }
}
