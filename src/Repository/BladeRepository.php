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
        $allParams = ['user' => $user];
        $allQb = $this->createQueryBuilder('bladeList');
        $allQb->where('bladeList.user = :user')
          ->andWhere('bladeList.isMerc = true')
          ->setParameters($allParams);
        $allQ = $allQb->getQuery();
        $results['all'] = $allQ->execute();

        // Blades with requirements
        $reqParams = [];
        $reqQb = $this->createQueryBuilder('bladeReq');
        $reqQb->join('bladeReq.affinityNodes', 'affinityNodesReq')
          ->join('bladeReq.gender', 'genderReq')
          ->andWhere(
            $reqQb->expr()->orX(...$this->mercMissionRequirements($mercMission, $reqQb, 'Req', $reqParams))
          );

        // Blades with field skills
        $fieldSkillParams = [];
        $fieldSkillQb = $this->createQueryBuilder('bladeFieldSkill');
        $fieldSkillQb->join('bladeFieldSkill.affinityNodes', 'affinityNodesFieldSkill')
          ->join('bladeFieldSkill.gender', 'genderFieldSkill')
          ->andWhere(
            $fieldSkillQb->expr()->orX(...$this->mercMissionFieldSkills($mercMission, $fieldSkillQb, 'FieldSkill', $fieldSkillParams))
          );

        // A List
        $aQb = clone $allQb;
        // Have to check if there are requirements/field skills or this will
        // generate an invalid query.
        if (!$mercMission->getRequirements()->isEmpty()) {
            $aQb->andWhere($aQb->expr()->in('bladeList', $reqQb->getDQL()));
        }
        if (!$mercMission->getFieldSkills()->isEmpty()) {
            $aQb->andWhere($aQb->expr()->in('bladeList', $fieldSkillQb->getDQL()));
        }
        $aQb->setParameters(array_merge($allParams, $reqParams, $fieldSkillParams));
        $aQ = $aQb->getQuery();
        $results['a'] = $aQ->execute();

        // B List
        $bQb = clone $allQb;
        if (!$mercMission->getRequirements()->isEmpty()) {
            $bQb->andWhere($bQb->expr()->in('bladeList', $reqQb->getDQL()));
        }
        if (!$mercMission->getFieldSkills()->isEmpty()) {
            $bQb->andWhere($bQb->expr()->notIn('bladeList', $fieldSkillQb->getDQL()));
        }
        $bQb->setParameters(array_merge($allParams, $reqParams, $fieldSkillParams));
        $bQ = $bQb->getQuery();
        $results['b'] = $bQ->execute();

        // C List
        $cQb = clone $allQb;
        if (!$mercMission->getRequirements()->isEmpty()) {
            $cQb->andWhere($cQb->expr()->notIn('bladeList', $reqQb->getDQL()));
        }
        if (!$mercMission->getFieldSkills()->isEmpty()) {
            $cQb->andWhere($cQb->expr()->in('bladeList', $fieldSkillQb->getDQL()));
        }
        $cQb->setParameters(array_merge($allParams, $reqParams, $fieldSkillParams));
        $cQ = $cQb->getQuery();
        $results['c'] = $cQ->execute();

        // D List
        $dQb = clone $allQb;
        if (!$mercMission->getRequirements()->isEmpty()) {
            $dQb->andWhere($dQb->expr()->notIn('bladeList', $reqQb->getDQL()));
        }
        if (!$mercMission->getFieldSkills()->isEmpty()) {
            $dQb->andWhere($dQb->expr()->notIn('bladeList', $fieldSkillQb->getDQL()));
        }
        $dQb->setParameters(array_merge($allParams, $reqParams, $fieldSkillParams));
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
     * @param string $suffix
     *   The suffix to append to table names to ensure their uniqueness
     * @param array $parameters
     *   Query parameters to add to all queries using this result.
     *
     * @return Expr[]
     */
    private function mercMissionRequirements(MercMission $mercMission, QueryBuilder &$qb, string $suffix, array &$parameters): array
    {
        $requirementsExpr = [];
        foreach ($mercMission->getRequirements() as $index => $requirement) {
            $requirementParam = 'requirement_'.$index;
            if ($requirement instanceof MercMissionRequirementClass) {
                $requirementsExpr[] = $qb->expr()
                  ->eq(
                    "gender$suffix.class", ':'.$requirementParam
                  );
                $parameters[$requirementParam] = $requirement->getClass();
            } elseif ($requirement instanceof MercMissionRequirementElement) {
                $requirementsExpr[] = $qb->expr()
                  ->eq(
                    "blade$suffix.element", ':'.$requirementParam
                  );
                $parameters[$requirementParam] = $requirement->getElement();
            } elseif ($requirement instanceof MercMissionRequirementFieldSkill) {
                $requirementsExpr[] = $qb->expr()
                  ->andX(
                    $qb->expr()
                      ->eq("affinityNodes$suffix.affinityNode", ':'.$requirementParam.'_1'),
                    $qb->expr()
                      ->gte("affinityNodes$suffix.level", ':'.$requirementParam.'_2')
                  );
                $parameters[$requirementParam.'_1'] = $requirement->getFieldSkill();
                $parameters[$requirementParam.'_2'] = $requirement->getLevel();
            } elseif ($requirement instanceof MercMissionRequirementGender) {
                $requirementsExpr[] = $qb->expr()
                  ->eq(
                    "blade$suffix.gender", ':'.$requirementParam
                  );
                $parameters[$requirementParam] = $requirement->getGender();
            } elseif ($requirement instanceof MercMissionRequirementStrength) {
                $requirementsExpr[] = $qb->expr()
                  ->gte(
                    "blade$suffix.strength", ':'.$requirementParam
                  );
                $parameters[$requirementParam] = $requirement->getStrength();
            } elseif ($requirement instanceof MercMissionRequirementWeaponClass) {
                $requirementsExpr[] = $qb->expr()
                  ->eq(
                    "blade$suffix.weaponClass", ':'.$requirementParam
                  );
                $parameters[$requirementParam] = $requirement->getWeaponClass();
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
     * @param string $suffix
     *   The suffix to append to table names to ensure their uniqueness
     * @param array $parameters
     *   Query parameters to add to all queries using this result.
     *
     * @return Expr[]
     */
    private function mercMissionFieldSkills(MercMission $mercMission, QueryBuilder &$qb, string $suffix, array &$parameters)
    {
        $fieldSkillsExpr = [];
        foreach ($mercMission->getFieldSkills() as $index => $fieldSkill) {
            $fieldSkillParam = 'field_skill_'.$index;
            $fieldSkillsExpr[] = $qb->expr()
              ->eq(
                "affinityNodes$suffix.affinityNode", ':'.$fieldSkillParam
              );
            $parameters[$fieldSkillParam] = $fieldSkill;
        }

        return $fieldSkillsExpr;
    }
}
