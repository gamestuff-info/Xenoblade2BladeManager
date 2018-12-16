<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class Owned extends Constraint
{

    public $message = 'This user does not own {{ value }}.';

    public function validatedBy()
    {
        return OwnedValidator::class;
    }
}
