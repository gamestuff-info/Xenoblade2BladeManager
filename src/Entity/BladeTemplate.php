<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BladeTemplateRepository")
 */
class BladeTemplate extends BladeSuperclass
{

    protected $rarity = 5;

    protected $affinityTotal = 44;

    /**
     * @var string
     *
     * @ORM\Column(type="string", unique=true)
     * @Gedmo\Slug(fields={"name"})
     */
    private $slug;

    /**
     * @return string
     */
    public function getSlug(): ?string
    {
        return $this->slug;
    }

    /**
     * @param string $slug
     *
     * @return self
     */
    public function setSlug(?string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Convert this template to a full Blade.
     *
     * @return Blade
     */
    public function toBlade(): Blade
    {
        $blade = new Blade();
        $blade->setFromTemplate($this)
          ->setName($this->getName())
          ->setIsMerc($this->isMerc)
          ->setMercTeamName($this->mercTeamName)
          ->setElement($this->element)
          ->setGender($this->gender)
          ->setBattleRole($this->battleRole)
          ->setWeaponClass($this->weaponClass)
          ->setRarity($this->rarity)
          ->setAffinityTotal($this->affinityTotal)
          ->setCanBeReleased($this->canBeReleased);
        // Duplicate the affinity node entities for the new "Real" blade.
        foreach ($this->affinityNodes as $affinityNode) {
            $newAffinityNode = clone $affinityNode;
            $newAffinityNode->setId(null)->setBlade($blade);
            $blade->addAffinityNode($newAffinityNode);
        }

        return $blade;
    }
}
