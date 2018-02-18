<?php

namespace App\Form;

use App\Entity\AffinityNode;
use App\Entity\BattleRole;
use App\Entity\Driver;
use App\Entity\Element;
use App\Entity\WeaponClass;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;

class BladeFindQueryType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'operator',
          ChoiceType::class,
          [
            'label' => false,
            'choices' => [
              'And' => 'AND',
              'Or' => 'OR',
            ],
          ]
        )->add(
          'not',
          ChoiceType::class,
          [
            'label' => false,
            'choices' => [
                // This single space is considered entering a value, but
                // will be normalized on submission to an empty string.
              'Has' => ' ',
              'Not' => 'NOT',
            ],
          ]
        )->add(
          'field',
          ChoiceType::class,
          [
            'label' => false,
              // These choice values should be the same as the field
              // they control.  When adding a new field, add it to the fields
              // list in bladeFind.js and BladeController::readableQuery.
            'choices' => [
              'Driver' => 'driver',
              'Active' => 'active',
              'Element' => 'element',
              'Role' => 'role',
              'Weapon class' => 'weaponClass',
              'Strength ≥' => 'strength',
              'Affinity %' => 'affinity',
              'Trust' => 'trust',
              'Rarity' => 'rarity',
              'Field skill' => 'fieldSkill',
              'Merc' => 'isMerc',
              'Releasable' => 'canBeReleased',
            ],
          ]
        )->add(
          'driver',
          EntityType::class,
          [
            'class' => Driver::class,
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'driver']),
            ],
          ]
        )->add(
          'active',
          ChoiceType::class,
          [
            'choices' => [
              'Yes' => true,
              'No' => false,
            ],
            'data' => true,
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'active']),
            ],
          ]
        )->add(
          'element',
          EntityType::class,
          [
            'class' => Element::class,
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'element']),
            ],
          ]
        )->add(
          'role',
          EntityType::class,
          [
            'class' => BattleRole::class,
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'role']),
            ],
          ]
        )->add(
          'weaponClass',
          EntityType::class,
          [
            'class' => WeaponClass::class,
            'label' => false,
            'required' => false,
            'constraints' => [
              new NotBlank(['groups' => 'weaponClass']),
            ],
          ]
        )->add(
          'strength',
          IntegerType::class,
          [
            'label' => false,
            'required' => false,
            'attr' => [
              'min' => 1,
              'max' => 1000,
            ],
            'constraints' => [
              new NotBlank(['groups' => 'strength']),
              new GreaterThanOrEqual(['value' => 1, 'groups' => 'strength']),
            ],
          ]
        )->add(
          'affinity',
          BladeFindQueryAffinityType::class,
          [
            'label' => false,
            'required' => false,
          ]
        )->add(
          'trust',
          BladeFindQueryTrustType::class,
          [
            'label' => false,
            'required' => false,
          ]
        )->add(
          'rarity',
          BladeFindQueryRarityType::class,
          [
            'label' => false,
            'required' => false,
          ]
        )->add(
          'fieldSkill',
          BladeFindQueryFieldSkillType::class,
          [
            'label' => false,
            'required' => false,
          ]
        )->add(
          'isMerc',
          ChoiceType::class,
          [
            'choices' => [
              'Yes' => true,
              'No' => false,
            ],
            'label' => false,
            'required' => false,
            'data' => true,
          ]
        )->add(
          'canBeReleased',
          ChoiceType::class,
          [
            'choices' => [
              'Yes' => true,
              'No' => false,
            ],
            'label' => false,
            'required' => false,
            'data' => true,
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'validation_groups' => [
              $this,
              'getValidationGroups',
            ],
          ]
        );
    }

    public function getValidationGroups(FormInterface $form)
    {
        /** @var FormInterface $field */
        $field = $form['field'];
        $fieldName = $field->getData();

        return [$fieldName];
    }
}
