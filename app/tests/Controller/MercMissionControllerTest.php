<?php

namespace App\Tests\Controller;

use App\Entity\AffinityNode;
use App\Entity\Blade;
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
use App\Entity\User;
use App\Entity\WeaponClass;
use App\Tests\FixturesTestCase;
use App\Tests\NeedsLoginTrait;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\DomCrawler\Field\ChoiceFormField;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class MercMissionControllerTest extends FixturesTestCase
{

    use NeedsLoginTrait;

    /**
     * @dataProvider missionSecurityDataProvider
     *
     * @param string $username
     * @param bool $hasAccess
     */
    public function testSecurity(string $username, bool $hasAccess)
    {
        if (!$hasAccess) {
            self::expectException(AccessDeniedHttpException::class);
        }
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
        if ($hasAccess) {
            $visibilityConstraint = self::greaterThan(0);
        } else {
            $visibilityConstraint = self::equalTo(0);
        }
        self::assertThat($crawler->filter('#mercmission-new')->count(), $visibilityConstraint, 'Normal user can create new missions');
        self::assertThat($crawler->filter('.mercmission-edit')->count(), $visibilityConstraint, 'Normal user can edit missions');
        self::assertThat($crawler->filter('.mercmission-delete')->count(), $visibilityConstraint, 'Normal user can delete missions');

        // Try to access some pages directly
        if ($hasAccess) {
            $responseCode = 200;
        } else {
            $responseCode = 403;
        }
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
            'user@test.com',
            false,
          ],
          'Admin User' => [
            'admin@test.com',
            true,
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
        $this->login($client, 'user@test.com');
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
                //              'repeatable' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--repeatable')->text()),
              'nation' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--nation')->text()),
              'name' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--name')->text()),
                //              'prerequisites' => [],
              'requirements' => [],
              'fieldSkills' => [],
              'duration' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--duration')->text()),
              'gold' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--gold')->text()),
              'experience' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--experience')->text()),
              'mercpoints' => trim($nodeCrawler->filter('td.xeno2--mercmission--list--mercpoints')->text()),
              'actions' => [],
            ];
            //            foreach ($nodeCrawler->filter('td.xeno2--mercmission--list--prerequisites ul li') as $prerequisiteName) {
            //                $pageMercMission['prerequisites'][] = trim($prerequisiteName->textContent);
            //            }
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
            //            self::assertEquals($mercMission->isRepeatable(), $yesNo[$pageMercMission['repeatable']], 'Wrong repeatable status displayed');
            self::assertEquals($mercMission->getDuration()->format('G:i'), $pageMercMission['duration'], 'Wrong duration displayed');
            self::assertEquals(sprintf('%s G', $mercMission->getGold()), $pageMercMission['gold'], 'Wrong gold displayed');
            self::assertEquals($mercMission->getExperience(), $pageMercMission['experience'], 'Wrong experience displayed');
            self::assertEquals($mercMission->getMercPoints(), $pageMercMission['mercpoints'], 'Wrong merc points displayed');
            self::assertContains('Start', $pageMercMission['actions'], 'Start action not displayed');

            //            sort($pageMercMission['prerequisites']);
            //            $prerequisiteNames = [];
            //            foreach ($mercMission->getPrerequisites() as $prerequisite) {
            //                $prerequisiteNames[] = $prerequisite->getName();
            //            }
            //            sort($prerequisiteNames);
            //            self::assertEquals($prerequisiteNames, $pageMercMission['prerequisites'], 'Wrong prerequisites displayed');

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
        $this->login($client, 'admin@test.com');
        $em = $client->getContainer()->get('doctrine')->getManager();

        $crawler = $client->request('GET', '/mercmissions/all/new');
        self::isSuccessful($client->getResponse());

        // Add form data
        $form = $crawler->filter('form[name=merc_mission_form]')->form();
        // Programmatically check/uncheck the repeatable box
        /** @var ChoiceFormField $repeatableCheckbox */
        $repeatableCheckbox = $form['merc_mission_form[repeatable]'];
        if (isset($formValues['repeatable'])) {
            $repeatableCheckbox->tick();
        } else {
            $repeatableCheckbox->untick();
        }
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
        $this->verifyMissionForm($mission, $formValues);
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
            'merc_points' => $faker->numberBetween(50, 150),
            'experience' => $faker->numberBetween(0, 1000),
            'gold' => $faker->numberBetween(0, 2000),
          ],
        ];
        // Only create the array key if it is true.  This matches the behavior
        // of the form values returned from the crawler.
        if ($faker->boolean) {
            $data['valid']['repeatable'] = true;
        }

        return $data;
    }

    public function testEdit()
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testEdit.php');
        $client = $this->createClient();
        $client->followRedirects();
        $this->login($client, 'admin@test.com');
        $em = $client->getContainer()->get('doctrine')->getManager();
        $this->addRequirementsToMissions($em, $this->faker);
        $this->addFieldSkillsToMissions($em, $this->faker);
        $mercMissionRepo = $em->getRepository(MercMission::class);
        /** @var MercMission $mercMission */
        $mercMission = $mercMissionRepo->find(1);

        $crawler = $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug().'/edit/'.$mercMission->getSlug());
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form[name=merc_mission_form]')->form();
        $formValues = $form->getPhpValues();

        // Verify the form is already filled out properly.
        $this->verifyMissionForm($mercMission, $formValues['merc_mission_form']);

        // Make some changes and submit the form.
        $formValues['merc_mission_form']['name'] = $this->faker->words(3, true);
        $formValues['merc_mission_form']['nation'] = $this->faker->numberBetween(1, 7);
        unset($formValues['merc_mission_form']['prerequisites']);
        unset($formValues['merc_mission_form']['requirements_blade_class']);
        unset($formValues['merc_mission_form']['requirements_element']);
        unset($formValues['merc_mission_form']['requirements_field_skill']);
        unset($formValues['merc_mission_form']['requirements_gender']);
        unset($formValues['merc_mission_form']['requirements_strength']);
        unset($formValues['merc_mission_form']['requirements_weapon_class']);
        unset($formValues['merc_mission_form']['field_skills']);
        unset($formValues['merc_mission_form']['repeatable']);
        $date = $this->faker->dateTimeBetween('@0', '@5400');
        $formValues['merc_mission_form']['duration'] = [
          'hour' => $date->format('H'),
          'minute' => $date->format('i'),
        ];
        $formValues['merc_mission_form']['merc_points'] = $this->faker->numberBetween(50, 150);
        $formValues['merc_mission_form']['experience'] = $this->faker->numberBetween(0, 1000);
        $formValues['merc_mission_form']['gold'] = $this->faker->numberBetween(0, 2000);
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        // Verify the changes were persisted.
        $mercMission = $mercMissionRepo->find(1);
        $em->refresh($mercMission);
        self::assertEquals($formValues['merc_mission_form']['name'], $mercMission->getName(), 'Name updated incorrectly');
        self::assertEquals($formValues['merc_mission_form']['nation'], $mercMission->getNation()->getId(), 'Name updated incorrectly');
        self::assertFalse($mercMission->isRepeatable(), 'Repeatable status updated incorrectly');

        $missionDateTime = [
          'hour' => $mercMission->getDuration()->format('H'),
          'minute' => $mercMission->getDuration()->format('i'),
        ];
        self::assertEquals($formValues['merc_mission_form']['duration'], $missionDateTime, 'Duration updated incorrectly');
        self::assertEmpty($mercMission->getPrerequisites(), 'Prerequisites updated incorrectly');
        self::assertEmpty($mercMission->getRequirements(), 'Requirements updated incorrectly');
        self::assertEmpty($mercMission->getFieldSkills(), 'Field skills updated incorrectly');
        self::assertEquals($formValues['merc_mission_form']['merc_points'], $mercMission->getMercPoints(), 'Merc points updated incorrectly');
        self::assertEquals($formValues['merc_mission_form']['experience'], $mercMission->getExperience(), 'Experience updated incorrectly');
        self::assertEquals($formValues['merc_mission_form']['gold'], $mercMission->getGold(), 'Gold updated incorrectly');
    }

    public function testDelete()
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testEdit.php');
        $client = $this->createClient();
        $client->followRedirects();
        $this->login($client, 'admin@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $mercMissionRepo = $em->getRepository(MercMission::class);
        /** @var MercMission $mercMission */
        $mercMission = $mercMissionRepo->find(1);

        // Delete a mission
        $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug().'/delete/'.$mercMission->getSlug());
        self::isSuccessful($client->getResponse());
        $mercMission = $mercMissionRepo->find(1);
        self::assertNull($mercMission, 'Merc Mission not deleted when requested');
    }

    public function testCannotRestart()
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testStart.php');
        $client = $this->createClient();
        $user = $this->login($client, 'user@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $mercMissionRepo = $em->getRepository(MercMission::class);
        $bladeRepo = $em->getRepository(Blade::class);

        // Assign the blades to a merc mission
        /** @var MercMission $mercMission */
        $mercMission = $mercMissionRepo->find(1);
        /** @var Blade[] $blades */
        $blades = $bladeRepo->findBy(['user' => $user]);
        $hasLeader = false;
        foreach ($blades as $blade) {
            $blade->setMercMission($mercMission);
            if (!$hasLeader) {
                $blade->setIsMercLeader(true);
                $hasLeader = true;
            }
            $em->persist($blade);
        }
        $em->flush();

        $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug().'/start/'.$mercMission->getSlug());
        self::assertTrue($client->getResponse()->isRedirect('/mercmissions/'.$mercMission->getNation()->getSlug()), 'Not redirected');
        $crawler = $client->followRedirect();
        self::assertEquals(1, $crawler->filter('.alert.alert-danger')->count(), 'Alert not shown');
    }

    public function testStart()
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testStart.php');
        $client = $this->createClient();
        $client->followRedirects();
        $user = $this->login($client, 'user@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $mercMissionRepo = $em->getRepository(MercMission::class);
        $bladeRepo = $em->getRepository(Blade::class);
        /** @var MercMission $mercMission */
        $mercMission = $mercMissionRepo->find(1);
        /** @var Blade[] $blades */
        $blades = $bladeRepo->findBy(['user' => $user]);

        $crawler = $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug());
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('a.mercmission-start')->link());
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form[name=merc_mission_start]')->form();
        $formValues = $form->getPhpValues();
        $k = 0;
        $leader = null;
        foreach ($blades as $blade) {
            $formValues['merc_mission_start']['blades'][$k]['blade'] = $blade->getId();
            if (is_null($leader)) {
                $formValues['merc_mission_start']['blades'][$k]['leader'] = "1";
                $leader = $blade;
            }

            $k++;
        }
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        $blades = $bladeRepo->findBladesOnMercMission($user, $mercMission);
        foreach ($blades as $blade) {
            $em->refresh($blade);
            self::assertEquals($mercMission->getId(), $blade->getMercMission()->getId(), 'Blade not assigned to merc mission');
            if ($leader === $blade) {
                self::assertTrue($blade->isMercLeader(), 'Leader status not persisted.');
            }
        }
    }

    public function testCannotStartWithUnownedBlades()
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testStart.php');
        $client = $this->createClient();
        $client->followRedirects();
        $currentUser = $this->login($client, 'user@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $mercMissionRepo = $em->getRepository(MercMission::class);
        $bladeRepo = $em->getRepository(Blade::class);
        $userRepo = $em->getRepository(User::class);
        /** @var User $otherUser */
        $otherUser = $userRepo->findOneBy(['email' => 'admin@test.com']);
        // Sanity check
        self::assertNotEquals($otherUser, $currentUser, 'Error in test - needs two different users');
        /** @var MercMission $mercMission */
        $mercMission = $mercMissionRepo->find(1);
        /** @var Blade[] $blades */
        $blades = $bladeRepo->findBy(['user' => $otherUser]);

        $crawler = $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug().'/start/'.$mercMission->getSlug());
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form[name=merc_mission_start]')->form();
        $formValues = $form->getPhpValues();
        $k = 0;
        $leader = null;
        foreach ($blades as $blade) {
            $formValues['merc_mission_start']['blades'][$k]['blade'] = $blade->getId();
            if (is_null($leader)) {
                $formValues['merc_mission_start']['blades'][$k]['leader'] = "1";
                $leader = $blade;
            }

            $k++;
        }
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        $blades = $bladeRepo->findBladesOnMercMission($otherUser, $mercMission);
        foreach ($blades as $blade) {
            $em->refresh($blade);
            self::assertNull($blade->getMercMission(), 'Blade assigned to merc mission its owner did not start');
        }
    }

    public function testStop()
    {
        $this->loadFixturesFromFile([], 'MercMissionControllerTest/testStart.php');
        $client = $this->createClient();
        $client->followRedirects();
        $user = $this->login($client, 'user@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $mercMissionRepo = $em->getRepository(MercMission::class);
        $bladeRepo = $em->getRepository(Blade::class);

        // Assign the blades to a merc mission
        /** @var MercMission $mercMission */
        $mercMission = $mercMissionRepo->find(1);
        /** @var Blade[] $blades */
        $blades = $bladeRepo->findBy(['user' => $user]);
        $hasLeader = false;
        foreach ($blades as $blade) {
            $blade->setMercMission($mercMission);
            if (!$hasLeader) {
                $blade->setIsMercLeader(true);
                $hasLeader = true;
            }
            $em->persist($blade);
        }
        $em->flush();

        $crawler = $client->request('GET', '/mercmissions/'.$mercMission->getNation()->getSlug());
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('a.mercmission-stop')->link());
        self::isSuccessful($client->getResponse());
        $form = $crawler->filter('form[name=merc_mission_stop]')->form();
        $formValues = $form->getPhpValues();

        // Max out all affinity and affinity nodes
        foreach ($formValues['merc_mission_stop']['blades'] as &$mercMissionStopBlade) {
            $mercMissionStopBlade['affinity'] = $mercMissionStopBlade['affinityTotal'];
            $mercMissionStopBlade['strength'] = "100";
            foreach ($mercMissionStopBlade['affinityNodes'] as &$affinityNode) {
                $affinityNode['level'] = $affinityNode['maxLevel'];
            }
        }
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        // Verify the changes were persisted
        $blades = $bladeRepo->findBy(['user' => $user]);
        foreach ($blades as $blade) {
            $em->refresh($blade);
            self::assertEquals(100, $blade->getStrength(), 'Strength change not persisted');
            self::assertEquals($blade->getAffinity(), $blade->getAffinityTotal(), 'Affinity change not persisted');
            foreach ($blade->getAffinityNodes() as $bladeAffinityNode) {
                self::assertEquals($bladeAffinityNode->getLevel(), $bladeAffinityNode->getMaxLevel(), 'Affinity node level change not persisted');
            }
        }
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

    /**
     * @param $mission
     * @param array $formValues
     */
    private function verifyMissionForm(MercMission $mission, array $formValues): void
    {
        self::assertEquals($formValues['name'], $mission->getName(), 'Wrong name');
        self::assertEquals($formValues['nation'], $mission->getNation()->getId(), 'Wrong nation');
        self::assertEquals(array_key_exists('repeatable', $formValues), $mission->isRepeatable(), 'Wrong repeatable status');
        self::assertEquals($formValues['merc_points'], $mission->getMercPoints(), 'Wrong merc points');
        self::assertEquals($formValues['experience'], $mission->getExperience(), 'Wrong experience');
        self::assertEquals($formValues['gold'], $mission->getGold(), 'Wrong gold');

        $missionDateTime = [
          'hour' => $mission->getDuration()->format('H'),
          'minute' => $mission->getDuration()->format('i'),
        ];
        self::assertEquals($formValues['duration'], $missionDateTime, 'Wrong duration');

        sort($formValues['prerequisites']);
        $missionPrerequisiteIds = [];
        foreach ($mission->getPrerequisites() as $prerequisite) {
            $missionPrerequisiteIds[] = $prerequisite->getId();
        }
        sort($missionPrerequisiteIds);
        self::assertEquals($formValues['prerequisites'], $missionPrerequisiteIds, 'Wrong prerequisites');

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
            if (!isset($formValues[$requirementField])) {
                $formValues[$requirementField] = [];
            }
            if (!isset($missionRequirementsInfo[$requirementClass])) {
                $missionRequirementsInfo[$requirementClass] = [];
            }

            self::assertEquals($formValues[$requirementField], $missionRequirementsInfo[$requirementClass], sprintf('Wrong %s', $requirementField));
        }

        sort($formValues['field_skills']);
        $missionFieldSkillIds = [];
        foreach ($mission->getFieldSkills() as $fieldSkill) {
            $missionFieldSkillIds[] = $fieldSkill->getId();
        }
        sort($missionFieldSkillIds);
        self::assertEquals($formValues['field_skills'], $missionFieldSkillIds, 'Wrong field skills');
    }
}
