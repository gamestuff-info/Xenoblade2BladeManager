<?php

namespace App\Form;

use App\Entity\Driver;
use App\Entity\Nation;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserProgressType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'nations',
          EntityType::class,
          [
            'class' => Nation::class,
            'multiple' => true,
            'expanded' => true,
            'required' => false,
          ]
        )->add(
          'drivers',
          EntityType::class,
          [
            'class' => Driver::class,
            'multiple' => true,
            'expanded' => true,
            'required' => false,
          ]
        )->add(
          'save',
          SubmitType::class
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
          [
            'data_class' => User::class,
          ]
        );
    }
}
