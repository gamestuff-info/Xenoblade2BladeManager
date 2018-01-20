<?php


namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 */
class BladeSuperclass
{

    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"api"})
     */
    protected $id;

    /**
     * @var Collection|BladeAffinityNode[]
     *
     * @ORM\OneToMany(targetEntity="BladeAffinityNode", mappedBy="blade", cascade={"all"}, orphanRemoval=true)
     */
    protected $affinityNodes;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean")
     *
     * @Groups({"api"})
     */
    protected $isMerc = true;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({"api"})
     */
    protected $mercTeamName;

    /**
     * @var Element
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Element")
     * @Assert\NotNull()
     */
    protected $element;

    /**
     * @var Gender
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Gender")
     * @Assert\NotNull()
     */
    protected $gender;

    /**
     * @var BattleRole
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\BattleRole")
     * @Assert\NotNull()
     */
    protected $battleRole;

    /**
     * @var WeaponClass
     *
     * @ORM\ManyToOne(targetEntity="WeaponClass")
     * @Assert\NotNull()
     */
    protected $weaponClass;

    /**
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *     min=1,
     *     max=5
     * )
     *
     * @Groups({"api"})
     */
    protected $rarity = 1;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Assert\GreaterThan(value=0)
     *
     * @Groups({"api"})
     */
    protected $affinityTotal;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean")
     *
     * @Groups({"api"})
     */
    protected $canBeReleased = true;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     *
     * @Groups({"api"})
     */
    private $name;

    /**
     * BladeSuperclass constructor.
     */
    public function __construct()
    {
        $this->affinityNodes = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getName() ?: '';
    }

    /**
     * @return string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     *
     * @return self
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Element
     */
    public function getElement(): ?Element
    {
        return $this->element;
    }

    /**
     * @param Element $element
     *
     * @return self
     */
    public function setElement(Element $element): self
    {
        $this->element = $element;

        return $this;
    }

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
     * @return BattleRole
     */
    public function getBattleRole(): ?BattleRole
    {
        return $this->battleRole;
    }

    /**
     * @param BattleRole $battleRole
     *
     * @return self
     */
    public function setBattleRole(BattleRole $battleRole): self
    {
        $this->battleRole = $battleRole;

        return $this;
    }

    /**
     * @return int
     */
    public function getRarity(): int
    {
        return $this->rarity;
    }

    /**
     * @param int $rarity
     *
     * @return self
     */
    public function setRarity(int $rarity): self
    {
        $this->rarity = $rarity;

        return $this;
    }

    /**
     * @return int
     */
    public function getAffinityTotal(): int
    {
        return $this->affinityTotal;
    }

    /**
     * @param int $affinityTotal
     *
     * @return self
     */
    public function setAffinityTotal(int $affinityTotal): self
    {
        $this->affinityTotal = $affinityTotal;

        return $this;
    }

    /**
     * @return BladeAffinityNode[]|Collection
     */
    public function getAffinityNodes()
    {
        return $this->affinityNodes;
    }

    /**
     * @param BladeAffinityNode[]|Collection $affinityNodes
     *
     * @return self
     */
    public function setAffinityNodes($affinityNodes): self
    {
        $this->affinityNodes = $affinityNodes;

        return $this;
    }

    /**
     * @param AffinityNode $affinityNode
     * @param int $level
     * @param int $maxLevel
     *
     * @return self
     */
    public function setAffinityNode(AffinityNode $affinityNode, int $level, int $maxLevel = 3): self
    {
        foreach ($this->affinityNodes as &$bladeAffinityNode) {
            if ($bladeAffinityNode->getAffinityNode()
                ->getId() == $affinityNode->getId()) {
                $bladeAffinityNode->setLevel($level);
                $bladeAffinityNode->setMaxLevel($maxLevel);

                return $this;
            }
        }

        $bladeAffinityNode = (new BladeAffinityNode())
          ->setBlade($this)
          ->setAffinityNode($affinityNode)
          ->setLevel($level)
          ->setMaxLevel($maxLevel);
        $this->affinityNodes->add($bladeAffinityNode);

        return $this;
    }

    /**
     * @param BladeAffinityNode $bladeAffinityNode
     *
     * @return self
     */
    public function addAffinityNode(BladeAffinityNode $bladeAffinityNode): self
    {
        if (!$this->affinityNodes->contains($bladeAffinityNode)) {
            $this->affinityNodes->add($bladeAffinityNode);
            $bladeAffinityNode->setBlade($this);
        }

        return $this;
    }

    /**
     * @param BladeAffinityNode $bladeAffinityNode
     *
     * @return self
     */
    public function removeAffinityNode(BladeAffinityNode $bladeAffinityNode): self
    {
        $this->affinityNodes->removeElement($bladeAffinityNode);

        return $this;
    }

    /**
     * @return bool
     */
    public function isMerc(): bool
    {
        return $this->isMerc;
    }

    /**
     * @param bool $isMerc
     *
     * @return self
     */
    public function setIsMerc(bool $isMerc): self
    {
        $this->isMerc = $isMerc;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getMercTeamName(): ?string
    {
        return $this->mercTeamName;
    }

    /**
     * @param string $mercTeamName
     *
     * @return self
     */
    public function setMercTeamName(?string $mercTeamName): self
    {
        $this->mercTeamName = $mercTeamName;

        return $this;
    }

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
     * @return bool
     */
    public function isCanBeReleased(): bool
    {
        return $this->canBeReleased;
    }

    /**
     * @param bool $canBeReleased
     *
     * @return self
     */
    public function setCanBeReleased(bool $canBeReleased): self
    {
        $this->canBeReleased = $canBeReleased;

        return $this;
    }
}
