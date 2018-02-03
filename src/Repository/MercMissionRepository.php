<?php

namespace App\Repository;

use App\Entity\MercMission;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class MercMissionRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MercMission::class);
    }

    /**
     * @param UserInterface $user
     *
     * @return MercMission[]
     */
    public function findActiveMissions(UserInterface $user)
    {
        $qb = $this->createQueryBuilder('merc_mission');
        $qb->join('merc_mission.blades', 'blades')
          ->where('blades.user = :user')
          ->setParameter('user', $user);
        $q = $qb->getQuery();
        $results = $q->execute();

        return $results;
    }

    /**
     * @param User $user
     *
     * @return MercMission[]
     */
    public function findMissionsForUser(User $user)
    {
        $qb = $this->createQueryBuilder('merc_mission');
        $qb->join(User::class, 'user', 'WITH', 'user = :user')
          ->where('merc_mission.nation MEMBER OF user.nations')
          ->setParameter('user', $user);
        $q = $qb->getQuery();
        $results = $q->execute();

        return $results;
    }
}
