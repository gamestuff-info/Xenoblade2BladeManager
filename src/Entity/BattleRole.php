<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BattleRoleRepository")
 */
class BattleRole implements InitializableInterface
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
     * Get initial battle roles
     *
     * @return Collection|self[]
     */
    public static function init(): Collection
    {
        $battleRoles = new ArrayCollection();

        $battleRoleNames = [
          'ATK',
          'TNK',
          'HLR',
        ];
        foreach ($battleRoleNames as $battleRoleName) {
            $battleRoles->add((new self())->setName($battleRoleName));
        }

        return $battleRoles;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }
}
