<?php


namespace App\Entity;


use Symfony\Component\Security\Core\User\UserInterface;

interface OwnedInterface
{

    /**
     * Get the user that owns this entity.
     *
     * @return UserInterface
     */
    public function getUser(): UserInterface;
}
