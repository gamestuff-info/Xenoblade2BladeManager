<?php

namespace App\Repository;

use App\Entity\Driver;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class DriverRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Driver::class);
    }

    /**
     * @param User $user
     *
     * @return Driver[]
     */
    public function findDriversForUser(User $user)
    {
        $qb = $this->createQueryBuilder('driver');
        $qb->join(User::class, 'user', 'WITH', 'user = :user')
          ->where('driver MEMBER OF user.drivers')
          ->setParameter('user', $user);
        $q = $qb->getQuery();
        $results = $q->execute();

        return $results;
    }
}
