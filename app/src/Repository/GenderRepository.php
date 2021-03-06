<?php

namespace App\Repository;

use App\Entity\Gender;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class GenderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gender::class);
    }

    /*
    public function findBySomething($value)
    {
        return $this->createQueryBuilder('g')
            ->where('g.something = :value')->setParameter('value', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
}
