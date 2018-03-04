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
use App\Entity\TrustRank;
use App\Entity\User;
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
     * @param UserInterface $user
     * @param array $searchQueries
     *
     * @return Blade[]
     */
    public function findBladesFromSearch(UserInterface $user, array $searchQueries)
    {
        $qb = $this->createQueryBuilder('blade')
          ->join('blade.user', 'user')
          ->join('blade.trust', 'trust')
          ->join('blade.affinityNodes', 'affinityNodes');

        $params = [];
        foreach ($searchQueries as $k => $searchQuery) {
            switch ($searchQuery['operator']) {
                case 'OR':
                    $where = 'orWhere';
                    break;
                case 'AND':
                default:
                    $where = 'andWhere';
            }

            // Create a list of operators.
            $not = $searchQuery['not'] == 'NOT';
            $eq = $not ? '!=' : '=';
            $gt = $not ? '<' : '>';
            $lt = $not ? '>' : '<';
            $gte = $not ? '<=' : '>=';
            $lte = $not ? '>=' : '<=';
            $in = $not ? 'NOT IN' : 'IN';
            $between = $not ? 'NOT BETWEEN' : 'BETWEEN';
            $memberOf = $not ? 'NOT MEMBER OF' : 'MEMBER OF';

            $paramName = sprintf('field_%s_%s', $k, $searchQuery['field']);
            switch ($searchQuery['field']) {
                case 'driver':
                    $qb->$where("blade.driver $eq :$paramName");
                    $params[$paramName] = $searchQuery['driver'];
                    break;
                case 'active':
                    $qb->$where("blade.driver $memberOf user.drivers");
                    break;
                case 'element':
                    $qb->$where("blade.element $eq :$paramName");
                    $params[$paramName] = $searchQuery['element'];
                    break;
                case 'role':
                    $qb->$where("blade.battleRole $eq :$paramName");
                    $params[$paramName] = $searchQuery['role'];
                    break;
                case 'weaponClass':
                    $qb->$where("blade.weaponClass $eq :$paramName");
                    $params[$paramName] = $searchQuery['weaponClass'];
                    break;
                case 'strength':
                    $qb->$where("blade.strength $gte :$paramName");
                    $params[$paramName] = $searchQuery['strength'];
                    break;
                case 'affinity':
                    $qb->$where("((blade.affinity / blade.affinityTotal) $gte :${paramName}_min AND (blade.affinity / blade.affinityTotal) $lte :${paramName}_max)");
                    $params["${paramName}_min"] = min($searchQuery['affinity']['min'], $searchQuery['affinity']['max']);
                    $params["${paramName}_max"] = max($searchQuery['affinity']['min'], $searchQuery['affinity']['max']);
                    break;
                case 'trust':
                    $qb->$where("trust.sort $between :${paramName}_min AND :${paramName}_max");
                    /** @var TrustRank $trustMin */
                    $trustMin = $searchQuery['trust']['min'];
                    /** @var TrustRank $trustMax */
                    $trustMax = $searchQuery['trust']['max'];
                    $params["${paramName}_min"] = min($trustMin->getSort(), $trustMax->getSort());
                    $params["${paramName}_max"] = max($trustMin->getSort(), $trustMax->getSort());
                    break;
                case 'rarity':
                    $qb->$where("blade.rarity $between :${paramName}_min AND :${paramName}_max");
                    $params["${paramName}_min"] = min($searchQuery['rarity']['min'], $searchQuery['rarity']['max']);
                    $params["${paramName}_max"] = max($searchQuery['rarity']['min'], $searchQuery['rarity']['max']);
                    break;
                case 'fieldSkill':
                    switch ($searchQuery['fieldSkill']['comparison']) {
                        case 'lte':
                            $comparison = $lte;
                            break;
                        case 'eq':
                            $comparison = $eq;
                            break;
                        case 'gte':
                        default:
                            $comparison = $gte;
                            break;
                    }
                    $qb->$where("(:${paramName}_affinity_node $eq affinityNodes.affinityNode AND affinityNodes.level $comparison :${paramName}_level)");
                    $params["${paramName}_affinity_node"] = $searchQuery['fieldSkill']['affinityNode'];
                    $params["${paramName}_level"] = $searchQuery['fieldSkill']['level'];
                    break;
                case 'isMerc':
                    $qb->$where("blade.isMerc $eq :$paramName");
                    $params[$paramName] = $searchQuery['isMerc'];
                    break;
                case 'canBeReleased':
                    $qb->$where("blade.canBeReleased $eq :$paramName");
                    $params[$paramName] = $searchQuery['canBeReleased'];
                    break;
            }
        }
        $userBladesQb = $this->createQueryBuilder('bladeList');
        $userBladesQb->where('bladeList.user = :user')
          ->andWhere($userBladesQb->expr()->in('bladeList', $qb->getDQL()))
          ->setParameters($params)
          ->setParameter('user', $user);
        $q = $userBladesQb->getQuery();
        $blades = $q->execute();

        return $blades;
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
        $allQb->addSelect('bladeList.affinity / bladeList.affinityTotal AS HIDDEN affinityPct')
          ->join(User::class, 'user', 'WITH', 'user = :user')
          ->where('bladeList.user = :user')
          ->andWhere('bladeList.isMerc = true')
          ->andWhere('bladeList.mercMission IS NULL')
          ->andWhere('bladeList.driver MEMBER OF user.drivers')
          ->orderBy('affinityPct')
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
          ->orderBy('blade.mercTeamPosition', 'ASC')
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
