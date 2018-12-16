<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class MercMissionRequirementWeaponClass extends MercMissionRequirement
{

    /**
     * @var WeaponClass
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\WeaponClass")
     */
    protected $weaponClass;

    /**
     * @return WeaponClass
     */
    public function getWeaponClass(): ?WeaponClass
    {
        return $this->weaponClass;
    }

    /**
     * @param WeaponClass $weaponClass
     *
     * @return self
     */
    public function setWeaponClass(WeaponClass $weaponClass): self
    {
        $this->weaponClass = $weaponClass;

        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->weaponClass->getName();
    }
}
