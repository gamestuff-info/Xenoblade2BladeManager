<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class MercMissionRequirementGender extends MercMissionRequirement
{

    /**
     * @var Gender
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Gender")
     */
    protected $gender;

    /**
     * @return Gender
     */
    public function getGender(): ?Gender
    {
        return $this->gender;
    }

    /**
     * @param Gender $gender
     *
     * @return self
     */
    public function setGender(Gender $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->gender->getName();
    }
}
