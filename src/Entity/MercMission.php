<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MercMissionRepository")
 */
class MercMission
{

    use NameableTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"api"})
     */
    protected $id;

    /**
     * @var Nation
     *
     * @ORM\ManyToOne(targetEntity="Nation", inversedBy="mercMissions")
     */
    protected $nation;

    /**
     * @var Collection|MercMissionRequirement[]
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\MercMissionRequirement", cascade={"all"}, orphanRemoval=true)
     */
    protected $requirements;

    /**
     * @var Collection|MercMissionPrerequisite[]
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\MercMissionPrerequisite", orphanRemoval=true)
     */
    protected $prerequisites;

    /**
     * @var Collection|AffinityNode[]
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\AffinityNode", orphanRemoval=true)
     */
    protected $fieldSkills;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="time")
     *
     * @Groups({"api"})
     */
    protected $duration;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     *
     * @Groups({"api"})
     */
    protected $repeatable = true;

    /**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $mercPoints;

    /**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $experience;

    /**
     * @var int
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $gold;

    /**
     * @var Collection|Blade[]
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Blade", mappedBy="mercMission")
     */
    protected $blades;

    public function __construct()
    {
        $this->requirements = new ArrayCollection();
        $this->prerequisites = new ArrayCollection();
        $this->duration = new \DateTime('00:00');
        $this->blades = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Nation
     */
    public function getNation(): ?Nation
    {
        return $this->nation;
    }

    /**
     * @param Nation $nation
     *
     * @return self
     */
    public function setNation(Nation $nation): self
    {
        $this->nation = $nation;

        return $this;
    }

    /**
     * @return MercMissionRequirement[]|Collection
     */
    public function getRequirements()
    {
        return $this->requirements;
    }

    /**
     * @param \App\Entity\MercMissionRequirement[]|Collection $requirements
     *
     * @return self
     */
    public function setRequirements($requirements)
    {
        $this->requirements = $requirements;

        return $this;
    }

    /**
     * @param MercMissionRequirement $requirement
     *
     * @return self
     */
    public function addRequirement(MercMissionRequirement $requirement): self
    {
        if (!$this->requirements->contains($requirement)) {
            $this->requirements->add($requirement);
        }

        return $this;
    }

    /**
     * @param MercMissionRequirement $requirement
     *
     * @return self
     */
    public function removeRequirement(MercMissionRequirement $requirement): self
    {
        $this->requirements->removeElement($requirement);

        return $this;
    }

    /**
     * @return MercMissionPrerequisite[]|Collection
     */
    public function getPrerequisites()
    {
        return $this->prerequisites;
    }

    /**
     * @param \App\Entity\MercMissionPrerequisite[]|Collection $prerequisites
     *
     * @return self
     */
    public function setPrerequisites($prerequisites)
    {
        $this->prerequisites = $prerequisites;

        return $this;
    }

    /**
     * @param MercMissionPrerequisite $prerequisite
     *
     * @return self
     */
    public function addPrerequisite(MercMissionPrerequisite $prerequisite): self
    {
        if (!$this->prerequisites->contains($prerequisite)) {
            $this->prerequisites->add($prerequisite);
        }

        return $this;
    }

    /**
     * @param MercMissionPrerequisite $prerequisite
     *
     * @return self
     */
    public function removePrerequisite(MercMissionPrerequisite $prerequisite): self
    {
        $this->prerequisites->removeElement($prerequisite);

        return $this;
    }

    /**
     * @return AffinityNode[]|Collection
     */
    public function getFieldSkills()
    {
        return $this->fieldSkills;
    }

    /**
     * @param \App\Entity\AffinityNode[]|Collection $fieldSkills
     *
     * @return self
     */
    public function setFieldSkills($fieldSkills)
    {
        $this->fieldSkills = $fieldSkills;

        return $this;
    }

    /**
     * @param AffinityNode $affinityNode
     *
     * @return self
     */
    public function addFieldSkill(AffinityNode $affinityNode): self
    {
        if (!$this->fieldSkills->contains($affinityNode)) {
            $this->fieldSkills->add($affinityNode);
        }

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDuration(): ?\DateTime
    {
        return $this->duration;
    }

    /**
     * @param \DateTime $duration
     *
     * @return self
     */
    public function setDuration(\DateTime $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return bool
     */
    public function isRepeatable(): bool
    {
        return $this->repeatable;
    }

    /**
     * @param bool $repeatable
     *
     * @return self
     */
    public function setRepeatable(bool $repeatable): self
    {
        $this->repeatable = $repeatable;

        return $this;
    }

    /**
     * @return int
     */
    public function getMercPoints(): ?int
    {
        return $this->mercPoints;
    }

    /**
     * @param int $mercPoints
     *
     * @return self
     */
    public function setMercPoints(?int $mercPoints): self
    {
        $this->mercPoints = $mercPoints;

        return $this;
    }

    /**
     * @return int
     */
    public function getExperience(): ?int
    {
        return $this->experience;
    }

    /**
     * @param int $experience
     *
     * @return self
     */
    public function setExperience(?int $experience): self
    {
        $this->experience = $experience;

        return $this;
    }

    /**
     * @return int
     */
    public function getGold(): ?int
    {
        return $this->gold;
    }

    /**
     * @param int $gold
     *
     * @return self
     */
    public function setGold(?int $gold): self
    {
        $this->gold = $gold;

        return $this;
    }
}
