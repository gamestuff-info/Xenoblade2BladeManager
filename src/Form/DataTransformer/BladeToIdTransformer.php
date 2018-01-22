<?php


namespace App\Form\DataTransformer;


use App\Entity\Blade;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class BladeToIdTransformer implements DataTransformerInterface
{

    /**
     * @var EntityManagerInterface
     */
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @param Blade|null $value
     *
     * @return string|int
     */
    public function transform($value)
    {
        if (is_null($value)) {
            return '';
        } else {
            return $value->getId();
        }
    }

    /**
     * @param mixed $value
     *
     * @return Blade|null
     */
    public function reverseTransform($value)
    {
        if ($value == '') {
            return null;
        }

        $blade = $this->em->getRepository(Blade::class)->find($value);

        if (is_null($blade)) {
            throw new TransformationFailedException(sprintf('There is no blade with id %s.', $value));
        }

        return $blade;
    }
}
