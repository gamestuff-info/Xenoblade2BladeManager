<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GenderRepository")
 */
class Gender
{

    use NameableTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"api"})
     */
    private $id;

    /**
     * @var BladeClass
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\BladeClass")
     */
    private $class;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     *
     * @Groups({"api"})
     */
    private $sort = 0;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return BladeClass
     */
    public function getClass(): BladeClass
    {
        return $this->class;
    }

    /**
     * @param BladeClass $class
     *
     * @return self
     */
    public function setClass(BladeClass $class): self
    {
        $this->class = $class;

        return $this;
    }

    /**
     * @return int
     */
    public function getSort(): int
    {
        return $this->sort;
    }

    /**
     * @param int $sort
     *
     * @return self
     */
    public function setSort(int $sort): self
    {
        $this->sort = $sort;

        return $this;
    }
}
