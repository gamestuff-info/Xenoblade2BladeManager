<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class MercMissionRequirementStrength extends MercMissionRequirement
{

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     */
    protected $strength;

    /**
     * @return int
     */
    public function getStrength(): ?int
    {
        return $this->strength;
    }

    /**
     * @param int $strength
     *
     * @return self
     */
    public function setStrength(int $strength): self
    {
        $this->strength = $strength;

        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return sprintf('Strength %u+', $this->strength);
    }
}
