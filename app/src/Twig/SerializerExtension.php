<?php

namespace App\Twig;

use Symfony\Component\Serializer\SerializerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class SerializerExtension extends AbstractExtension
{

    /**
     * @var SerializerInterface
     */
    protected $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function getFilters(): array
    {
        return [
          new TwigFilter('serialize', [$this, 'serialize']),
        ];
    }

    public function serialize($value, $format = 'json', $context = [])
    {
        return $this->serializer->serialize($value, $format, $context);
    }
}
