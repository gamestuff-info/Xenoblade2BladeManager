<?php

namespace App\Repository;

use App\Entity\Blade;
use App\Entity\Driver;
use App\Entity\MercMission;
use App\Entity\MercMissionRequirementClass;
use App\Entity\MercMissionRequirementElement;
use App\Entity\MercMissionRequirementFieldSkill;
use App\Entity\MercMissionRequirementGender;
use App\Entity\MercMissionRequirementStrength;
use App\Entity\MercMissionRequirementWeaponClass;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class BladeRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Blade::class);
    }

    /**
     * Find blades belong to the given driver.
     *
     * @param UserInterface $user
     * @param Driver $driver
     *
     * @return Blade[]
     */
    public function findDriverBlades(UserInterface $user, Driver $driver)
    {
        $qb = $this->createQueryBuilder('blade');
        $qb->where('blade.user = :user')
          ->andWhere('blade.driver = :driver')
          ->orderBy('blade.name')
          ->setParameters(['user' => $user, 'driver' => $driver]);
        $q = $qb->getQuery();
        $result = $q->execute();

        return $result;
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

    /**
     * Find the ideal blades for the given Merc Mission.
     *
     * This will find blades that fit this criteria, in this order:
     * - Has both requirements and recommended field skills (A List)
     * - Has requirements (B List)
     * - Has recommended field skills (C List)
     * - All others (D List)
     *
     * This list does not include Blades already assigned to a Merc Mission.
     *
     * @param UserInterface $user
     * @param MercMission $mercMission
     *
     * @return array
     *   A multidimensional list of four arrays.  The keys are A, B, C, and D;
     *   these correspond to the lists above.
     */
    public function findBladesForMercMission(UserInterface $user, MercMission $mercMission)
    {
        $results = [
          'a' => [],
          'b' => [],
          'c' => [],
          'd' => [],
          'all' => [],
        ];

        // All list
        $allQb = $this->createQueryBuilder('blade');
        $allQb->join('blade.affinityNodes', 'affinityNodes')
          ->join('blade.gender', 'gender')
          ->where('blade.user = :user')
          ->andWhere('blade.isMerc = true')
          ->setParameter('user', $user);
        $allQ = $allQb->getQuery();
        $results['all'] = $allQ->execute();

        // A List
        $aQb = clone $allQb;
        $aQb->andWhere(
          $aQb->expr()
            ->orX(...$this->mercMissionRequirements($mercMission, $aQb))
        )->andWhere(
          $aQb->expr()
            ->orX(...$this->mercMissionFieldSkills($mercMission, $aQb))
        );
        $aQ = $aQb->getQuery();
        $results['a'] = $aQ->execute();

        // B List
        $bQb = clone $allQb;
        $bQb->andWhere(
          $bQb->expr()
            ->orX(...$this->mercMissionRequirements($mercMission, $bQb))
        )->andWhere(
          $bQb->expr()
            ->andX(...$this->mercMissionFieldSkills($mercMission, $bQb, true))
        );
        $bQ = $bQb->getQuery();
        $results['b'] = $bQ->execute();

        // C List
        $cQb = clone $allQb;
        $cQb->andWhere(
          $cQb->expr()
            ->orX(...$this->mercMissionFieldSkills($mercMission, $cQb))
        )->andWhere(
          $cQb->expr()
            ->andX(...$this->mercMissionRequirements($mercMission, $cQb, true))
        );
        $cQ = $cQb->getQuery();
        $results['c'] = $cQ->execute();

        // D List
        $dQb = clone $allQb;
        $dQb->andWhere(
          $dQb->expr()
            ->andX(...$this->mercMissionRequirements($mercMission, $dQb, true))
        )->andWhere(
          $dQb->expr()
            ->andX(...$this->mercMissionFieldSkills($mercMission, $dQb, true))
        );
        $dQ = $dQb->getQuery();
        $results['d'] = $dQ->execute();

        return $results;
    }

    /**
     * @param UserInterface $user
     * @param MercMission $mercMission
     *
     * @return Blade[]
     */
    public function findBladesOnMercMission(UserInterface $user, MercMission $mercMission)
    {
        $qb = $this->createQueryBuilder('blade');
        $qb->where('blade.user = :user')
          ->andWhere('blade.mercMission = :mercMission')
          ->setParameter('user', $user)
          ->setParameter('mercMission', $mercMission);
        $q = $qb->getQuery();
        $results = $q->execute();

        return $results;
    }

    /**
     * Get Merc Mission requirements as expressions to add to the query builder.
     *
     * @param MercMission $mercMission
     * @param QueryBuilder $qb
     *   This query builder will have the correct query parameters added to it.
     *   It must have these aliases defined:
     *   - blade: The root blade table
     *   - affinityNodes: blade.affinityNodes
     *   - gender: blade.gender
     * @param bool $not
     *   Set to true to invert the conditions (e.g. equals becomes not equals).
     *
     * @return Expr[]
     */
    private function mercMissionRequirements(MercMission $mercMission, QueryBuilder &$qb, bool $not = false): array
    {
        $requirementsExpr = [];
        // Expression for testing equality.
        $eq = $not ? 'neq' : 'eq';
        // Expression for testing exceeds limit.
        $gte = $not ? 'lt' : 'gte';
        foreach ($mercMission->getRequirements() as $index => $requirement) {
            $requirementParam = 'requirement_'.$index;
            if ($requirement instanceof MercMissionRequirementClass) {
                $requirementsExpr[] = $qb->expr()
                  ->$eq(
                    'gender.class', ':'.$requirementParam
                  );
                $qb->setParameter($requirementParam, $requirement->getClass());
            } elseif ($requirement instanceof MercMissionRequirementElement) {
                $requirementsExpr[] = $qb->expr()
                  ->$eq(
                    'blade.element', ':'.$requirementParam
                  );
                $qb->setParameter($requirementParam, $requirement->getElement());
            } elseif ($requirement instanceof MercMissionRequirementFieldSkill) {
                if ($not) {
                    $requirementsExpr[] = $qb->expr()
                      ->orX(
                        $qb->expr()
                          ->neq('affinityNodes.affinityNode', ':'.$requirementParam.'_1'),
                        $qb->expr()->andX(
                          $qb->expr()
                            ->eq('affinityNodes.affinityNode', ':'.$requirementParam.'_1'),
                          $qb->expr()
                            ->lt('affinityNodes.level', ':'.$requirementParam.'_2')
                        )
                      );
                } else {
                    $requirementsExpr[] = $qb->expr()
                      ->andX(
                        $qb->expr()
                          ->eq('affinityNodes.affinityNode', ':'.$requirementParam.'_1'),
                        $qb->expr()
                          ->gte('affinityNodes.level', ':'.$requirementParam.'_2')
                      );
                }
                $qb->setParameter($requirementParam.'_1', $requirement->getFieldSkill())
                  ->setParameter($requirementParam.'_2', $requirement->getLevel());
            } elseif ($requirement instanceof MercMissionRequirementGender) {
                $requirementsExpr[] = $qb->expr()
                  ->$eq(
                    'blade.gender', ':'.$requirementParam
                  );
                $qb->setParameter($requirementParam, $requirement->getGender());
            } elseif ($requirement instanceof MercMissionRequirementStrength) {
                $requirementsExpr[] = $qb->expr()
                  ->$gte(
                    'blade.strength', ':'.$requirementParam
                  );
                $qb->setParameter($requirementParam, $requirement->getStrength());
            } elseif ($requirement instanceof MercMissionRequirementWeaponClass) {
                $requirementsExpr[] = $qb->expr()
                  ->$eq(
                    'blade.weaponClass', ':'.$requirementParam
                  );
                $qb->setParameter($requirementParam, $requirement->getWeaponClass());
            } else {
                throw new \LogicException(get_class($requirement).' is not a MercMissionRequirement.');
            }
        }

        return $requirementsExpr;
    }

    /**
     * Get Merc Mission field skill recommendations as expressions to add to the
     * query builder.
     *
     * @param MercMission $mercMission
     * @param QueryBuilder $qb
     *   This query builder will have the correct query parameters added to it.
     *   It must have these aliases defined:
     *   - blade: The root blade table
     *   - affinityNodes: blade.affinityNodes
     *   - gender: blade.gender
     * @param bool $not
     *   Set to true to invert the conditions (e.g. equals becomes not equals).
     *
     * @return Expr[]
     */
    private function mercMissionFieldSkills(MercMission $mercMission, QueryBuilder &$qb, bool $not = false)
    {
        $fieldSkillsExpr = [];
        // Expression for testing equality.
        $eq = $not ? 'neq' : 'eq';
        foreach ($mercMission->getFieldSkills() as $index => $fieldSkill) {
            $fieldSkillParam = 'field_skill_'.$index;
            $fieldSkillsExpr[] = $qb->expr()
              ->$eq(
                'affinityNodes.affinityNode', ':'.$fieldSkillParam
              );
            $qb->setParameter($fieldSkillParam, $fieldSkill);
        }

        return $fieldSkillsExpr;
    }
}
