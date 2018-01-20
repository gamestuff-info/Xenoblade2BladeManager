<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MercMissionPrerequisiteRepository")
 */
class MercMissionPrerequisite
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
