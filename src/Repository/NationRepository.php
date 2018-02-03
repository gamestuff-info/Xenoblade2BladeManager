<?php

namespace App\Repository;

use App\Entity\Nation;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class NationRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Nation::class);
    }

    /**
     * @param User $user
     *
     * @return Nation[]
     */
    public function findNationsForUser(User $user)
    {
        $qb = $this->createQueryBuilder('nation');
        $qb->join(User::class, 'user', 'WITH', 'user = :user')
          ->where('nation MEMBER OF user.nations')
          ->setParameter('user', $user);
        $q = $qb->getQuery();
        $results = $q->execute();

        return $results;
    }
}
