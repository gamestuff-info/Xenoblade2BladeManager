<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ElementRepository")
 */
class Element implements InitializableInterface
{

    use NameableTrait;

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"api"})
     */
    private $id;

    /**
     * Get initial elements
     *
     * @return Collection|self[]
     */
    public static function init(): Collection
    {
        $elements = new ArrayCollection();

        $elementNames = [
          'Fire',
          'Water',
          'Ice',
          'Wind',
          'Earth',
          'Electric',
          'Light',
          'Dark',
        ];
        foreach ($elementNames as $elementName) {
            $elements->add((new self())->setName($elementName));
        }

        return $elements;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }
}
