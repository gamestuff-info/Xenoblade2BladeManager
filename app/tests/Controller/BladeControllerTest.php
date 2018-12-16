<?php

namespace App\Tests\Controller;

use App\Entity\Blade;
use App\Entity\Driver;
use App\Tests\FixturesTestCase;
use App\Tests\NeedsLoginTrait;
use Faker\Factory;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\DomCrawler\Form;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class BladeControllerTest extends FixturesTestCase
{

    use NeedsLoginTrait;

    /**
     * @dataProvider driverDataProvider
     *
     * @param string $driverSlug
     */
    public function testIndex(string $driverSlug)
    {
        $this->loadFixturesFromFile([], 'BladeControllerTest/testIndex.php');
        $client = $this->createClient();
        $user = $this->login($client, 'user@test.com');

        $bladeRepo = $client->getContainer()->get('doctrine')->getRepository(Blade::class);
        if ($driverSlug !== 'all') {
            $driverRepo = $client->getContainer()->get('doctrine')->getRepository(Driver::class);
            /** @var Driver $driver */
            $driver = $driverRepo->findOneBy(['slug' => $driverSlug]);
        }

        $crawler = $client->request('GET', '/');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('#navbarMain a:contains("Blades")')->link());
        self::isSuccessful($client->getResponse());
        if (isset($driver)) {
            // Navigate to the tab for this driver
            $crawler = $client->click($crawler->filter('.nav-tabs a:contains("'.$driver->getName().'")')->link());
            self::isSuccessful($client->getResponse());
        }

        // Get the list of Blades that should be displayed on the all page and
        // compare it to reality.
        $bladeCriteria = ['user' => $user];
        if (isset($driver)) {
            $bladeCriteria['driver'] = $driver;
        }
        /** @var Blade[] $blades */
        $blades = $bladeRepo->findBy($bladeCriteria);
        $pageBlades = [];
        $affinityPattern = '`(?P<affinity>\d+)\s*/\s*(?P<affinityTotal>\d+)\s+\((?P<affinityPct>\d+)%\)`';
        foreach ($crawler->filter('#blade-list tbody tr') as $row) {
            $nodeCrawler = new Crawler($row);
            $pageBlade = [
              'name' => trim($nodeCrawler->filter('td.xeno2--blade--list--name')->text()),
              'element' => trim($nodeCrawler->filter('td.xeno2--blade--list--element > .fas + span')->text()),
              'role' => trim($nodeCrawler->filter('td.xeno2--blade--list--role')->text()),
              'weapon' => trim($nodeCrawler->filter('td.xeno2--blade--list--weapon')->text()),
              'strength' => trim($nodeCrawler->filter('td.xeno2--blade--list--strength')->text()),
              'affinityShown' => trim($nodeCrawler->filter('td.xeno2--blade--list--affinity')->text()),
                // These four items are filled in later from a regex match.
              'affinity' => '',
              'affinityTotal' => '',
              'affinityPct' => '',
              'trust' => trim($nodeCrawler->filter('td.xeno2--blade--list--trust')->text()),
              'rarity' => $nodeCrawler->filter('td.xeno2--blade--list--rarity .fa-star')->count(),
            ];
            if (preg_match($affinityPattern, $pageBlade['affinityShown'], $affinityMatches)) {
                $pageBlade['affinity'] = $affinityMatches['affinity'];
                $pageBlade['affinityTotal'] = $affinityMatches['affinityTotal'];
                $pageBlade['affinityPct'] = $affinityMatches['affinityPct'];
            }

            // Ensure the correct action buttons are present.
            $pageBlade['action']['edit'] = $nodeCrawler->filter('td.xeno2--blade--list--action .btn:contains("Edit")');
            $pageBlade['action']['delete'] = $nodeCrawler->filter('td.xeno2--blade--list--action .btn:contains("Delete")');

            $pageBlades[$pageBlade['name']] = $pageBlade;
        }

        // Build the list of existing Blade names to verify they appear in the list.
        $bladeNames = [];
        foreach ($blades as $blade) {
            $bladeNames[] = $blade->getName();
        }
        sort($bladeNames);
        $pageBladeNames = array_keys($pageBlades);
        sort($pageBladeNames);
        self::assertEquals($bladeNames, $pageBladeNames, 'Displayed Blade list is wrong');
        foreach ($blades as $blade) {
            $pageBlade = $pageBlades[$blade->getName()];
            self::assertEquals($blade->getElement()->getName(), $pageBlade['element'], 'Wrong element displayed');
            self::assertEquals($blade->getBattleRole()->getName(), $pageBlade['role'], 'Wrong role displayed');
            self::assertEquals($blade->getWeaponClass()->getName(), $pageBlade['weapon'], 'Wrong weapon displayed');
            self::assertEquals($blade->getStrength(), $pageBlade['strength'], 'Wrong strength displayed');
            self::assertEquals($blade->getAffinity(), $pageBlade['affinity'], "Wrong affinity displayed ({$pageBlade['affinityShown']})");
            self::assertEquals($blade->getAffinityTotal(), $pageBlade['affinityTotal'], "Wrong affinity total displayed ({$pageBlade['affinityShown']})");
            self::assertEquals($blade->getAffinityPercent(), $pageBlade['affinityPct'], "Wrong affinity percent displayed ({$pageBlade['affinityShown']})");
            self::assertEquals($blade->getTrust()->getName(), $pageBlade['trust'], 'Wrong trust displayed');
            self::assertEquals($blade->getRarity(), $pageBlade['rarity'], 'Wrong rarity displayed');
            /** @var Crawler[] $pageBlade ['action'] */
            self::assertEquals(1, $pageBlade['action']['edit']->count());
            self::assertEquals(1, $pageBlade['action']['delete']->count());
        }
    }

    public function driverDataProvider()
    {
        return [
          'all' => ['all'],
          'rex' => ['rex'],
          'nia' => ['nia'],
          'tora' => ['tora'],
          'morag' => ['morag'],
          'zeke' => ['zeke'],
        ];
    }

    /**
     * @dataProvider bladeInfoDataProvider
     *
     * @param string|null $template
     * @param array $formData
     * @param array $affinityNodes
     */
    public function testNew(?string $template, array $formData, array $affinityNodes)
    {
        $this->loadFixturesFromFile();
        $client = $this->createClient();
        $user = $this->login($client, 'user@test.com');

        $crawler = $client->request('GET', '/blades');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('.btn:contains("Bond Blade")')->link());
        self::isSuccessful($client->getResponse());
        $client->followRedirects();
        if ($template) {
            $crawler = $client->click($crawler->filter('#bladeTemplates a:contains("'.$template.'")')->link());
            self::isSuccessful($client->getResponse());
        }

        // Add form data
        $form = $crawler->filter('form[name=blade_form]')->selectButton('Save')->form();
        $formValues = $this->completeBladeForm($formData, $affinityNodes, $form);
        $bladeName = $formValues['blade_form']['name'];
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        // Check data
        $bladeRepo = $client->getContainer()->get('doctrine')->getRepository(Blade::class);
        /** @var Blade $blade */
        $blade = $bladeRepo->findOneBy(['name' => $bladeName]);
        self::assertInstanceOf(Blade::class, $blade, 'Failed to load new blade');
        self::assertEquals($user->getId(), $blade->getUser()->getId());
        self::assertEquals($formValues['blade_form']['name'], $blade->getName(), 'Wrong name persisted');
        self::assertEquals($formValues['blade_form']['driver'], $blade->getDriver()->getId(), 'Wrong driver persisted');
        self::assertEquals($formValues['blade_form']['gender'], $blade->getGender()->getId(), 'Wrong gender persisted');
        self::assertEquals($formValues['blade_form']['battleRole'], $blade->getBattleRole()->getId(), 'Wrong battle role persisted');
        self::assertEquals($formValues['blade_form']['weaponClass'], $blade->getWeaponClass()->getId(), 'Wrong weapon class persisted');
        self::assertEquals($formValues['blade_form']['element'], $blade->getElement()->getId(), 'Wrong element persisted');
        self::assertEquals($formValues['blade_form']['strength'], $blade->getStrength(), 'Wrong strength persisted');
        self::assertEquals($formValues['blade_form']['rarity'], $blade->getRarity(), 'Wrong rarity persisted');
        self::assertEquals($formValues['blade_form']['affinity'], $blade->getAffinity(), 'Wrong affinity persisted');
        self::assertEquals($formValues['blade_form']['affinityTotal'], $blade->getAffinityTotal(), 'Wrong affinity total persisted');
        self::assertEquals($formValues['blade_form']['trust'], $blade->getTrust()->getId(), 'Wrong trust persisted');
        self::assertEquals($formValues['blade_form']['canBeReleased'], $blade->canBeReleased(), 'Wrong releasable status persisted');
        self::assertEquals($formValues['blade_form']['mercTeamName'], $blade->getMercTeamName(), 'Wrong merc team name persisted');
        self::assertEquals($formValues['blade_form']['isMerc'], $blade->isMerc(), 'Wrong merc status persisted');
        $bladeAffinityNodeIds = [];
        foreach ($blade->getAffinityNodes() as $bladeAffinityNode) {
            $bladeAffinityNodeIds[] = $bladeAffinityNode->getAffinityNode()->getId();
        }
        sort($bladeAffinityNodeIds);
        $formAffinityNodeIds = [];
        foreach ($formValues['blade_form']['affinityNodes'] as $affinityNodeInfo) {
            $formAffinityNodeIds[] = $affinityNodeInfo['affinityNode'];
        }
        sort($formAffinityNodeIds);
        self::assertEquals($formAffinityNodeIds, $bladeAffinityNodeIds, 'Wrong affinity nodes persisted');
        foreach ($formValues['blade_form']['affinityNodes'] as $affinityNodeInfo) {
            foreach ($blade->getAffinityNodes() as $bladeAffinityNode) {
                if ($bladeAffinityNode->getAffinityNode()->getId() == $affinityNodeInfo['affinityNode']) {
                    self::assertEquals($affinityNodeInfo['level'], $bladeAffinityNode->getLevel(), 'Wrong blade affinity node level persisted');
                    self::assertEquals($affinityNodeInfo['maxLevel'], $bladeAffinityNode->getMaxLevel(), 'Wrong blade affinity node max level persisted');
                }
            }
        }
    }

    public function bladeInfoDataProvider()
    {
        $faker = Factory::create();
        $data = [];

        // Completely valid data
        $affinityTotal = $faker->numberBetween(20, 40);
        $affinityNodeLevelMaxValues = [];
        for ($i = 0; $i < 3; $i++) {
            $affinityNodeLevelMaxValues[$i] = $faker->numberBetween(1, 5);
        }
        $data['valid'] = [
          null,
          [
            'driver' => $faker->numberBetween(1, 5),
            'name' => $faker->word,
            'gender' => $faker->numberBetween(1, 3),
            'battleRole' => $faker->numberBetween(1, 3),
            'weaponClass' => $faker->numberBetween(1, 18),
            'element' => $faker->numberBetween(1, 8),
            'strength' => $faker->numberBetween(10, 50),
            'rarity' => $faker->numberBetween(1, 5),
            'affinity' => $faker->numberBetween(0, $affinityTotal),
            'affinityTotal' => $affinityTotal,
            'trust' => $faker->numberBetween(1, 6),
            'canBeReleased' => $faker->boolean,
            'mercTeamName' => $faker->words(2, true),
            'isMerc' => $faker->boolean,
          ],
          [
            [
              'affinityNode' => $faker->numberBetween(1, 18),
              'level' => $faker->numberBetween(0, $affinityNodeLevelMaxValues[0]),
              'maxLevel' => $affinityNodeLevelMaxValues[0],
            ],
            [
              'affinityNode' => $faker->numberBetween(19, 36),
              'level' => $faker->numberBetween(0, $affinityNodeLevelMaxValues[1]),
              'maxLevel' => $affinityNodeLevelMaxValues[1],
            ],
            [
              'affinityNode' => $faker->numberBetween(37, 55),
              'level' => $faker->numberBetween(0, $affinityNodeLevelMaxValues[2]),
              'maxLevel' => $affinityNodeLevelMaxValues[2],
            ],
          ],
        ];

        // From template
        $data['template'] = [
          'Wulfric',
          [
            'driver' => $faker->numberBetween(1, 5),
            'strength' => $faker->numberBetween(10, 50),
            'affinity' => $faker->numberBetween(0, 44),
            'trust' => $faker->numberBetween(1, 6),
          ],
          [],
        ];

        return $data;
    }

    public function testNewInvalid()
    {
        $this->loadFixturesFromFile();
        $client = $this->createClient();
        $this->login($client, 'user@test.com');

        $crawler = $client->request('GET', '/blades');
        self::isSuccessful($client->getResponse());
        $crawler = $client->click($crawler->filter('.btn:contains("Bond Blade")')->link());
        self::isSuccessful($client->getResponse());
        $client->followRedirects();

        // Add form data
        $faker = Factory::create();
        $formData = [
          'driver' => $faker->numberBetween(1, 5),
          'name' => $faker->word,
          'gender' => $faker->numberBetween(1, 3),
          'battleRole' => $faker->numberBetween(1, 3),
          'weaponClass' => $faker->numberBetween(1, 18),
          'element' => $faker->numberBetween(1, 8),
          'strength' => $faker->numberBetween(10, 50),
          'rarity' => 6,
          'affinity' => $faker->numberBetween(3, 5),
          'affinityTotal' => 2,
          'trust' => $faker->numberBetween(1, 6),
          'canBeReleased' => $faker->boolean,
          'mercTeamName' => $faker->words(2, true),
          'isMerc' => $faker->boolean,
        ];
        $affinityNodes = [
          [
            'affinityNode' => $faker->numberBetween(1, 55),
            'level' => 3,
            'maxLevel' => 2,
          ],
        ];
        $form = $crawler->filter('form[name=blade_form]')->selectButton('Save')->form();
        $formValues = $this->completeBladeForm($formData, $affinityNodes, $form);
        $crawler = $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::assertContains('is-invalid', explode(' ', $crawler->filter('form[name=blade_form] input[name="blade_form[affinity]"]')->attr('class')));
        self::assertContains('is-invalid', explode(' ', $crawler->filter('form[name=blade_form] input[name="blade_form[affinityNodes][0][level]"]')->attr('class')));
    }

    public function testEdit()
    {
        $this->loadFixturesFromFile([], 'BladeControllerTest/testEdit.php');
        $client = $this->createClient();
        $user = $this->login($client, 'user@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $bladeRepo = $em->getRepository(Blade::class);
        /** @var Blade $ownedBlade */
        $ownedBlade = $bladeRepo->findOneBy(['name' => 'Owned']);
        /** @var Blade $unownedBlade */
        $unownedBlade = $bladeRepo->findOneBy(['name' => 'Unowned']);
        self::assertEquals($user->getId(), $ownedBlade->getUser()->getId(), 'Error in test fixtures (blade ownership)');
        self::assertNotEquals($user->getId(), $unownedBlade->getUser()->getId(), 'Error in test fixtures (blade ownership)');

        // Shouldn't be able to edit other users' blades
        self::expectException(AccessDeniedHttpException::class);
        $client->request('GET', '/blades/all/edit/'.$unownedBlade->getId());
        $client->followRedirects();
        self::assertEquals(403, $client->getResponse()->getStatusCode(), "Can edit other users's blades");

        $crawler = $client->request('GET', '/blades/all/edit/'.$ownedBlade->getId());
        self::isSuccessful($client->getResponse());

        // Verify the form is already filled out properly
        $form = $crawler->filter('form[name=blade_form]')->form();
        $formValues = $form->getPhpValues();
        self::assertEquals($ownedBlade->getDriver()->getId(), $formValues['blade_form']['driver'], 'Wrong driver displayed');
        self::assertEquals($ownedBlade->getName(), $formValues['blade_form']['name'], 'Wrong name displayed');
        self::assertEquals($ownedBlade->getGender()->getId(), $formValues['blade_form']['gender'], 'Wrong gender displayed');
        self::assertEquals($ownedBlade->getBattleRole()->getId(), $formValues['blade_form']['battleRole'], 'Wrong battle role displayed');
        self::assertEquals($ownedBlade->getWeaponClass()->getId(), $formValues['blade_form']['weaponClass'], 'Wrong weapon class displayed');
        self::assertEquals($ownedBlade->getElement()->getId(), $formValues['blade_form']['element'], 'Wrong element displayed');
        self::assertEquals($ownedBlade->getStrength(), $formValues['blade_form']['strength'], 'Wrong strength displayed');
        self::assertEquals($ownedBlade->getRarity(), $formValues['blade_form']['rarity'], 'Wrong rarity displayed');
        self::assertEquals($ownedBlade->getAffinity(), $formValues['blade_form']['affinity'], 'Wrong affinity displayed');
        self::assertEquals($ownedBlade->getAffinityTotal(), $formValues['blade_form']['affinityTotal'], 'Wrong affinity total displayed');
        self::assertEquals($ownedBlade->getTrust()->getId(), $formValues['blade_form']['trust'], 'Wrong trust displayed');
        self::assertEquals($ownedBlade->canBeReleased(), array_key_exists('canBeReleased', $formValues['blade_form']), 'Wrong releasable status displayed');
        self::assertEquals($ownedBlade->getMercTeamName(), $formValues['blade_form']['mercTeamName'], 'Wrong merc team name displayed');
        self::assertEquals($ownedBlade->isMerc(), array_key_exists('isMerc', $formValues['blade_form']), 'Wrong merc status displayed');
        $bladeAffinityNodeIds = [];
        foreach ($ownedBlade->getAffinityNodes() as $bladeAffinityNode) {
            $bladeAffinityNodeIds[] = $bladeAffinityNode->getAffinityNode()->getId();
        }
        sort($bladeAffinityNodeIds);
        $formAffinityNodeIds = [];
        foreach ($formValues['blade_form']['affinityNodes'] as $affinityNodeInfo) {
            $formAffinityNodeIds[] = $affinityNodeInfo['affinityNode'];
        }
        sort($formAffinityNodeIds);
        self::assertEquals($formAffinityNodeIds, $bladeAffinityNodeIds, 'Wrong affinity nodes displayed');
        foreach ($formValues['blade_form']['affinityNodes'] as $affinityNodeInfo) {
            foreach ($ownedBlade->getAffinityNodes() as $bladeAffinityNode) {
                if ($bladeAffinityNode->getAffinityNode()->getId() == $affinityNodeInfo['affinityNode']) {
                    self::assertEquals($bladeAffinityNode->getLevel(), $affinityNodeInfo['level'], 'Wrong blade affinity node level displayed');
                    self::assertEquals($bladeAffinityNode->getMaxLevel(), $affinityNodeInfo['maxLevel'], 'Wrong blade affinity node max level displayed');
                }
            }
        }

        // Make some changes and submit the form.
        $faker = Factory::create();
        $newAffinity = $faker->numberBetween($formValues['blade_form']['affinity'] + 1, $formValues['blade_form']['affinityTotal']);
        $formValues['blade_form']['affinity'] = $newAffinity;
        $newNodeLevels = [];
        foreach ($formValues['blade_form']['affinityNodes'] as &$affinityNodeInfo) {
            $newNodeLevels[$affinityNodeInfo['affinityNode']] = $faker->numberBetween($affinityNodeInfo['level'] + 1, $affinityNodeInfo['maxLevel']);
            $affinityNodeInfo['level'] = $newNodeLevels[$affinityNodeInfo['affinityNode']];
        }
        $client->request($form->getMethod(), $form->getUri(), $formValues);
        self::isSuccessful($client->getResponse());

        // Fetch the blade again and verify the changes.
        // Because of particulars in Doctrine's internals, there's a lot of
        // extra work needed to force it to retrieve the new value from the
        // database.
        $ownedBlade = $bladeRepo->findOneBy(['name' => $ownedBlade->getName()]);
        $em->refresh($ownedBlade);
        self::assertEquals($newAffinity, $ownedBlade->getAffinity(), 'Affinity change not persisted');
        foreach ($ownedBlade->getAffinityNodes() as &$bladeAffinityNode) {
            $em->refresh($bladeAffinityNode);
            self::assertEquals($newNodeLevels[$bladeAffinityNode->getAffinityNode()->getId()], $bladeAffinityNode->getLevel(), 'Affinity node change not persisted');
        }
    }

    public function testDelete()
    {
        $this->loadFixturesFromFile([], 'BladeControllerTest/testEdit.php');
        $client = $this->createClient();
        $user = $this->login($client, 'user@test.com');

        $em = $client->getContainer()->get('doctrine')->getManager();
        $bladeRepo = $em->getRepository(Blade::class);
        /** @var Blade $ownedBlade */
        $ownedBlade = $bladeRepo->findOneBy(['name' => 'Owned']);
        /** @var Blade $unownedBlade */
        $unownedBlade = $bladeRepo->findOneBy(['name' => 'Unowned']);
        self::assertEquals($user->getId(), $ownedBlade->getUser()->getId(), 'Error in test fixtures (blade ownership)');
        self::assertNotEquals($user->getId(), $unownedBlade->getUser()->getId(), 'Error in test fixtures (blade ownership)');

        // Ensure a user can only delete their own blades
        self::expectException(AccessDeniedHttpException::class);
        $client->request('GET', '/blades/all/delete/'.$unownedBlade->getId());
        $client->followRedirects();
        self::assertEquals(403, $client->getResponse()->getStatusCode(), "Can delete other users's blades");

        // Delete a blade
        $client->request('GET', '/blades/all/delete/'.$ownedBlade->getId());
        self::isSuccessful($client->getResponse());
        $blade = $bladeRepo->find($ownedBlade->getId());
        self::assertNull($blade, 'Blade not deleted when requested');
    }

    /**
     * @param array $formData
     * @param array $affinityNodes
     * @param Form $form
     *
     * @return array
     */
    private function completeBladeForm(array $formData, array $affinityNodes, Form $form): array
    {
        $formValues = $form->getPhpValues();
        foreach ($formData as $k => $datum) {
            $formValues['blade_form'][$k] = $datum;
        }
        foreach ($affinityNodes as $k => $affinityNodeInfo) {
            $formValues['blade_form']['affinityNodes'][$k] = $affinityNodeInfo;
        }

        return $formValues;
    }
}
