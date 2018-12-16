<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class MercMissionRequirementClass extends MercMissionRequirement
{

    /**
     * @var BladeClass
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\BladeClass")
     */
    protected $class;

    /**
     * @return BladeClass
     */
    public function getClass(): ?BladeClass
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
     * @return string
     */
    public function getName(): string
    {
        return $this->class->getName();
    }
}
