<?php

namespace App\Tests\Entity;

use App\Entity\Role;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{

    public function testGetRoles()
    {
        $roleNames = [
          'Test Role 1',
          'Test Role 2',
          'Test Role 3',
        ];
        $user = (new User());
        foreach ($roleNames as $roleName) {
            $role = (new Role())->setName($roleName);
            $user->addRole($role);
        }

        self::assertEquals($roleNames, $user->getRoles());
    }

    public function testNewActivateCode()
    {
        $user = (new User())->activate();
        $activateCode = $user->newActivateCode();
        self::assertFalse($user->isActive());
        self::assertEquals($activateCode, $user->getActivateCode());
    }
}
