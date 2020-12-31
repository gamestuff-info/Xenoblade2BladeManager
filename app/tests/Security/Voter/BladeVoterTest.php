<?php

namespace App\Tests\Security\Voter;

use App\Entity\Blade;
use App\Entity\Role;
use App\Entity\User;
use App\Security\Voter\BladeVoter;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class BladeVoterTest extends TestCase
{

    /**
     * @var AccessDecisionManagerInterface
     */
    protected $decisionManager;

    /**
     * @var UserInterface
     */
    protected $currentUser;

    /**
     * @var UserInterface
     */
    protected $otherUser;

    /**
     * @var TokenInterface
     */
    protected $token;

    public function setUp(): void
    {
        parent::setUp();

        $roleUser = (new Role())->setName('ROLE_USER');
        $this->currentUser = (new User())
          ->setEmail('user1@example.com')
          ->addRole($roleUser);
        $this->otherUser = (new User())
          ->setEmail('user2@example.com')
          ->addRole($roleUser);
        $tokenMock = self::createMock(TokenInterface::class);
        $tokenMock->method('getUser')->willReturn($this->currentUser);
        $this->token = $tokenMock;

        $decisionManager = self::createMock(AccessDecisionManagerInterface::class);
        $this->decisionManager = $decisionManager;
    }

    /**
     * Test access checking on Blades.
     *
     * @dataProvider bladeDataProvider
     *
     * @param $attribute
     * @param $entity
     * @param $result
     */
    public function testVote($attribute, $entity, $result)
    {
        $bladeVoter = new BladeVoter($this->decisionManager);
        self::assertEquals($result, $bladeVoter->vote($this->token, $entity, [$attribute]));
    }

    public function bladeDataProvider()
    {
        $roleUser = (new Role())->setName('ROLE_USER');
        $this->currentUser = (new User())
          ->setEmail('user1@example.com')
          ->addRole($roleUser);
        $this->otherUser = (new User())
          ->setEmail('user2@example.com')
          ->addRole($roleUser);
        $ownedBlade = (new Blade())
          ->setUser($this->currentUser);
        $otherBlade = (new Blade())
          ->setUser($this->otherUser);

        return [
          'edit/allowed' => [
            'EDIT',
            $ownedBlade,
            VoterInterface::ACCESS_GRANTED,
          ],
          'edit/disallowed' => [
            'EDIT',
            $otherBlade,
            VoterInterface::ACCESS_DENIED,
          ],
          'delete/allowed' => [
            'DELETE',
            $ownedBlade,
            VoterInterface::ACCESS_GRANTED,
          ],
          'delete/disallowed' => [
            'DELETE',
            $otherBlade,
            VoterInterface::ACCESS_DENIED,
          ],
          'view/allowed' => [
            'VIEW',
            $ownedBlade,
            VoterInterface::ACCESS_GRANTED,
          ],
          'view/disallowed' => [
            'VIEW',
            $otherBlade,
            VoterInterface::ACCESS_DENIED,
          ],
        ];
    }
}
