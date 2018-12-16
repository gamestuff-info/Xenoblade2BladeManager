<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class BladeAffinityNode
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"api"})
     */
    private $id;

    /**
     * @var BladeSuperclass
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\BladeSuperclass", inversedBy="affinityNodes",
     *   cascade={"persist"})
     * @Assert\NotNull()
     */
    private $blade;

    /**
     * @var AffinityNode
     *
     * @ORM\ManyToOne(targetEntity="AffinityNode")
     * @Assert\NotNull()
     */
    private $affinityNode;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\GreaterThanOrEqual(0)
     * @Assert\LessThanOrEqual(propertyPath="maxLevel")
     *
     * @Groups({"api"})
     */
    private $level = 0;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\Range(min=1, max=5)
     *
     * @Groups({"api"})
     */
    private $maxLevel = 3;

    /**
     * @return BladeSuperclass|Blade|BladeTemplate
     */
    public function getBlade(): ?BladeSuperclass
    {
        return $this->blade;
    }

    /**
     * @param BladeSuperclass $blade
     *
     * @return self
     */
    public function setBlade(?BladeSuperclass $blade): self
    {
        $this->blade = $blade;

        return $this;
    }

    /**
     * @return AffinityNode
     */
    public function getAffinityNode(): ?AffinityNode
    {
        return $this->affinityNode;
    }

    /**
     * @param AffinityNode $affinityNode
     *
     * @return self
     */
    public function setAffinityNode(AffinityNode $affinityNode): self
    {
        $this->affinityNode = $affinityNode;

        return $this;
    }

    /**
     * @return int
     */
    public function getLevel(): int
    {
        return $this->level;
    }

    /**
     * @param int $level
     *
     * @return self
     */
    public function setLevel(int $level): self
    {
        $this->level = $level;

        return $this;
    }

    /**
     * @return int
     */
    public function getMaxLevel(): int
    {
        return $this->maxLevel;
    }

    /**
     * @param int $maxLevel
     *
     * @return self
     */
    public function setMaxLevel(int $maxLevel): self
    {
        $this->maxLevel = $maxLevel;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     *
     * @return self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }
}
