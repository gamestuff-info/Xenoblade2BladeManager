<?php

namespace App\Validator\Constraints;

use App\Entity\OwnedInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class OwnedValidator extends ConstraintValidator
{

    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param OwnedInterface $value
     * @param Owned|Constraint $constraint
     */
    public function validate($value, Constraint $constraint)
    {
        $user = $this->tokenStorage->getToken()->getUser();

        if ($value->getUser() !== $user) {
            if (method_exists($value, '__toString')) {
                $stringValue = (string)$value;
            } else {
                $stringValue = 'object';
            }
            $this->context->buildViolation($constraint->message)
              ->setParameter('{{ value }}', $stringValue)
              ->addViolation();
        }
    }
}
