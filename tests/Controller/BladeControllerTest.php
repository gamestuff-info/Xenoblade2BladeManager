<?php

namespace App\Tests\Controller;

use App\Entity\Blade;
use App\Entity\Driver;
use App\Tests\FixturesTestCase;
use App\Tests\NeedsLoginTrait;
use Symfony\Component\DomCrawler\Crawler;

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
        $user = $this->login($client, 'Test User');

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
        if ($driverSlug !== 'all') {
            // Navigate to the tab for this driver
            $crawler = $client->click($crawler->filter('.nav-tabs a:contains("'.$driver->getName().'")')->link());
            self::isSuccessful($client->getResponse());
        }

        // Get the list of Blades that should be displayed on the all page and
        // compare it to reality.
        $bladeCriteria = ['user' => $user];
        if ($driverSlug !== 'all') {
            $bladeCriteria['driver'] = $driver;
        }
        /** @var Blade[] $blades */
        $blades = $bladeRepo->findBy($bladeCriteria);
        $pageBlades = [];
        $affinityPattern = '`(?P<affinity>\d+)\s*/\s*(?P<affinityTotal>\d+)\s+\((?P<affinityPct>\d+)%\)`';
        foreach ($crawler->filter('#blade-list tbody tr') as $node) {
            $nodeCrawler = new Crawler($node);
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

    //    public function testNew()
    //    {
    //
    //    }
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
}
