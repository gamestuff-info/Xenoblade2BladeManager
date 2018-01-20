<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;

interface InitializableInterface
{

    /**
     * Get initial entities.
     *
     * @return Collection|self[]
     */
    public static function init(): Collection;
}
