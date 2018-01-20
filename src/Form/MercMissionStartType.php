<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MercMissionStartType extends AbstractType
{

    /**
     * @var \Twig_Environment
     */
    protected $twig;

    public function __construct(\Twig_Environment $twig)
    {
        $this->twig = $twig;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
          'blades',
          HiddenType::class
        )->add(
          'leader',
          HiddenType::class
        )->add(
          'submit',
          SubmitType::class,
          [
            'label' => 'Start',
            'attr' => [
                // The start button starts disabled because there are no Blades
                // assigned.  It will later rbe enabled on the client-side.
              'disabled' => true,
            ],
          ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([]);
    }
}
