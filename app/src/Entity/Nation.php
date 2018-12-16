<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NationRepository")
 */
class Nation
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
     * @var Collection|MercMission[]
     *
     * @ORM\OneToMany(targetEntity="MercMission", mappedBy="nation")
     */
    private $mercMissions;

    /**
     * Nation constructor.
     */
    public function __construct()
    {
        $this->mercMissions = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return MercMission[]|Collection
     */
    public function getMercMissions()
    {
        return $this->mercMissions;
    }

    /**
     * @param MercMission $mercMission
     *
     * @return Nation
     */
    public function addMercMission(MercMission $mercMission): self
    {
        $this->mercMissions->add($mercMission);
        $mercMission->setNation($this);

        return $this;
    }
}
