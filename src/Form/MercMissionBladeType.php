<?php

namespace App\Form;

use App\Entity\MercMissionBlade;
use App\Form\DataTransformer\BladeToIdTransformer;
use App\Validator\Constraints\Owned;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionBladeType extends AbstractType
{

    /**
     * @var BladeToIdTransformer
     */
    protected $bladeToIdTransformer;

    public function __construct(BladeToIdTransformer $bladeToIdTransformer)
    {
        $this->bladeToIdTransformer = $bladeToIdTransformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'blade',
          HiddenType::class,
          [
            'constraints' => [new Owned()],
          ]
        )->add(
          'leader',
          RadioType::class,
          [
            'attr' => [
              'class' => 'mission-leader',
            ],
            'required' => false,
          ]
        )->add(
          'remove',
          ButtonType::class,
          [
            'attr' => [
              'type' => 'button',
              'class' => 'btn-danger form-control',
            ],
            'label' => 'Remove',
          ]
        );

        $builder->get('blade')->addModelTransformer($this->bladeToIdTransformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['label' => false]);
    }
}
