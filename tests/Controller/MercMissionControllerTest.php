<?php

namespace App\Tests\Controller;

use App\Entity\AffinityNode;
use App\Entity\BladeClass;
use App\Entity\Element;
use App\Entity\Gender;
use App\Entity\MercMission;
use App\Entity\MercMissionRequirement;
use App\Entity\MercMissionRequirementClass;
use App\Entity\MercMissionRequirementElement;
use App\Entity\MercMissionRequirementFieldSkill;
use App\Entity\MercMissionRequirementGender;
use App\Entity\MercMissionRequirementStrength;
use App\Entity\MercMissionRequirementWeaponClass;
use App\Entity\Nation;
use App\Entity\WeaponClass;
use App\Tests\FixturesTestCase;
use App\Tests\NeedsLoginTrait;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use PHPUnit\Framework\Constraint\Constraint;
use Symfony\Component\DomCrawler\Crawler;

class MercMissionControllerTest extends FixturesTestCase
{

    use NeedsLoginTrait;

    /**
     * @dataProvider missionSecurityDataProvider
     *
     * @param string $username
     * @param Constraint $visibilityConstrains
     * @param int $responseCode
     */
    public function testSecurity(string $username, Constraint $visibilityConstrains, int $responseCode)
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testIndex.php');
        $client = $this->createClient();
        $this->login($client, $username);
        $em = $client->getContainer()->get('doctrine')->getManager();
        $this->addRequirementsToMissions($em, $this->faker);
        $this->addFieldSkillsToMissions($em, $this->faker);

        $crawler = $client->request('GET', '/');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Merc Missions")')->link());
        self::isSuccessful($client->getResponse());

        // Test normal users can't access merc mission actions
        self::assertThat($crawler->filter('#mercmission-new')->count(), $visibilityConstrains, 'Normal user can create new missions');
        self::assertThat($crawler->filter('.mercmission-edit')->count(), $visibilityConstrains, 'Normal user can edit missions');
        self::assertThat($crawler->filter('.mercmission-delete')->count(), $visibilityConstrains, 'Normal user can delete missions');

        // Try to access some pages directly
        $client->request('GET', '/mercmissions/all/new');
        self::assertEquals($responseCode, $client->getResponse()->getStatusCode(), 'Incorrect response code for new page');
        /** @var MercMission $mercMission */
        $mercMission = $em->getRepository(MercMission::class)->find(1);
        $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug().'/edit/'.$mercMission->getSlug());
        self::assertEquals($responseCode, $client->getResponse()->getStatusCode(), 'Incorrect response code for edit page');
    }

    public function missionSecurityDataProvider()
    {
        return [
          'Normal User' => [
            'Test User',
            self::equalTo(0),
            403,
          ],
          'Admin User' => [
            'Test Admin',
            self::greaterThan(0),
            200,
          ],
        ];
    }

    /**
     * @dataProvider nationDataProvider
     *
     * @param string $nationSlug
     */
    public function testIndex(string $nationSlug)
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testIndex.php');
        $client = $this->createClient();
        $this->login($client, 'Test User');
        $em = $client->getContainer()->get('doctrine')->getManager();
        $this->addRequirementsToMissions($em, $this->faker);
        $this->addFieldSkillsToMissions($em, $this->faker);

        if ($nationSlug !== 'all') {
            $nationRepo = $client->getContainer()->get('doctrine')->getRepository(Nation::class);
            /** @var Nation $driver */
            $nation = $nationRepo->findOneBy(['slug' => $nationSlug]);
        }

        $crawler = $client->request('GET', '/');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Merc Missions")')->link());
        self::isSuccessful($client->getResponse());
        if (isset($nation)) {
            // Navigate to the tab for this nation
            $crawler = $client->click($crawler->filter('.nav-tabs a:contains("'.$nation->getName().'")')->link());
            self::isSuccessful($client->getResponse());
        }

        // Get all of the merc missions that should be displayed and compare it
        // to reality.
        $mercMissionCriteria = [];
        if (isset($nation)) {
            $mercMissionCriteria['nation'] = $nation;
        }
        /** @var MercMission[] $mercMissions */
        $mercMissions = $em->getRepository(MercMission::class)->findBy($mercMissionCriteria);
        $pageMercMissions = [];
        foreach ($crawler->filter('#mercmission-list tbody tr') as $row) {
            $nodeCrawler = new Crawler($row);
            $pageMercMission = [
              'repeatable' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--repeatable')->text()),
              'nation' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--nation')->text()),
              'name' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--name')->text()),
              'prerequisites' => [],
              'requirements' => [],
              'fieldSkills' => [],
              'duration' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--duration')->text()),
              'actions' => [],
            ];
            foreach ($nodeCrawler->filter('td.xeno2--mercmission--list--prerequisites ul li') as $prerequisiteName) {
                $pageMercMission['prerequisites'][] = trim($prerequisiteName->textContent);
            }
            foreach ($nodeCrawler->filter('td.xeno2--mercmission--list--requirements ul li') as $requirementString) {
                $pageMercMission['requirements'][] = trim($requirementString->textContent);
            }
            foreach ($nodeCrawler->filter('td.xeno2--mercmission--list--fieldskills  ul li') as $fieldSkillName) {
                $pageMercMission['fieldSkills'][] = trim($fieldSkillName->textContent);
            }
            foreach ($nodeCrawler->filter('td.xeno2--mercmission--list--action .btn') as $actionNode) {
                $pageMercMission['actions'][] = trim($actionNode->textContent);
            }
            $pageMercMissions[$pageMercMission['name']] = $pageMercMission;
        }

        // Build the list of mission names to ensure they appear in the list.
        $mercMissionNames = [];
        foreach ($mercMissions as $mercMission) {
            $mercMissionNames[] = $mercMission->getName();
        }
        sort($mercMissionNames);
        $pageMercMissionNames = array_keys($pageMercMissions);
        sort($pageMercMissionNames);
        self::assertEquals($mercMissionNames, $pageMercMissionNames, 'Displayed mission list is wrong');
        $yesNo = ['Yes' => true, 'No' => false];
        foreach ($mercMissions as $mercMission) {
            $pageMercMission = $pageMercMissions[$mercMission->getName()];
            self::assertEquals($mercMission->isRepeatable(), $yesNo[$pageMercMission['repeatable']], 'Wrong repeatable status displayed');
            self::assertEquals($mercMission->getDuration()->format('G:i'), $pageMercMission['duration'], 'Wrong duration displayed');
            self::assertContains('Start', $pageMercMission['actions'], 'Start action not displayed');

            sort($pageMercMission['prerequisites']);
            $prerequisiteNames = [];
            foreach ($mercMission->getPrerequisites() as $prerequisite) {
                $prerequisiteNames[] = $prerequisite->getName();
            }
            sort($prerequisiteNames);
            self::assertEquals($prerequisiteNames, $pageMercMission['prerequisites'], 'Wrong prerequisites displayed');

            sort($pageMercMission['requirements']);
            $requirementStrings = [];
            foreach ($mercMission->getRequirements() as $mercMissionRequirement) {
                $requirementStrings[] = sprintf('%s @ %s', $mercMissionRequirement->getCount(), $mercMissionRequirement->getName());
            }
            sort($requirementStrings);
            self::assertEquals($requirementStrings, $pageMercMission['requirements'], 'Wrong requirements displayed');

            sort($pageMercMission['fieldSkills']);
            $fieldSkillNames = [];
            foreach ($mercMission->getFieldSkills() as $fieldSkill) {
                $fieldSkillNames[] = $fieldSkill->getName();
            }
            sort($fieldSkillNames);
            self::assertEquals($fieldSkillNames, $pageMercMission['fieldSkills'], 'Wrong field skills displayed');
        }
    }

    public function nationDataProvider()
    {
        return [
          'all' => ['all'],
          'argentum' => ['argentum'],
          'gormott' => ['gormott'],
          'uraya' => ['uraya'],
          'mor-ardain' => ['mor-ardain'],
          'leftheria' => ['leftheria'],
          'indol' => ['indol'],
          'tantal' => ['tantal'],
        ];
    }

    /**
     * @dataProvider missionDataProvider
     *
     * @param array $formValues
     */
    public function testNew(array $formValues)
    {
        $this->loadFixturesFromFile([]);
        $client = $this->createClient();
        $client->followRedirects();
        $this->login($client, 'Test Admin');
        $em = $client->getContainer()->get('doctrine')->getManager();

        $crawler = $client->request('GET', '/mercmissions/all/new');
        self::isSuccessful($client->getResponse());

        // Add form data
        $form = $crawler->filter('form[name=merc_mission_form]')->form();
        $submitFormValues = $form->getPhpValues()['merc_mission_form'];
        // Merge in the CSRF token
        $submitFormValues = array_merge($submitFormValues, $formValues);
        $missionName = $formValues['name'];
        $client->request($form->getMethod(), $form->getUri(), ['merc_mission_form' => $submitFormValues]);
        self::isSuccessful($client->getResponse());

        // Check data
        $missionRepo = $em->getRepository(MercMission::class);
        /** @var MercMission $mission */
        $mission = $missionRepo->findOneBy(['name' => $missionName]);
        self::assertInstanceOf(MercMission::class, $mission, 'Failed to load new mission');
        self::assertEquals($formValues['name'], $mission->getName(), 'Wrong name persisted');
        self::assertEquals($formValues['nation'], $mission->getNation()->getId(), 'Wrong nation persisted');
        self::assertEquals($formValues['repeatable'], $mission->isRepeatable(), 'Wrong repeatable status persisted');

        $missionDateTime = [
          'hour' => $mission->getDuration()->format('H'),
          'minute' => $mission->getDuration()->format('i'),
        ];
        self::assertEquals($formValues['duration'], $missionDateTime, 'Wrong duration persisted');

        sort($formValues['prerequisites']);
        $missionPrerequisiteIds = [];
        foreach ($mission->getPrerequisites() as $prerequisite) {
            $missionPrerequisiteIds[] = $prerequisite->getId();
        }
        sort($missionPrerequisiteIds);
        self::assertEquals($formValues['prerequisites'], $missionPrerequisiteIds, 'Wrong prerequisites persisted');

        $missionRequirementsInfo = [];
        foreach ($mission->getRequirements() as $mercMissionRequirement) {
            $missionRequirementInfo = [
              'count' => $mercMissionRequirement->getCount(),
            ];
            if ($mercMissionRequirement instanceof MercMissionRequirementClass) {
                $missionRequirementInfo['class'] = $mercMissionRequirement->getClass()->getId();
            } elseif ($mercMissionRequirement instanceof MercMissionRequirementElement) {
                $missionRequirementInfo['element'] = $mercMissionRequirement->getElement()->getId();
            } elseif ($mercMissionRequirement instanceof MercMissionRequirementFieldSkill) {
                $missionRequirementInfo['field_skill'] = $mercMissionRequirement->getFieldSkill()->getId();
                $missionRequirementInfo['level'] = $mercMissionRequirement->getLevel();
            } elseif ($mercMissionRequirement instanceof MercMissionRequirementGender) {
                $missionRequirementInfo['gender'] = $mercMissionRequirement->getGender()->getId();
            } elseif ($mercMissionRequirement instanceof MercMissionRequirementStrength) {
                $missionRequirementInfo['strength'] = $mercMissionRequirement->getStrength();
            } elseif ($mercMissionRequirement instanceof MercMissionRequirementWeaponClass) {
                $missionRequirementInfo['weapon_class'] = $mercMissionRequirement->getWeaponClass()->getId();
            } else {
                throw new \LogicException('Requirement is not a MercMissionRequirement');
            }

            $missionRequirementsInfo[get_class($mercMissionRequirement)][] = $missionRequirementInfo;
        }
        $mercMissionRequirementClasses = [
          MercMissionRequirementClass::class => 'requirements_blade_class',
          MercMissionRequirementElement::class => 'requirements_element',
          MercMissionRequirementFieldSkill::class => 'requirements_field_skill',
          MercMissionRequirementGender::class => 'requirements_gender',
          MercMissionRequirementStrength::class => 'requirements_strength',
          MercMissionRequirementWeaponClass::class => 'requirements_weapon_class',
        ];
        foreach ($mercMissionRequirementClasses as $requirementClass => $requirementField) {
            self::assertEquals($formValues[$requirementField], $missionRequirementsInfo[$requirementClass], sprintf('Wrong %s persisted', $requirementField));
        }

        sort($formValues['field_skills']);
        $missionFieldSkillIds = [];
        foreach ($mission->getFieldSkills() as $fieldSkill) {
            $missionFieldSkillIds[] = $fieldSkill->getId();
        }
        sort($missionFieldSkillIds);
        self::assertEquals($formValues['field_skills'], $missionFieldSkillIds, 'Wrong field skills persisted');
    }

    public function missionDataProvider()
    {
        $faker = Factory::create();
        $data = [];

        $date = $faker->dateTimeBetween('@0', '@5400');
        $data['valid'] = [
          [
            'name' => $faker->words(3, true),
            'nation' => $faker->numberBetween(1, 7),
            'prerequisites' => [$faker->numberBetween(1, 31)],
            'requirements_blade_class' => [
              0 => [
                'count' => 1,
                'class' => $faker->numberBetween(1, 2),
              ],
            ],
            'requirements_element' => [
              0 => [
                'count' => 1,
                'element' => $faker->numberBetween(1, 8),
              ],
            ],
            'requirements_field_skill' => [
              0 => [
                'count' => 1,
                'field_skill' => $faker->numberBetween(1, 55),
                'level' => $faker->numberBetween(1, 5),
              ],
            ],
            'requirements_gender' => [
              0 => [
                'count' => 1,
                'gender' => $faker->numberBetween(1, 3),
              ],
            ],
            'requirements_strength' => [
              0 => [
                'count' => 1,
                'strength' => $faker->numberBetween(20, 40),
              ],
            ],
            'requirements_weapon_class' => [
              0 => [
                'count' => 1,
                'weapon_class' => $faker->numberBetween(1, 18),
              ],
            ],
            'field_skills' => [
              $faker->numberBetween(1, 18),
              $faker->numberBetween(19, 36),
              $faker->numberBetween(37, 55),
            ],
            'duration' => [
              'hour' => $date->format('H'),
              'minute' => $date->format('i'),
            ],
            'repeatable' => $faker->boolean,
          ],
        ];

        return $data;
    }

    /**
     * Add a random set of requirements to every Merc Mission
     *
     * Alice can't really handle the polymorphic nature of these requirements,
     * so we have to do it the hard way.  Using the Faker instead of native
     * random functions allows the tests to be reproducible.
     *
     * @param ObjectManager $em
     * @param Generator $faker
     */
    private function addRequirementsToMissions(ObjectManager $em, Generator $faker)
    {
        $requirementClasses = [
          MercMissionRequirementClass::class,
          MercMissionRequirementElement::class,
          MercMissionRequirementFieldSkill::class,
          MercMissionRequirementGender::class,
          MercMissionRequirementStrength::class,
          MercMissionRequirementWeaponClass::class,
        ];

        $mercMissions = $em->getRepository(MercMission::class)->findAll();
        $bladeClasses = $em->getRepository(BladeClass::class)->findAll();
        $elements = $em->getRepository(Element::class)->findAll();
        $genders = $em->getRepository(Gender::class)->findAll();
        $fieldSkills = $em->getRepository(AffinityNode::class)->findAll();
        $weaponClasses = $em->getRepository(WeaponClass::class)->findAll();

        foreach ($mercMissions as &$mercMission) {
            $requirementCount = $faker->numberBetween(0, 3);
            $requiredCount = 0;
            if ($requirementCount) {
                for ($i = 0; $i < $requirementCount; $i++) {
                    $requirementClass = $faker->randomElement($requirementClasses);
                    /** @var MercMissionRequirement $requirement */
                    $requirement = new $requirementClass();
                    $requiredCount += $faker->numberBetween(1, 6 / $requirementCount);
                    $requirement->setCount($requiredCount);
                    if ($requirement instanceof MercMissionRequirementClass) {
                        $bladeClass = $faker->randomElement($bladeClasses);
                        $requirement->setClass($bladeClass);
                    } elseif ($requirement instanceof MercMissionRequirementElement) {
                        $element = $faker->randomElement($elements);
                        $requirement->setElement($element);
                    } elseif ($requirement instanceof MercMissionRequirementFieldSkill) {
                        $fieldSkill = $faker->randomElement($fieldSkills);
                        $requirement->setFieldSkill($fieldSkill);
                        $requirement->setLevel($faker->numberBetween(1, 3));
                    } elseif ($requirement instanceof MercMissionRequirementGender) {
                        $gender = $faker->randomElement($genders);
                        $requirement->setGender($gender);
                    } elseif ($requirement instanceof MercMissionRequirementStrength) {
                        $strength = $faker->numberBetween(20, 40);
                        $requirement->setStrength($strength);
                    } elseif ($requirement instanceof MercMissionRequirementWeaponClass) {
                        $weaponClass = $faker->randomElement($weaponClasses);
                        $requirement->setWeaponClass($weaponClass);
                    } else {
                        throw new \LogicException('Requirement is not a MercMissionRequirement');
                    }
                    $mercMission->addRequirement($requirement);
                }
                $em->persist($mercMission);
            }
        }
        $em->flush();
    }

    /**
     * Add random field skills to each Merc Mission
     *
     * Alice can't ensure that the same field skill doesn't get added more than
     * once to each mission, so this works around it.
     *
     * @param ObjectManager $em
     * @param Generator $faker
     */
    private function addFieldSkillsToMissions(ObjectManager $em, Generator $faker)
    {
        $mercMissions = $em->getRepository(MercMission::class)->findAll();
        $fieldSkills = $em->getRepository(AffinityNode::class)->findAll();

        foreach ($mercMissions as &$mercMission) {
            $fieldSkillCount = $faker->numberBetween(1, 3);
            /** @var AffinityNode[] $missionFieldSkills */
            $missionFieldSkills = $faker->randomElements($fieldSkills, $fieldSkillCount);
            foreach ($missionFieldSkills as $missionFieldSkill) {
                $mercMission->addFieldSkill($missionFieldSkill);
            }
            $em->persist($mercMission);
        }
        $em->flush();
    }
    //
    //    public function testEdit()
    //    {
    //
    //    }
    //
    //    public function testDelete()
    //    {
    //
    //    }
    //
    //    public function testStart()
    //    {
    //
    //    }
    //
    //    public function testStop()
    //    {
    //
    //    }
}
