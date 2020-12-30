<?php

namespace App\Repository;

use App\Entity\BladeTemplate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class BladeTemplateRepository extends ServiceEntityRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BladeTemplate::class);
    }

    /**
     * Finds entities by a set of criteria.
     *
     * @param array $criteria
     * @param array|null $orderBy
     * @param int|null $limit
     * @param int|null $offset
     *
     * @return array The objects.
     */
    public function findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
    {
        if (is_null($orderBy)) {
            $orderBy = [
              'name' => 'ASC',
            ];
        }

        return parent::findBy($criteria, $orderBy, $limit, $offset);
    }
}
