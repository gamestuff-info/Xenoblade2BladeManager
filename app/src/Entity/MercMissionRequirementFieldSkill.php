<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class MercMissionRequirementFieldSkill extends MercMissionRequirement
{

    /**
     * @var AffinityNode
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\AffinityNode")
     */
    protected $fieldSkill;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     */
    protected $level;

    /**
     * @return AffinityNode
     */
    public function getFieldSkill(): ?AffinityNode
    {
        return $this->fieldSkill;
    }

    /**
     * @param AffinityNode $fieldSkill
     *
     * @return self
     */
    public function setFieldSkill(AffinityNode $fieldSkill): self
    {
        $this->fieldSkill = $fieldSkill;

        return $this;
    }

    /**
     * @return int
     */
    public function getLevel(): ?int
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
     * @return string
     */
    public function getName(): string
    {
        return sprintf('%s Lv. %u+', $this->fieldSkill->getName(), $this->level);
    }
}
