<?php

namespace App\Tests\Validator\Constraints;

use App\Entity\OwnedInterface;
use App\Entity\User;
use App\Validator\Constraints\Owned;
use App\Validator\Constraints\OwnedValidator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Symfony\Component\Validator\Violation\ConstraintViolationBuilderInterface;

class OwnedValidatorTest extends TestCase
{

    /**
     * @var UserInterface
     */
    protected $currentUser;

    /**
     * @var UserInterface
     */
    protected $otherUser;

    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    public function setUp(): void
    {
        parent::setUp();

        $this->currentUser = (new User())->setEmail('user1@test.com');
        $this->otherUser = (new User())->setEmail('user2@test.com');

        $tokenMock = self::createMock(TokenInterface::class);
        $tokenMock->method('getUser')->willReturn($this->currentUser);
        $tokenStorageMock = self::createMock(TokenStorageInterface::class);
        $tokenStorageMock->method('getToken')->willReturn($tokenMock);
        $this->tokenStorage = $tokenStorageMock;
    }

    /**
     * Test an owned entity is valid
     */
    public function testValidateValid()
    {
        $entity = self::createMock(OwnedInterface::class);
        $entity->method('getUser')->willReturn($this->currentUser);
        $context = self::createMock(ExecutionContextInterface::class);
        $context->expects(self::never())
          ->method('buildViolation');
        $constraint = new Owned();

        $validator = new OwnedValidator($this->tokenStorage);
        $validator->initialize($context);
        $validator->validate($entity, $constraint);
    }

    /**
     * Test an unowned entity is invalid
     */
    public function testValidateInvalid()
    {
        $entity = self::createMock(OwnedInterface::class);
        $entity->method('getUser')->willReturn($this->otherUser);
        $context = self::createMock(ExecutionContextInterface::class);
        $violationBuilder = self::createMock(ConstraintViolationBuilderInterface::class);
        $violationBuilder->method('setParameter')
          ->willReturnSelf();
        $context->expects(self::once())
          ->method('buildViolation')
          ->willReturn($violationBuilder);
        $constraint = new Owned();

        $validator = new OwnedValidator($this->tokenStorage);
        $validator->initialize($context);
        $validator->validate($entity, $constraint);
    }
}
