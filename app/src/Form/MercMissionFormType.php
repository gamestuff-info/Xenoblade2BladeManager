<?php

namespace App\Form;

use App\Entity\AffinityNode;
use App\Entity\MercMissionPrerequisite;
use App\Entity\Nation;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;

class MercMissionFormType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'name',
          TextType::class
        )
          ->add(
            'nation',
            EntityType::class,
            ['class' => Nation::class]
          )->add(
            'prerequisites',
            EntityType::class,
            [
              'class' => MercMissionPrerequisite::class,
              'multiple' => true,
              'expanded' => true,
              'required' => false,
              'query_builder' => function (EntityRepository $er) {
                  return $er->createQueryBuilder('m')
                    ->orderBy('m.sort');
              },
            ]
          )->add(
            'requirements_blade_class',
            CollectionType::class,
            [
              'label' => 'Blade Class',
              'entry_type' => MercMissionRequirementClassType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add(
            'requirements_element',
            CollectionType::class,
            [
              'label' => 'Element',
              'entry_type' => MercMissionRequirementElementType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add(
            'requirements_field_skill',
            CollectionType::class,
            [
              'label' => 'Field Skill',
              'entry_type' => MercMissionRequirementFieldSkillType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add(
            'requirements_gender',
            CollectionType::class,
            [
              'label' => 'Gender',
              'entry_type' => MercMissionRequirementGenderType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add(
            'requirements_strength',
            CollectionType::class,
            [
              'label' => 'Strength',
              'entry_type' => MercMissionRequirementStrengthType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add(
            'requirements_weapon_class',
            CollectionType::class,
            [
              'label' => 'Weapon Class',
              'entry_type' => MercMissionRequirementWeaponClassType::class,
              'entry_options' => ['label' => false],
              'allow_add' => true,
              'allow_delete' => true,
              'prototype' => true,
              'by_reference' => false,
              'required' => false,
            ]
          )->add(
            'field_skills',
            EntityType::class,
            [
              'class' => AffinityNode::class,
              'multiple' => true,
              'expanded' => true,
              'required' => false,
              'query_builder' => function (EntityRepository $er) {
                  return $er->createQueryBuilder('a')
                    ->orderBy('a.sort');
              },
            ]
          )->add(
            'duration',
            TimeType::class,
            [
              'widget' => 'text',
              'with_minutes' => true,
              'with_seconds' => false,
            ]
          )->add(
            'merc_points',
            IntegerType::class,
            [
              'required' => false,
            ]
          )->add(
            'experience',
            IntegerType::class,
            [
              'required' => false,
            ]
          )->add(
            'gold',
            IntegerType::class,
            [
              'required' => false,
            ]
          )->add(
            'repeatable',
            CheckboxType::class, [
              'required' => false,
            ]
          )->add(
            'save',
            SubmitType::class
          );
    }
}
