<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class MercMissionRequirementElement extends MercMissionRequirement
{

    /**
     * @var Element
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Element")
     */
    protected $element;

    /**
     * @return Element
     */
    public function getElement():? Element
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
     * @return string
     */
    public function getName(): string
    {
        return $this->element->getName();
    }
}
