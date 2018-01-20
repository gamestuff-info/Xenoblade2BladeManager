<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\WeaponClassRepository")
 */
class WeaponClass implements InitializableInterface
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
     * Get initial weapon classes
     *
     * @return Collection|self[]
     */
    public static function init(): Collection
    {
        $weaponClasses = new ArrayCollection();

        $weaponClassNames = [
          'Aegis Sword',
          'Aqua Scimitar',
          'Big Bang Edge',
          'Bitball',
          'Chrome Katana',
          'Drill Shield',
          'Dual Blades',
          'Dual Scythes',
          'Ether Cannon',
          'Greataxe',
          'Knuckle Claws',
          'Mech Arms',
          'Megalance',
          'Shield Arms',
          'Shield Hammer',
          'Twin Rings',
          'Variable Saber',
          'Whipswords',
        ];
        foreach ($weaponClassNames as $weaponClassName) {
            $weaponClasses->add((new self())->setName($weaponClassName));
        }

        return $weaponClasses;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }
}
