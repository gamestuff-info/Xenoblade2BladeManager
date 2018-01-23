<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BladeRepository")
 */
class Blade extends BladeSuperclass implements OwnedInterface
{

    /**
     * @var UserInterface
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    protected $user;

    protected $rarity = 1;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\GreaterThan(value=0)
     *
     * @Groups({"api"})
     */
    protected $strength = 1;

    /**
     * @var Driver
     *
     * @ORM\ManyToOne(targetEntity="Driver")
     */
    protected $driver;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\GreaterThanOrEqual(value="0")
     * @Assert\LessThanOrEqual(propertyPath="affinityTotal")
     *
     * @Groups({"api"})
     */
    protected $affinity = 0;

    protected $affinityTotal = 1;

    /**
     * @var TrustRank
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\TrustRank")
     */
    protected $trust;

    /**
     * @var MercMission|null
     *
     * @ORM\ManyToOne(targetEntity="MercMission", inversedBy="blades")
     */
    protected $mercMission;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean")
     *
     * @Groups({"api"})
     */
    protected $isMercLeader = false;

    /**
     * @var BladeTemplate|null
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\BladeTemplate")
     */
    protected $fromTemplate;

    /**
     * @return User
     */
    public function getUser(): UserInterface
    {
        return $this->user;
    }

    /**
     * @param UserInterface $user
     *
     * @return self
     */
    public function setUser(UserInterface $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return int
     */
    public function getStrength(): int
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
     * @return Driver
     */
    public function getDriver(): ?Driver
    {
        return $this->driver;
    }

    /**
     * @param Driver $driver
     *
     * @return self
     */
    public function setDriver(Driver $driver): self
    {
        $this->driver = $driver;

        return $this;
    }

    /**
     * @return int
     */
    public function getAffinityPercent(): int
    {
        return ($this->getAffinity() / $this->getAffinityTotal()) * 100;
    }

    /**
     * @return int
     */
    public function getAffinity(): int
    {
        return $this->affinity;
    }

    /**
     * @param int $affinity
     *
     * @return self
     */
    public function setAffinity(int $affinity): self
    {
        $this->affinity = $affinity;

        return $this;
    }

    /**
     * @return TrustRank
     */
    public function getTrust(): ?TrustRank
    {
        return $this->trust;
    }

    /**
     * @param TrustRank $trust
     *
     * @return self
     */
    public function setTrust(TrustRank $trust): self
    {
        $this->trust = $trust;

        return $this;
    }

    /**
     * @return MercMission|null
     */
    public function getMercMission(): ?MercMission
    {
        return $this->mercMission;
    }

    /**
     * @param MercMission|null $mercMission
     *
     * @return self
     */
    public function setMercMission(?MercMission $mercMission): self
    {
        $this->mercMission = $mercMission;

        return $this;
    }

    /**
     * @return bool
     */
    public function isMercLeader(): bool
    {
        return $this->isMercLeader;
    }

    /**
     * @param bool $isMercLeader
     *
     * @return self
     */
    public function setIsMercLeader(bool $isMercLeader): self
    {
        $this->isMercLeader = $isMercLeader;

        return $this;
    }

    /**
     * @return BladeTemplate
     */
    public function getFromTemplate(): ?BladeTemplate
    {
        return $this->fromTemplate;
    }

    /**
     * @param BladeTemplate|null $fromTemplate
     *
     * @return self
     */
    public function setFromTemplate(?BladeTemplate $fromTemplate): self
    {
        $this->fromTemplate = $fromTemplate;

        return $this;
    }
}
